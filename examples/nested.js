var Steply = require('../index');

Steply.Stepper()
    .setArguments(1)
    .setFunction(inc).execute()
    .setFunction(inc).execute()
    .setFunction(nest).execute()
    .setFunction(inc).execute();



function inc(val) {
    var stepPauser = new Steply.StepPauser();
    console.log('inc', val);
    setTimeout(function() {
        stepPauser.resume(++val);
    }, 500);
    return stepPauser;

}


function nest(val) {
    return Steply.Stepper()
        .setArguments(val).setFunction(inc).execute()
        .setFunction(inc).execute()
        .setFunction(inc).execute()
        .setFunction(inc).execute()
        .setFunction(inc).execute();
}