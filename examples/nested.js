var Stepply = require('../index');

Stepply.Stepper()
    .setArguments(1)
    .setFunction(inc).execute()
    .setFunction(inc).execute()
    .setFunction(nest).execute()
    .setFunction(inc).execute();



function inc(val) {
    var stepPauser = new Stepply.StepPauser();
    console.log('inc', val);
    setTimeout(function() {
        stepPauser.resume(++val);
    }, 500);
    return stepPauser;

}


function nest(val) {
    return Stepply.Stepper()
        .setArguments(val).setFunction(inc).execute()
        .setFunction(inc).execute()
        .setFunction(inc).execute()
        .setFunction(inc).execute()
        .setFunction(inc).execute();
}