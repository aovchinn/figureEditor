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
            "click button[name='editButton']": "_toogleMode",
            "click button[name='cancelChangesButton']": "_cancelChanges",
            "click button[name='undoButton']": "_undo",
            "click button[name='redoButton']": "_redo",
        },

        initialize(options) {
            this._svg = options.svg.node();
            this._state = this.model.stateManager;
            this._createEl(options.insertAfter);
            this.$el.html(this.template);
            this._addShapeButtons();
            this._renderUndoRedo();
            $(".shapeButtons, .undoRedo, .rightButtons").hide();
            $(this._svg).addClass("pointer-events-none");
            this.listenTo(this._state, "change", this._renderUndoRedo);
        },

        _createEl(insertAfter) {
            $(".toolbar").remove();
            const elHtml = "<nav class='toolbar'></nav>";
            const el = $(elHtml).insertAfter(insertAfter);
            this.setElement(el);
        },

        _addShapeButtons() {
            const container = this.$(".shapeButtons")[0];
            _.each(this._getToolbarShapes(), (attributes, type) => {
                const svgButton = this._createSvgButton(container);
                $(svgButton.node()).on("mousedown", e => this._dragstart(type, e));
                const buttonShape = svgButton.append(type);
                _.each(attributes, (value, key) => buttonShape.attr(key, value));
            });
        },

        _getToolbarShapes() {
            return {
                ellipse: {
                    cx: 40,
                    cy: 20,
                    rx: 24,
                    ry: 12,
                    fill: "none",
                    stroke: "#ffffff",
                    "stroke-width": 3,
                },
                line: {
                    x1: 16,
                    y1: 20,
                    x2: 64,
                    y2: 20,
                    stroke: "#ffffff",
                    "stroke-width": 3,
                    "stroke-linecap": "round"
                },
                rect: {
                    x: 16,
                    y: 8,
                    width: 48,
                    height: 24,
                    fill: "none",
                    stroke: "#ffffff",
                    "stroke-width": 3,
                    rx: 3
                }
            };
        },

        _createSvgButton(container) {
            return d3.select(container)
                .insert("button")
                .insert("svg")
                    .attr("width", "80")
                    .attr("height", "40");
        },

        _dragstart(shapeType, e) {
            eventDispatcher.trigger("dragstart:mousedown", shapeType, e);
        },

        _renderUndoRedo() {
            const index = this._state.get("index");
            const length = this._state.getLength();
            const isStart = index === 0;
            const isEnd = index === length - 1;
            this._toggleElement(this.$("button[name='undoButton']"), isStart);
            this._toggleElement(this.$("button[name='redoButton']"), isEnd);
        },

        _toggleElement(element, state) {
            if (state) {
                element.attr("disabled", "disabled");
            } else {
                element.removeAttr("disabled");
            }
        },

        _saveDiagram() {
            eventDispatcher.trigger("save:diagram");
            this._toogleMode();
        },

        _toogleMode() {
            $(this._svg).toggleClass("pointer-events-none");
            this.$("button[name='editButton'], .shapeButtons, .undoRedo, .rightButtons").toggle();
        },

        _cancelChanges() {
            eventDispatcher.trigger("cancel:changes");
            this._toogleMode();
        },

        _undo() {
            eventDispatcher.trigger("undo:state");
        },

        _redo() {
            eventDispatcher.trigger("redo:state");
        },
    });

    return Toolbar;
});
