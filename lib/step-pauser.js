exports.StepPauser = StepPauser;

function StepPauser() {
    this.resume = function() {
        this.resolution = arguments;
    };
}