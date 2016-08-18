import objectPath from 'object-path'
import Utils from 'utils'
import BaseUIState, {getFullPath} from './base-ui-state.js'

export default class DefaultUIState extends BaseUIState {
    constructor(component, stateModel, storesParams = []) {
        super();
        this._onUpdateStore = this._onUpdateStore.bind(this);
        this._onUpdateStoreField = this._onUpdateStoreField.bind(this);

        this._component = component;
        this._storesParams = storesParams;

        //setup default storesParams
        for (let param of this._storesParams) {
            param.cloneStore = param.cloneStore || true;
            param.dataConvertFunc = param.dataConvertFunc || ((data)=> {
                    return data
                });
            param.updateCondition = param.updateCondition || (()=> {
                    return true
                });
            param.updateFieldCondition = param.updateFieldCondition || (()=> {
                    return true
                });
        }

        this.model = stateModel || {};
        this._startedModel = stateModel || {};
        this._updatingStore = null;
        this._updatingFieldPath = null;

        let isValid = this._validateParams(this._storesParams);

        if (isValid) {
            this._subscribeToStores(storesParams);
            this._setStoreModels();
        }
    }

    cancelAllChanges(clearValidation = true) {
        this.cancelModelChanges();
        for (let param of this._storesParams) {
            this._setStoreModel(param.store.key, true);

            if (clearValidation === true) {
                this[param.store.key].validationData = {};
            }
        }
        this._updateComponent();
    }

    cancelModelChanges() {
        this.model = Utils.Other.deepClone(this._startedModel);
    }

    cancelStoresChanges(storeKeys, clearValidation = true, validationOnly = false) {
        for (let key of storeKeys) {
            if (validationOnly === false) {
                this._setStoreModel(key, true);
            }
            if (clearValidation === true) {
                this[key].validationData = {};
            }
        }
        this._updateComponent();
    }

    cancelChangesByPath(pathInStore, store, doUpdate = true) {
        let path = store.key + '.' + pathInStore;

        if (objectPath.has(this, path)) {
            let storeValue = this._getStoreDataByPath(store.key, pathInStore);
            objectPath.set(this, path, storeValue);

            let validationPathInStore = 'validationData.' + pathInStore;
            let validationPath = store.key + '.' + validationPathInStore;
            if (objectPath.has(this, validationPath)) {
                storeValue = this._getStoreDataByPath(store.key, validationPathInStore);
                objectPath.set(this, validationPath, storeValue);
            }
        }
        else {
            console.log(`path ${path} not found`);
        }

        if (doUpdate === true) {
            this._updateComponent();
        }
    }

    removeState() {
        super.removeState();
        for (let param of this._storesParams) {
            param.store.unSubscribe(this.id);
        }
    }

    getLastStoreUpdateTime(storeKey) {
        return this[storeKey]._lastUpdateTime;
    }

    storeModelIsNew(storeKey) {
        return this[storeKey]._isNew;
    }

    storeModelIsExist(storeKey) {
        return this[storeKey]._isExist;
    }

    _setStoreModels() {
        for (let param of this._storesParams) {
            this._setStoreModel(param.store.key);
        }
    }

    _setStoreModel(storeKey, isCancel = false) {
        let storeObject = this._getStoreModel(storeKey);
        if (isCancel === true || !Utils.Other.isExist(storeObject.validationData)) {
            this[storeKey] = storeObject;
        }
        else {
            this[storeKey].validationData = storeObject.validationData;
            this[storeKey]._lastUpdateTime = storeObject._lastUpdateTime;
        }
    }

    _getStoreModel(storeKey) {
        let storeParam = this._getParamByStoreKey(storeKey);
        let storeObject = (storeParam.cloneStore === true) ? storeParam.store.getModelClone() : storeParam.store.getModel();

        if (!Utils.Other.isExist(storeObject.validationData)) {
            return storeParam.dataConvertFunc(storeObject);
        }
        return storeObject;
    }

    _getStoreDataByPath(storeKey, pathInStore) {
        let storeParam = this._getParamByStoreKey(storeKey);
        let storeData = (storeParam.cloneStore === true) ? storeParam.store.getDataCloneByPath(pathInStore) : storeParam.store.getDataByPath(pathInStore);
        return storeData;
    }

    _validateParams(storesParams) {
        for (let param of storesParams) {
            if (!Utils.Other.isExist(param.store)) {
                console.error('param.store is empty in component ' + this._component.constructor.name);
                return false;
            }
        }
        return true;
    }

    _subscribeToStores(storesParams) {
        for (let param of storesParams) {
            param.store.subscribe(this.id, this._onUpdateStore);
            param.store.subscribeOnFieldUpdate(this.id, this._onUpdateStoreField);
        }
    }

    _onUpdateStore(storeKey, model, options) {
        let storeParam = this._getParamByStoreKey(storeKey);
        if (storeParam.updateCondition(model) === false) {
            return;
        }
        this._setStoreModel(storeKey);

        if (Utils.Other.isExist(options) && options.doUpdateUIState === false) {
            return;
        }
        this._updateComponent(storeKey);
    }

    _onUpdateStoreField(storeKey, path, fieldValue, validationData) {
        let storeParam = this._getParamByStoreKey(storeKey);
        if (storeParam.updateFieldCondition(fieldValue) === false) {
            return;
        }
        if (Utils.Other.isExist(validationData)) {
            if (!objectPath.has(this[storeKey].validationData, path)) {
                this[storeKey].validationData = {};
            }
            objectPath.set(this[storeKey].validationData, path, validationData);
        }
        else{
            objectPath.set(this[storeKey], path, fieldValue);

            //remove validation for field
            if (Utils.Other.isExist(this[storeKey].validationData)) {
                objectPath.set(this[storeKey].validationData, path, undefined);

                if (Object.keys(this[storeKey].validationData).length === 0) {
                    this[storeKey].validationData = undefined;
                }
            }
        }
        let fullPath = getFullPath(storeKey, path);
        this._updateField(fullPath);
    }

    _getParamByStoreKey(storeKey) {
        return this._storesParams.find(p=>p.store.key == storeKey);
    }

    _updateField(path = null) {
        this._updatingFieldPath = path;
        this._component.forceUpdate(()=> {
                this._updatingFieldPath = null;
            }
        );
    }

    _updateComponent(storeKey = null) {
        this._updatingStore = storeKey;
        this._component.forceUpdate(()=> {
                this._updatingStore = null;
            }
        );
    }
}
