var Stepper = require('./stepper').Stepper;
var StepPauser = require('./step-pauser').StepPauser

module.exports = function () {
    if (arguments.length) {
        return new Stepper().then.apply(void 0, arguments);
    } else {
        return new Stepper();
    }
}
module.exports.Stepper = Stepper;
module.exports.StepPauser = StepPauser;
