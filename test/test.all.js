/**
 * Created with IntelliJ IDEA.
 * User: davidtudury
 * Date: 10/1/13
 * Time: 6:25 PM
 */

var should = require('chai').should();
var Steply = require('../index.js');

describe('Stepper', function () {
    describe('#all()', function () {
        it('should resolve all functions and pass results', function (done) {
            Steply()
                .all(function () {
                    return 3;
                }, function () {
                    return 5;
                }, function () {
                    return 7;
                })
                .f(function (a, b, c) {
                    a.should.deep.equal([3]);
                    b.should.deep.equal([5]);
                    c.should.deep.equal([7]);
                    done();
                }).x();
        });
        it('should resolve all functions and pass results', function (done) {
            Steply()
                .all(function () {
                    return Steply(4).wait(200).f(function(a){console.log('asdf', a); return a;}).x();
                }, function () {
                    return Steply(6).wait(200).x(function(a){return a;});
                }, function () {
                    return Steply(8).wait(200).x(function(a){return a;});
                })
                .f(function (a, b, c) {
//                    console.log(a);
//                    a.should.deep.equal([4]);
//                    b.should.deep.equal([6]);
//                    c.should.deep.equal([8]);
                    done();
                }).x();
        });
    });
});