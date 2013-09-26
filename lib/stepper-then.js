var arrayify = require('./utils').arrayify;
var indexOfFunction = require('./utils').indexOfFunction;
exports.Then = Then;

function Then(_protected) {
    return function() {
        var args = arrayify(arguments);
        return _protected.self.setFunction(function () {
            var fIndex = indexOfFunction(args);
            if(~fIndex) {
                var f = [].splice.apply(args, [fIndex, 1].concat(arrayify(arguments)))[0];
                var output = f.apply(this, args);
                if(output !== undefined) return output;
                _protected.argsStack.push(args);
                _protected.funStack.pop();
                _protected.funStack.push(f);
            } else {
                _protected.funStack.pop();
                _protected.argsStack.push(args.concat(arrayify(arguments)));
            }

        }).execute();
    }
}