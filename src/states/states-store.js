import Utils from 'utils';

export default class StatesStore {

    static _states = [];

    static addState(state) {
        StatesStore._states.push(state);
    }

    static removeState(id) {
        let index = StatesStore._states.findIndex(s=>s.id === id);
        if (index > -1) {
            Utils.Array.removeAt(StatesStore._states, index);
        }
    }
}
