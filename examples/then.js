var Stepply = require('../index');
var arrayify = require('../lib/utils').arrayify;

Stepply(1, 2, 3)
    .log("log1")
    .then(5, myLog, 7)
    .log("log2").then(6, 7, 8)
    .exec()
    .exec();


function myLog() {
    console.log.apply(console, ["mylog:"].concat(arrayify(arguments)));
}