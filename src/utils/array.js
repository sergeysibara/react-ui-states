export default class ArrayUtils {

    static removeAt(arr, index, removeCount = 1) {
        arr.splice(index, removeCount);
    }
}