var StepPauser = require('./step-pauser').StepPauser;

exports.Wait = Wait;

function Wait(_protected) {
    return function(delay) {
        return _protected.self.setFunction(function () {
            var stepPauser = new StepPauser();
            setTimeout(function () {
                stepPauser.resume();
            }, delay);
            _protected.funStack.pop();
            return stepPauser;
        }).execute();
    }
}