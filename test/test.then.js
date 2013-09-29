/**
 * Created with IntelliJ IDEA.
 * User: davidtudury
 * Date: 9/28/13
 * Time: 10:03 PM
 */

var should = require('chai').should();
var Steply = require('../index.js');

describe('Stepper', function () {
    describe('#then()', function () {
        it('should allow and call function definition', function (done) {
            Steply(function () {
                done();
            });
        });
        it('should allow function definition and arguments', function (done) {
            Steply(function (a, b) {
                a.should.equal(1);
                b.should.equal(2);
                done();
            }, 1, 2);
        });
        it('should allow argument splicing', function (done) {
            Steply(3)(2, function (a, b, c) {
                a.should.equal(2);
                b.should.equal(3);
                c.should.equal(4);
                done();
            }, 4);
        });
    });
});