//var Stepply = require('./index'); //circular require problem...
var arrayify = require('./utils').arrayify;

exports.All = All;

function All(_protected) {
    var Stepply = require('./index');
    return function() {
        var functions = arrayify(arguments);
        return _protected.self.setFunction(function () {
            var stepPauser = new Stepply.StepPauser();
            var unresolvedCount = functions.length;
            var results = [];
            for(var i = 0; i < functions.length; i++) {
                (function (i) {
                    Stepply().arr(_protected.topArgs()).fun(functions[i]).exec()
                        .f(function() {
                            unresolvedCount--;
                            results[i] = arrayify(arguments);
                            if(unresolvedCount === 0) {
                                stepPauser.resume.apply(null, results);
                            }
                        }).x();
                })(i);
            }
            return stepPauser;
        }).execute();
    }
}

