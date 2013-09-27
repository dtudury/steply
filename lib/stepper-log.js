var arrayify = require('./utils').arrayify;
exports.Log = Log;

function Log(_protected) {
    return function() {
        var args = arrayify(arguments);
        return _protected.self.setFunction(function () {
            if(args.length) {
                console.log.apply(console, [args.join(", ") + ": "].concat(arrayify(arguments)));
            } else {
                console.log.apply(console, arrayify(arguments));
            }
            _protected.funStack.pop();
        }).execute();
    }
}