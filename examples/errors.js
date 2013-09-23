var Stepply = require('../index');

Stepply("a").log("log1")
    .args("b").fun(thrower).exec().log("log2")
    .args("c").log("log3")
    .args("d").log("log4")
    .err(catcher)
    .args("e").log("log5");


function thrower() {
    console.log("throwing");
    throw new Error("whatever");
}


function catcher(e) {
    console.log(e);
//    throw new Error("nope, don't handle this one");
}