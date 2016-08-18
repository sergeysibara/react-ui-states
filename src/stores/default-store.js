import Utils from 'utils';
import objectPath from 'object-path'

export default class DefaultStore {
    constructor(key) {
        this._key = key;
        this._model = {validationData: null, _lastUpdateTime: Date.now(), _isNew: null, _isExist: false};
        this._subscribers = []; //subscriber signature = {id, action}
        this._subscribersOnFieldUpdate = []; //subscriber signature = {id, action}
    }

    get key() {
        return this._key;
    }

    createNew(data = {}) {
        this._model = data;
        this._model.validationData = null;
        this._model._lastUpdateTime = Date.now();
        this._model._isNew = true;
        this._model._isExist = true;
        this._publish();
    }

    replace(data = {}) {
        this._model = data;
        this._model.validationData = null;
        this._model._lastUpdateTime = Date.now();
        this._model._isNew = false;
        this._model._isExist = true;
        this._publish();
    }

    clear() {
        this._model = {validationData: null, _lastUpdateTime: Date.now(), _isNew: null, _isExist: false};
        this._publish();
    }

    update(data, validationData, options) {
        if (!Utils.Other.isExist(validationData)) {
            this._model._isNew = false;
            Object.assign(this._model, data);// merge with remaining fields
        }
        this._model.validationData = validationData;
        this._model._lastUpdateTime = Date.now();
        this._model._isExist = true;
        this._publish(options);
    }

    updateField(data, validationData, path) {
        if (!Utils.Other.isExist(validationData)) {
            objectPath.set(this._model, path, data);
        }
        else {
            if (!Utils.Other.isExist(this._model.validationData)) {
                this._model.validationData={};
            }
            objectPath.set(this._model.validationData, path, validationData);
        }
        this._model._lastUpdateTime = Date.now();
        this._publishByPath(path, data, validationData);
    }

    clearValidationInField(path){
        this.updateField(objectPath.get(this._model, path), null, path);
    }

    isExist() {
        return this.getModel()._isExist;
    }

    getModel() {
        return this._model;
    }

    getModelClone() {
        return Utils.Other.deepClone(this.getModel());
    }

    getDataByPath(path) {
        let data = objectPath.get(this._model, path);
        return data || '';
    }

    getDataCloneByPath(path) {
        return Utils.Other.deepClone(this.getDataByPath(path));
    }

    subscribe(id, onUpdateStore) {
        this._subscribe(id, onUpdateStore, '_subscribers');
    }

    subscribeOnFieldUpdate(id, onUpdateStoreField) {
        this._subscribe(id, onUpdateStoreField, '_subscribersOnFieldUpdate');
    }

    unSubscribe(id) {
        let index = this._subscribers.findIndex(s=>s.id === id);
        Utils.Array.removeAt(this._subscribers, index);

        index = this._subscribersOnFieldUpdate.findIndex(s=>s.id === id);
        Utils.Array.removeAt(this._subscribersOnFieldUpdate, index);
    }

    _publish(options) {
        for (let subscriber of this._subscribers) {
            subscriber.action(this.key, this._model, options);
        }
    }

    _subscribe(id, onUpdate, subscribersfieldKey) {
        let index = this[subscribersfieldKey].findIndex(s=>s.id === id);
        if (index === -1) {
            this[subscribersfieldKey].push({id: id, action: onUpdate});
        }
        else {
            console.warn('state with id = ' + id + 'already added');
        }
    }

    _publishByPath(path, value, validationData) {
        for (let subscriber of this._subscribersOnFieldUpdate) {
            subscriber.action(this.key, path, value, validationData);
        }
    }

}