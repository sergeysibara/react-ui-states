import objectPath from 'object-path'
import Utils from 'utils'
import BaseUIState, {getFullPath} from './base-ui-state.js'
import DefaultStoreDecorator from './../stores/default-store-decorator'

export default class DefaultUIState extends BaseUIState {
    constructor(component, stateModel, storesParams = []) {
        super();
        this._onUpdateStore = this._onUpdateStore.bind(this);
        this._onUpdateStoreField = this._onUpdateStoreField.bind(this);

        this.model = stateModel || {};
        this._initialModel = (stateModel)? Utils.Other.deepClone(stateModel) : {};
        this._component = component;
        this._storesParams = [];
        this._updatedStore = null;
        this._updatedFieldPath = null;

        //setup default storesParams
        for (let params of storesParams) {
            let newParams = Object.assign({}, params);
            if (!Utils.Other.isExist(newParams.store)) {
                console.error('params.store is empty in component ' + this._component.constructor.name);
                return;
            }

            newParams.updateCondition = newParams.updateCondition || ( () => true );
            newParams.updateFieldCondition = newParams.updateFieldCondition || ( () => true);

            if (newParams.store.isDecorator !== true) {
                newParams.store = new DefaultStoreDecorator(newParams.store);
            }

            this._storesParams.push(newParams);
        }

        this._subscribeToStores(storesParams);
        this._setStoreModels();
    }

    cancelAllChanges(clearValidation = true) {
        this.cancelModelChanges(false);
        for (let param of this._storesParams) {
            this._setStoreModel(param.store.key, null, true);

            if (clearValidation === true) {
                this[param.store.key].validationData = {};
            }
        }
        this._updateComponent();
    }

    cancelModelChanges(doUpdate = true) {
        this.model = Utils.Other.deepClone(this._initialModel);
        if (doUpdate) {
            this._updateComponent();
        }
    }

    cancelStoresChanges(storeKeys, clearValidation = true, validationOnly = false) {
        for (let key of storeKeys) {
            if (validationOnly === false) {
                this._setStoreModel(key, null, true);
            }
            if (clearValidation === true) {
                this[key].validationData = {};
            }
        }
        this._updateComponent();
    }

    updateFromStores(storeKeys, doUpdate = true) {
        for (let key of storeKeys) {
            let validationData = this[key].validationData;
            this._setStoreModel(key);
            this[key].validationData = validationData;
        }
        if (doUpdate === true) {
            this._updateComponent();
        }
    }

    cancelChangesByPath(path, storeKey, doUpdate = true) {
        let fullPath = storeKey + '.' + path;
        if (objectPath.has(this, fullPath)) {
            let storeParams = this._getParamByStoreKey(storeKey);
            let storeValue = storeParams.store.getDataByPath(path);
            objectPath.set(this, fullPath, storeValue);
            this._removeValidationInField(storeKey, path);
        }
        else {
            console.log(`path ${fullPath} not found`);
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

    storeLastUpdateTime(storeKey) {
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

    _setStoreModel(storeKey, validationData, isCancel = false) {
        let storeParams = this._getParamByStoreKey(storeKey);
        let storeObject = storeParams.store.getModel();
        if (isCancel === true || !Utils.Other.isExist(validationData)) {
            this[storeKey] = storeObject;
        }
        else {
            this[storeKey].validationData = validationData;
            this[storeKey]._lastUpdateTime = storeObject._lastUpdateTime;
        }
    }

    _subscribeToStores(storesParams) {
        for (let param of storesParams) {
            param.store.subscribe(this.id, this._onUpdateStore);
            param.store.subscribeOnFieldUpdate(this.id, this._onUpdateStoreField);
        }
    }

    _onUpdateStore(storeKey, model, validationData, options) {
        let storeParams = this._getParamByStoreKey(storeKey);
        if (storeParams.updateCondition(model) === false) {
            return;
        }
        this._setStoreModel(storeKey, validationData);

        if (Utils.Other.isExist(options) && options.doUpdateUIState === false) {
            return;
        }
        this._updateComponent(storeKey);
    }

    _onUpdateStoreField(storeKey, path, fieldValue, validationData, options) {
        let storeParam = this._getParamByStoreKey(storeKey);
        if (storeParam.updateFieldCondition(fieldValue) === false) {
            return;
        }
        if (Utils.Other.isExist(validationData)) {
            //add validationData if validationData object not exist
            if (!objectPath.has(this[storeKey].validationData, path)) {
                this[storeKey].validationData = {};
            }
            objectPath.set(this[storeKey].validationData, path, validationData);
        }
        else {
            objectPath.set(this[storeKey], path, fieldValue);
            this._removeValidationInField(storeKey, path);
        }
        let fullPath = getFullPath(storeKey, path);
        this._updateField(fullPath);
    }

    _getParamByStoreKey(storeKey) {
        return this._storesParams.find(p=>p.store.key == storeKey);
    }

    _updateField(path = null) {
        this._updatedFieldPath = path;
        this._component.forceUpdate(()=> {
                this._updatedFieldPath = null;
            }
        );
    }

    _updateComponent(storeKey = null) {
        this._updatedStore = storeKey;
        this._component.forceUpdate(()=> {
                this._updatedStore = null;
            }
        );
    }

    _removeValidationInField(storeKey, pathToField) {
        if (Utils.Other.isExist(this[storeKey].validationData)) {
            objectPath.set(this[storeKey].validationData, pathToField, undefined);

            if (Object.keys(this[storeKey].validationData).length === 0) {
                this[storeKey].validationData = undefined;
            }
        }
    }
}
