define([
    "backbone",
    "underscore",
    "../models/ellipse",
    "../models/line",
    "../models/rect"
],
function(Backbone, _, Ellipse, Line, Rect) {
    const Diagram = Backbone.Collection.extend({
        model: function(attrs, options) {
            const Model = {
                ellipse: Ellipse.Model,
                line: Line.Model,
                rect: Rect.Model
            };
            if (Model[attrs.type]) {
                return new Model[attrs.type](attrs, { parse: options.parseModel });
            } else {
                throw new Error(`can't create model of type: ${attrs.type}`);
            }
        },

        parse(response) {
            return response.components;
        },

        unparse() {
            return this.map(el => el.unparse());
        },
    });
    return Diagram;
});
