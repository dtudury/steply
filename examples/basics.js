var Steply = require('../index');

Steply.Stepper()
    .setArguments(1, 2, 3).setFunction(log).execute()
    .setFunction(sum).execute()
    .setFunction(log).execute()
    .setArguments(2, 3, 4).setFunction(log).execute()
    .setArguments(1).setFunction(pauser).execute()
    .execute([0.5])
    .execute(log, [1, 2, 3]);


function log() {
    console.log('log1:', arguments);
}

function sum () {
    var output = 0;
    for(var i = 0; i < arguments.length; i++) {
        output += arguments[i];
    }
    return output;
}

function pauser(duration) {
    var stepPauser = new Steply.StepPauser();
    console.log('pause for:', duration, 'second', duration === 1 ? '' : 's');
    setTimeout(function() {
        console.log('pause completed...');
        stepPauser.resume();
    }, 1000 * duration);
    return stepPauser;
}