/**
 * Created with IntelliJ IDEA.
 * User: davidtudury
 * Date: 9/28/13
 * Time: 3:50 PM
 */

var should = require('chai').should();
var Steply = require('../index.js');

describe('Stepper', function () {
    describe('#execute()', function () {
        it('should pass values to the function synchronously', function () {
            Steply(5).f(function (a) {
                a.should.equal(5);
            }).exec().done();
        });
        it('should pass values to the function asynchronously', function (done) {
            Steply(6, 7).f(function (a, b) {
                a.should.equal(6);
                b.should.equal(7);
                done();
            }).exec();
        });
    });
});