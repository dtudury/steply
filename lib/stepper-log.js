var arrayify = require('./utils').arrayify;
var indexOfFunction = require('./utils').indexOfFunction;
exports.Log = Log;

function Log(_protected) {
    return function(label) {
        var label = arrayify(arguments).join(", ") + ": ";
        return _protected.self.setFunction(function () {
            console.log.apply(console, [label].concat(arrayify(arguments)));
            _protected.funStack.pop();
        }).execute();
    }
}

