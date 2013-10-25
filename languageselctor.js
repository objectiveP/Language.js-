/**
 *  super leightweigt language selector library.
 *
 *
 * @param data {object}
 * @param lang {string}
 * @constructor
 */


var Language = function (data, lang) {
    this.data = data;
    this.lang = lang;
};

/**
 *
 * @param value
 * @returns {*}
 * @private
 */

Language.prototype.__handleLanguage = function (value) {

    if (typeof(value[this.lang]) != "undefined") {
        return value[this.lang];
    }
    else {
        return value
    }

}

/**
 *
 * @param node
 * @returns {{}}
 */

Language.prototype.simple = function (node) {
    var output = {};
    if (typeof(node) == "string") {
        var data = this.data[node]
    }
    else {
        var data = node;
    }

    for (key in data) {
        output[key] = this.__handleLanguage(data[key])
    }
    return output;
}

Language.prototype.complex = function (node) {
    var output = {};
    if (typeof(node) == "string") {
        var node = this.data[node]
    }
    else {
        var node = node;
    }

    for (key in node) {
        if (toString.call(node[key]) == '[object Array]') {
            output[key] = [];
            for (i = 0; i < node[key].length; i++) {
                var toeval = node[key][i];
                output[key][i] = {};
                for (k in toeval) {
                    output[key][i][k] = this.__handleLanguage(toeval[k]);
                }
            }
        }
        else {
            output[key] = this.__handleLanguage(node[key])
        }

    }

    return output;
}






