import Utils from 'utils';

export default class UIStore {

    static _states = [];

    static addState(state) {
        UIStore._states.push(state);
    }

    static removeState(id) {
        let index = UIStore._states.findIndex(s=>s.id === id);
        if (index > -1) {
            Utils.Array.removeAt(UIStore._states, index);
        }
    }
}
