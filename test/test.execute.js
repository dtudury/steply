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
        it('should allow argument array definition', function (done) {
            Steply().f(function (a, b) {
                a.should.equal(1);
                b.should.equal(2);
                done();
            }).exec([1, 2]);
        });
        it('should allow function definition', function (done) {
            Steply(3, 4).exec(function (a, b) {
                a.should.equal(3);
                b.should.equal(4);
                done();
            });
        });
        it('should allow function definition and argument array definition', function (done) {
            Steply().exec(function (a, b) {
                a.should.equal(3);
                b.should.equal(4);
                done();
            }, [3, 4]);
        });
        it('should allow `this` definition', function (done) {
            Steply().f(function () {
                this.a.should.equal(7);
                this.b.should.equal(8);
                done();
            }).exec({a:7, b:8});
        });
        it('should allow `this` definition and argument array definition', function (done) {
            Steply().f(function (b) {
                this.a.should.equal(7);
                b.should.equal(11);
                done();
            }).exec({a:7}, [11]);
        });
        it('should allow `this` definition and function definition', function (done) {
            Steply().exec({a:7, b:8}, function () {
                this.a.should.equal(7);
                this.b.should.equal(8);
                done();
            });
        });
        it('should allow `this` definition, function definition, and argument array definition', function (done) {
            Steply().exec({a:7}, function (b) {
                this.a.should.equal(7);
                b.should.equal(11);
                done();
            }, [11]);
        });
    });
});