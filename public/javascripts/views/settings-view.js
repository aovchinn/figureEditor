define([
    "jquery",
    "underscore",
    "backbone",
    "d3",
    "../eventDispatcher",
    "text!./templates/ellipseSettings.html",
    "text!./templates/lineSettings.html"
], function($, _, Backbone, d3, eventDispatcher,
    ellipseSettings, lineSettings) {

    const settingsView = Backbone.View.extend({
        events: {
            "input form": "_saveShape"
        },

        initialize(options) {
            this.createElement(options.svg.node());
            this.render();
        },

        createElement(svgNode) {
            const el = $("<div class='settings'></div>").insertAfter(svgNode);
            this.setElement(el);
        },

        render() {
            this.$el.empty();
            this.$el.append(this._getTemplate());
        },

        _getTemplate() {
            const attr = _.assign(this.model.toJSON(), {
                strokes: {
                    "dashed": "8, 10",
                    "dotted": "1, 4",
                    "solid": "0"
                }
            });

            const types = {
                ellipse: _.template(ellipseSettings, { variable: "data" }),
                line: _.template(lineSettings, { variable: "data" })
            };

            return types[attr.type] ? types[attr.type](attr) : "";
        },

        _saveShape(e) {
            const data = $("form").serializeArray();
            const inputData = data.reduce((res, { name, value }) => {
                res[name] = value;
                return res;
            }, {});
            eventDispatcher.trigger("change:shapeProperties", this.model, inputData);
        },

    });
    return settingsView;
}
);
