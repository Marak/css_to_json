if (typeof(require) !== 'undefined') { var tree = require('less/tree') }

tree.Variable = function Variable(name) { this.name = name };
tree.Variable.prototype = {
    eval: function (env) {
        var variable, v, name = this.name;

        if (variable = tree.find(env.frames, function (frame) {
            if (v = frame.variable(name)) {
                return v.value.eval(env);
            }
        })) { return variable }
        else {
            throw new(Error)("variable " + this.name + " is undefined");
        }
    }
};

