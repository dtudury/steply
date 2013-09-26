var Stepply = require('../index');

Stepply(2).log("initial value")
    .all(pauser, pauser, pauser).log("results")
    .args(1).exec().log("results 2");


function pauser(duration) {
    var stepPauser = new Stepply.StepPauser();
    console.log('pause for:', duration, 'second' + (duration === 1 ? '' : 's'));
    setTimeout(function() {
        console.log('pause completed...');
        stepPauser.resume(Math.random());
    }, 1000 * duration);
    return stepPauser;
}