define([
    "underscore",
    "jquery",
    "backbone",
    "d3",
    "../eventDispatcher",
    "text!./templates/toolbar-template.html"
], function(_, $, Backbone, d3, eventDispatcher, toolbarTemplate) {
    const Toolbar = Backbone.View.extend({
        template: _.template(toolbarTemplate),
        events:  {
            "click button[name='saveDiagramButton']": "_saveDiagram",
        },

        _saveDiagram() {
            console.log("saving diagram");
            eventDispatcher.trigger("save:diagram");
        },

        initialize(options) {
            this._createEl(options.insertAfter);
            this.render();
        },

        _createEl(insertAfter) {
            $(".toolbar").remove();
            const elHtml = "<nav class='toolbar'></nav>";
            const el = $(elHtml).insertAfter(insertAfter);
            this.setElement(el);
        },

        render() {
            this.$el.html(this.template);
            this._addShapeButtons();
        },

        _addShapeButtons() {
            const toolbarShapes = this.collection.getToolbarShapes();
            const buttonsContainer = this.$(".shapeButtons")[0];
            _.each(toolbarShapes, (attributes, shapeType) => {
                const svgButton = d3.select(buttonsContainer)
                    .insert("button")
                    .insert("svg")
                        .attr("width", "80")
                        .attr("height", "40");
                $(svgButton.node()).on("mousedown", e => {
                    eventDispatcher.trigger("dragstart:mousedown", shapeType, e);
                });
                const toolbarShape = svgButton.append(shapeType);
                _.each(attributes, (value, key) => toolbarShape.attr(key, value));
            });
        },
    });

    return Toolbar;
});
