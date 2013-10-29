/**
 *  leightweight library to extract nested key from javascript Objects.
 *
 *
 * @param data {object}
 * @param lang {string}
 * @constructor
 */


var Language = function (data, lang, placeholder) {
    this.data = data;
    this.lang = lang;
    this.placeholder = placeholder ? placeholder : "%v%"
};

/**
 *
 * @param value
 * @returns {*}
 * @private
 */

Language.prototype.__handleLanguage = function (value) {

    var output = typeof(value[this.lang]) != "undefined" ?  value[this.lang] :  value
    return output;

}


Language.prototype.__replaceVariable = function(string ,data){

    if (typeof (string) == "string"){
        var output = string;
    }
    else {
        return string;
    }

    if (typeof(data) == "string"){
        output = string.replace(this.placeholder, data);
    }
    else if (toString.call(data) == '[object Object]'){
        for (key in data){
            output = output.replace("%"+key+"%", data[key])
        }
    }
    return output
}

/**
 * sets the current language
 * @param lang {string}
 */

Language.prototype.setLanguage = function (lang){
    this.lang = lang
}


/**
 *  sets the data source
 * @param data {object}
 */

Language.prototype.setDataSource = function(data){
    this.data = data

}

/**
 * returns the selected language of a simple node.
 * @param node
 * @returns {{Object}}
 */

Language.prototype.simple = function (node) {
    var output = {};
    var data = typeof(node) == "string" ? this.data[node] : node;
    for (key in data) {
        output[key] = this.__handleLanguage(data[key])
    }
    return output;
}

/**
 * Browses to all values of node, including arrays and selects the approriate key(language).
 * @param node
 * @returns {{}}
 */

Language.prototype.complex = function (node) {
    var output = {};
    var node = typeof(node) == "string" ? this.data[node] : node;
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


/**
 * Extracts the keys from a simple node.
 * @param node {string, object}
 * @param values {object}
 */


Language.prototype.simpleWithVars = function(node, values){

    var output = {}
    var input = this.simple(node)


    if(toString.call(values) == '[object Object]'){
        for (key in input){
            output[key] = this.__replaceVariable(input[key], values)
        }
    }

}




