var _DEFAULT = require('./step')._default;
var Step = require('./step').step;
var StepPauser = require('./step-pauser').StepPauser;
var arrayify = require('./utils').arrayify;

var Then = require('./stepper-then').Then;
var Log = require('./stepper-log').Log;


exports.Stepper = Stepper;


function Stepper() {

    if (!(this instanceof Stepper)) return new Stepper();

    process.nextTick(_runStep);

    var _protected = {
        self: this,
        nextStep: new Step(),
        steps: [],
        objStack: [],
        funStack: [],
        argsStack: []
    };

    //core functionality
    _protected.self.setThis = setThis;
    _protected.self.obj = setThis;
    _protected.self.setFunction = setFunction;
    _protected.self.fun = setFunction;
    _protected.self.setArguments = setArguments;
    _protected.self.args = setArguments;
    _protected.self.setErrorHandler = setErrorHandler;
    _protected.self.err = setErrorHandler;
    _protected.self.execute = execute;
    _protected.self.exec = execute;

    //fancy functionality
    _protected.self.then = Then(_protected);
    _protected.self.log = Log(_protected);


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


    function setErrorHandler(nextErrorHandler) {
        var step = new Step();
        step.err = nextErrorHandler;
        _protected.steps.push(step);
        return _protected.self;
    }


    function execute() {
        _protected.steps.push(_protected.nextStep);
        _protected.nextStep = new Step();
        return _protected.self;
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
                if (result instanceof StepPauser || result instanceof Stepper) {
                    result.resume = _resume;
                    return;
                }
                if (result !== undefined) _protected.argsStack.push(topArgs = [result]);
            }
        }
        if (_protected.self.resume) _protected.self.resume.apply(_topObj(), _topArgs());
    }


    function _try(fun, obj, args) {
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