/**
 * Created with IntelliJ IDEA.
 * User: davidtudury
 * Date: 10/1/13
 * Time: 6:19 PM
 */

var should = require('chai').should();
var Steply = require('../index.js');

describe('Stepper', function () {
    describe('#wait()', function () {
        it('should call delayed argument', function (done) {
            Steply().wait(20).f(function (a) {
                done();
            }).x();
        });
        it('should preserve arguments but remove its self from the function stack', function (done) {
            Steply(4).wait(20)
                .f(function (a) {
                    a.should.equal(4);
                }).x().x()
                .f(function (a) {
                    a.should.equal(4);
                    done();
                }).x();
        });
    });
});