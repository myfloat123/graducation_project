// 判断是否错误的方法
const isFalse = (o) => {
    if (!o || o === 'null' || o === 'undefined' || o === 'false' || o === 'NaN') return true
    return false
};
// 判断是否正确的方法
const isTrue = (o) => {
    if (!o || o === 'null' || o === 'undefined' || o === 'false' || o === 'NaN') return false
    return true
};

// 判断是否为空
const isEmpty = (val) => {
    const value = typeOf(val);
    if (value === 'string') {
        const str = val.trim();
        if (str.length == 0) {
            return true; //空值，例如:带有空格的字符串" "。
        }
    } else if (value === "object") {
        if (JSON.stringify(val) == "{}") {
            return true; //空值，空对象
        }
    } else if (value === 'array') {
        if (val.length === 0) {
            return true; //空值，空对象
        }
    } else if (value === "undefined" || value === "null" || val === "undefined" || val === "null") {
        return true;
    }
    return false;
}

// 判断类型
const typeOf = (val) => {
    const value = Object.prototype.toString.call(val);
    switch (value) {
        case '[object Number]':
            return 'number';
        case '[object String]':
            return 'string';
        case '[object Object]':
            return 'object';
        case '[object Array]':
            return 'array';
        case '[object Undefined]':
            return 'undefined';
        case '[object Null]':
            return 'null';
        case '[object Boolean]':
            return 'boolean';
    }
    return 'undefined';
}

let typeMap = {
    'STRING': 'string',
    'DECIMAL': 'number',
    'TEXT': 'string',
    'INTEGER': 'number',
    "BOOLEAN": "boolean",
}
const getModelType = (model) => {
    let modelType = model.type;
    // console.log('modelType',typeof model);
    switch (modelType) {
        case 'STRING':
            return 'string';
        case 'DECIMAL':
            return 'number';
        case 'TEXT':
            return 'string';
        case 'INTEGER':
            return 'number';
        case 'BOOLEAN':
            return 'boolean';
    }
}

const modleTypeEqual = (data, model) => {
    return typeOf(data) === model.verification
}

module.exports = {
    isTrue,
    isFalse,
    isEmpty,
    modleTypeEqual,
    typeOf
}