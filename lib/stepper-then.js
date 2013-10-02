var arrayify = require('./utils').arrayify;
var indexOfFunction = require('./utils').indexOfFunction;
exports.Then = Then;

function Then(_protected) {
    return function LinkedThen() {
        var args = arrayify(arguments);
        var fIndex = indexOfFunction(args);
        if(~fIndex) {
            return _protected.self.setFunction(function () {
                var f = [].splice.apply(args, [fIndex, 1].concat(arrayify(arguments)))[0];
                var output = f.apply(this, args);
                _protected.argsStack.push(args);
                _protected.funStack.pop();
                _protected.funStack.push(f);
                if(output !== undefined) return output;
            }).execute();
        } else if(args.length) {
            return _protected.self.setArgumentsArray(args).execute();
        } else {
            return _protected.self.execute();
        }
    }
}