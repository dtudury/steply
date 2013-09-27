/**
 * Created with IntelliJ IDEA.
 * User: davidtudury
 * Date: 9/26/13
 * Time: 2:45 PM
 */

var arrayify = require('./utils').arrayify;
var StepPauser = require('./step-pauser').StepPauser;

exports.Node = Node;
exports.NodeNoErr = NodeNoErr;

function Node(_protected) {
    return function() {
        var args = arrayify(arguments);
        if(typeof args[0] !== 'function') {
            throw new Error('node function must be before any arguments')
        }
        var fun = args.shift();
        return _protected.self.setFunction(function () {
            var stepPauser = new StepPauser();
            if(!args.length) args = arrayify(arguments);
            var callback = function(error, value) {
                if(error) throw error;
                if(value === undefined) stepPauser.resume();
                else stepPauser.resume(value);
            }
            fun.apply(null, args.concat([callback]));
            return stepPauser;
        }).execute();
    }
}

function NodeNoErr(_protected) {
    return function() {
        var args = arrayify(arguments);
        if(typeof args[0] !== 'function') {
            throw new Error('node function must be before any arguments')
        }
        var fun = args.shift();
        return _protected.self.setFunction(function () {
            var stepPauser = new StepPauser();
            if(!args.length) args = arrayify(arguments);
            var callback = function(value) {
                if(value === undefined) stepPauser.resume();
                else stepPauser.resume(value);
            }
            fun.apply(null, args.concat([callback]));
            return stepPauser;
        }).execute();
    }
}