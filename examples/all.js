var Stepply = require('../index');

Stepply(2).log("initial value")
    .all(pauser, pauser, pauser).log("results")
    .args(1).exec().log("results 2");


function pauser(duration) {
    return Stepply('pause for:', duration, 'second' + (duration === 1 ? '' : 's')).log()
        .wait(duration * 1000)
        .args('pause complete').log()
        .fun(Math.random).exec();
}