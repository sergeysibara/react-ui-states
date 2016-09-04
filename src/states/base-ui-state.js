import StatesStore from './states-store.js'
import Utils from 'utils'
import objectPath from 'object-path'

export default class BaseUIState {
    constructor() {
        this.id = Utils.Other.createGuid();
        StatesStore.addState(this);
    }

    set(path, newValue, doComponentUpdate = true) {
        if (!objectPath.has(this, path)) {
            console.info(`created path: ${path}`);
        }
        objectPath.set(this, path, newValue);

        if (doComponentUpdate === true) {
            this._updateComponent();
        }
    }

    has(path) {
        return objectPath.has(this, path);
    }

    get(path, defaultValue = '') {
        return objectPath.get(this, path, defaultValue);
    }


    removeState() {
        StatesStore.removeState(this.id);
    }

    _updateComponent() {
    }
}

export function getFullPath(path, field) {
    let fullPath = field;
    if (Utils.Other.isExist(path)) {
        fullPath = path + '.' + field;
    }
    return fullPath;
}


