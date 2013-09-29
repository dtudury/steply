/**
 * Created with IntelliJ IDEA.
 * User: davidtudury
 * Date: 9/28/13
 * Time: 8:48 PM
 */

var should = require('chai').should();
var Sinon = require('sinon');
var Steply = require('../index.js');


describe('Stepper', function () {
    describe('#log()', function () {
        it('should log values', function (done) {
            var spy = Sinon.spy(console, 'log');
            Steply(13, 14).log().exec(function() {
                spy.calledWith(13, 14).should.equal(true);
                done();
            });
        });
        it('should not be in the function stack (after it\'s logged)', function (done) {
            var spy = Sinon.spy();
            Steply(spy, 17, 18).log()().exec(function() {
                spy.calledTwice.should.equal(true);
                done();
            });
        });
    });
});