/**
 * Created with IntelliJ IDEA.
 * User: davidtudury
 * Date: 9/30/13
 * Time: 11:28 PM
 */

var should = require('chai').should();
var Steply = require('../index.js');

describe('Stepper', function () {
    describe('#execute()', function () {
        it('should override arguments', function () {
            Steply(5).setArguments(6).f(function (a) {
                a.should.equal(6);
            }).x().done();
        });
        it('should override arguments', function () {
            Steply(5).setArgumentsArray([7]).f(function (a) {
                a.should.equal(7);
            }).x().done();
        });
        it('should set this', function () {
            Steply().setThis({a:5}).f(function () {
                this.a.should.equal(5);
            }).x().done();
        });
        it('should override this', function () {
            Steply().setThis({a:5}).setThis({a:19}).f(function () {
                this.a.should.equal(19);
            }).x().done();
        });
        it('should override function', function () {
            Steply().f(function() {
                throw new Error('this shouldn\'t happen');
            }).f(function () {}).x().done();
        });
    });
});