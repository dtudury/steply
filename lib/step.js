
var _DEFAULT = {description:'default'}; // static constant object reference for '===' comparisons

exports.step = Step;
exports._default = _DEFAULT;

function Step(nextThis, nextFunction, nextArguments) {
    this.obj = nextThis === undefined ? _DEFAULT : nextThis;
    this.fun = nextFunction === undefined ? _DEFAULT : nextFunction;
    this.args = nextArguments === undefined ? _DEFAULT : nextArguments;
    this.toString = function() {
        var objName = this.obj !== _DEFAULT ? this.obj : "<inherited>";
        var funName = this.fun !== _DEFAULT ? this.fun.name || "<anonymous function>" : "<inherited>";
        var argsName = this.args !== _DEFAULT ? this.args.toString() : "<inherited>";

        return objName + "." + funName + "(" + argsName + ")";
    };
}