// https://stackoverflow.com/a/34491287
/** check to see if an object is empty */
export function isEmpty(obj) {
    for (const x in obj) {
        return false;
    }
    return true;
}
