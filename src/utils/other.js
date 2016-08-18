export default class Other {
    /**
     * return true if value is not: null, undefined, NaN, empty string ("")
     **/
    static isExist(value) {

        if (value === true || value === false) {
            return true;
        }

        if (value === 0) {
            return true;
        }

        if (value) {
            return true;
        }

        return false;
    }

    static deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    static createGuid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }
}