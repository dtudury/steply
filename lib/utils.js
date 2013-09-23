exports.arrayify = arrayify;
exports.indexOfFunction = indexOfFunction;


function arrayify(args) {
    return Array.prototype.slice.call(args);
}


function indexOfFunction(args) {
    for(var i = 0; i < args.length; i++)
        if (typeof args[i] === 'function')
            return i;
    return -1;
}