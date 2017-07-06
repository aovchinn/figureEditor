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
            "input form": "_saveShape",
            "focusout input": "_saveState",
        },

        initialize(options) {
            this._createEl(options.svg.node());
            this.$el.hide();
            this.listenTo(this.model, "change:selectedShape", this._config);
        },

        _createEl(svgNode) {
            const elHtml = "<div class='settings'></div>";
            const el = $(elHtml).insertAfter($(svgNode).parent());
            this.setElement(el);
        },

        _config() {
            if (this.model.get("selectedShape")) {
                this.stateSaved = true;
                this.selectedShape = this.model.get("selectedShape");
                const renderMethod = this._getRenderMethod();
                this.listenTo(this.selectedShape, "change", renderMethod);
                this.$el.show();
                this._renderTemplate();
                renderMethod();
            } else {
                this.stopListening(this.selectedShape);
                this.$el.hide();
            }
        },

        _getRenderMethod() {
            const types = {
                ellipse: this._renderEllipseSettings.bind(this),
                line: this._renderLineSettings.bind(this),
            };
            const renderMethod = types[this.selectedShape.get("type")];
            if (renderMethod) {
                return renderMethod;
            } else {
                throw new Error(`shape type: ${this.selectedShape.get("type")} don't have render method`);
            }
        },

        _renderTemplate() {
            this.$el.html(this._getTemplate());
        },

        _renderEllipseSettings() {
            if (this.selectedShape.get("selected")) {
            // update input move/drag values without losing focus
            // and rerendering full template
                this.$("input#cx").val(this.selectedShape.get("cx"));
                this.$("input#cy").val(this.selectedShape.get("cy"));
            }
        },

        _renderLineSettings() {
            if (this.selectedShape.get("selected")) {
                this.$("input#x1").val(this.selectedShape.get("x1"));
                this.$("input#y1").val(this.selectedShape.get("y1"));
                this.$("input#x2").val(this.selectedShape.get("x2"));
                this.$("input#y2").val(this.selectedShape.get("y2"));
            }
        },


        _getTemplate() {
            const attr = _.assign(this.model.get("selectedShape").toJSON(), {
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
            this.stateSaved = false;
            const data = $("form").serializeArray();
            const inputData = data.reduce((res, { name, value }) => {
                res[name] = value;
                return res;
            }, {});
            eventDispatcher.trigger("change:shapeProperties", this.selectedShape, inputData);
        },

        _saveState() {
            if (!this.stateSaved) {
                this.stateSaved = true;
                eventDispatcher.trigger("save:state");
            }
        }
    });
    return settingsView;
}
);
