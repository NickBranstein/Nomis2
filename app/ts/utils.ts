export module Utils {
    export class Dictionary<T> {
        private _keys: number[] = new Array<number>();
        private _values: T[] = new Array<T>();

        constructor(init: { key: number; value: T; }[]) {

            for (var x = 0; x < init.length; x++) {
                this[init[x].key] = init[x].value;
                this._keys.push(init[x].key);
                this._values.push(init[x].value);
            }
        }

        add(key: number, value: T) {
            this[key] = value;
            this._keys.push(key);
            this._values.push(value);
        }

        remove(key: number) {
            var index = this._keys.indexOf(key, 0);
            this._keys.splice(index, 1);
            this._values.splice(index, 1);

            delete this[key];
        }

        keys(): number[] {
            return this._keys;
        }

        values(): T[] {
            return this._values;
        }

        containsKey(key: number) {
            if (typeof this[key] === "undefined") {
                return false;
            }

            return true;
        }
    }
}