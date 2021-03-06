var _DEFAULT = require('./step')._default;
var Step = require('./step').step;
var StepPauser = require('./step-pauser').StepPauser;
var arrayify = require('./utils').arrayify;

var Then = require('./stepper-then').Then;
var Log = require('./stepper-log').Log;
var All = require('./stepper-all').All;
var Wait = require('./stepper-wait').Wait;
var Node = require('./stepper-node').Node;
var NodeNoErr = require('./stepper-node').NodeNoErr;


exports.Stepper = Stepper;


function Stepper() {

    process.nextTick(start);

    var _started = false;

    var _protected = {
        nextStep: new Step(),
        steps: [],
        objStack: [],
        funStack: [],
        argsStack: []
    };
    _protected.self = Then(_protected);

    //core functionality
    _protected.self.setThis = setThis;
    _protected.self.obj = setThis;
    _protected.self.t = setThis;
    _protected.self.setFunction = setFunction;
    _protected.self.fun = setFunction;
    _protected.self.f = setFunction;
    _protected.self.setArguments = setArguments;
    _protected.self.args = setArguments;
    _protected.self.a = setArguments;
    _protected.self.setArgumentsArray = setArgumentsArray;
    _protected.self.arr = setArgumentsArray;
    _protected.self.setErrorHandler = setErrorHandler;
    _protected.self.err = setErrorHandler;
    _protected.self.e = setErrorHandler;
    _protected.self.execute = execute;
    _protected.self.exec = execute;
    _protected.self.x = execute;
    _protected.self.done = start;

    //fancy functionality
    _protected.self.then = _protected.self;
    _protected.self.log = Log(_protected);
    _protected.self.all = All(_protected);
    _protected.self.wait = Wait(_protected);
    _protected.self.node = Node(_protected);
    _protected.self.nodeNoErr = NodeNoErr(_protected);

    //helpers
    _protected.topObj = _topObj;
    _protected.topFun = _topFun;
    _protected.topArgs = _topArgs;


    return _protected.self;


    function setThis(nextThis) {
        _protected.nextStep.obj = nextThis;
        return _protected.self;
    }


    function setFunction(nextFunction) {
        _protected.nextStep.fun = nextFunction;
        return _protected.self;
    }


    function setArguments() {
        _protected.nextStep.args = arrayify(arguments);
        return _protected.self;
    }


    function setArgumentsArray(args) {
        _protected.nextStep.args = args;
        return _protected.self;
    }


    function setErrorHandler(nextErrorHandler) {
        var step = new Step();
        step.err = nextErrorHandler;
        _protected.steps.push(step);
        return _protected.self;
    }


    function execute() {
        if(arguments.length) {
            var args = arrayify(arguments);
            var lastArg = args.pop();
            if(Array.isArray(lastArg)) {
                setArgumentsArray(lastArg);
                lastArg = args.pop();
            }
            if(typeof lastArg === 'function') {
                setFunction(lastArg);
                lastArg = args.pop();
            }
            if(lastArg !== undefined) {
                setThis(lastArg);
                if(args.length) throw new Error('execute called with too many arguments or wrong type ([[[*, ]function, ]array]')
            }
        }
        _protected.steps.push(_protected.nextStep);
        _protected.nextStep = new Step();
        return _protected.self;
    }

    function start() {
        if(!_started) _runStep();
        _started = true;
    }


    function _resume() {
        if (arguments.length) _protected.argsStack.push(arrayify(arguments));
        _runStep();
    }


    function _runStep() {
        while (_protected.steps.length) {
            var currentStep = _protected.steps.shift();
            if(!currentStep.err) {
                if (currentStep.obj !== _DEFAULT) _protected.objStack.push(currentStep.obj);
                if (currentStep.fun !== _DEFAULT) _protected.funStack.push(currentStep.fun);
                if (currentStep.args !== _DEFAULT) _protected.argsStack.push(currentStep.args);
                var result = _try(_topFun(), _topObj(), _topArgs());
                if (result && (result instanceof StepPauser || result instanceof Stepper || result.setThis)) {
                    if(result.resolution) {
                        _protected.argsStack.push(arrayify(result.resolution));
                    } else {
                        result.resume = _resume;
                        return;
                    }
                } else if (result !== undefined) _protected.argsStack.push([result]);
            }
        }
        if (_protected.self.resume) _protected.self.resume.apply(_topObj(), _topArgs());
    }


    function _try(fun, obj, args) {
        if(!fun) return undefined; //likely setting arguments on the first "static" call
        try {
            var result = fun.apply(obj, args);
        } catch (e) {
            _jumpToErrorHandler(e);
            return new StepPauser();
        }
        return result;
    }


    function _jumpToErrorHandler(e) {
        while(_protected.steps.length) {
            var currentStep = _protected.steps.shift();
            if(currentStep.err) {
                if(_try(currentStep.err, void 0, [e]) instanceof StepPauser) return;
                _runStep();
                return;
            }
        }
        throw e;
    }


    function _topObj() {
        return _protected.objStack[_protected.objStack.length - 1];
    }


    function _topFun() {
        return _protected.funStack[_protected.funStack.length - 1];
    }


    function _topArgs() {
        return _protected.argsStack[_protected.argsStack.length - 1];
    }


}