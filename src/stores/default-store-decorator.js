export default class DefaultStoreDecorator {
    constructor(store, params = {}) {
        this._store = store;
        this._params = {};

        //setup default params
        this._params.useStoreClone = params.useStoreClone || true;
        this._params.convertModel = params.convertModel || ( m => m );
    }
    get isDecorator() { return true};
    get key() { return this._store.key};

    getModel() {
        let storeModel = (this._params.useStoreClone === true) ?
            this._store.getModelClone() : this._store.store.getModel();
        return this._params.convertModel(storeModel);
    }

    getDataByPath(pathInStore) {
        let storeData = (this._params.useStoreClone === true) ?
            this._store.getDataCloneByPath(pathInStore) : this._store.getDataByPath(pathInStore);
        return storeData;
    }

    subscribe(id, onUpdateStore) {
        this._store.subscribe(id, onUpdateStore);
    }

    subscribeOnFieldUpdate(id, onUpdateStoreField) {
        this._store.subscribeOnFieldUpdate(id, onUpdateStoreField);
    }

    unSubscribe(id) {
        this._store.unSubscribe(id);
    }

}