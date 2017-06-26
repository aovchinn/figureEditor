define([
    "underscore",
    "jquery",
    "backbone",
    "d3",
    "views/shape-view",
], function(_, $, Backbone, d3, ShapeView) {
    const View = Backbone.View.extend({
        initialize(options) {
            this._createEl(options.container);
            this._createDiagram();
            this.render();
            this.listenTo(this.model, "update", this.render);
        },

        //_createElement is alredy declared inside Bb
        _createEl(container) {
            $(container).empty();
            const elHtml = "<div class='diagram'></div>";
            const el = $(elHtml).appendTo(container);
            this.setElement(el);
        },

        _createDiagram() {
            this.shapeViews = [];
            this.$el.prepend("<h2 class='title'></h2>");
            this.$title = this.$(".title");
            this.svg = d3.select(this.el)
                .insert("svg")
                    .attr("width", "300")
                    .attr("height", "500");
        },

        render() {
            this._clear();
            this._renderTitle();
            this._createShapeViews();
        },

        _clear() {
            this.$title.empty();
            _.each(this.shapeViews, view => view.remove());
        },

        _renderTitle() {
            const title = this.model.get("title");
            this.$title.text(title);
            $("title").text(title);
        },

        _createShapeViews() {
            this.shapeViews = this.model.shapes.map(this._createShapeView.bind(this));
        },

        _createShapeView(model) {
            return new ShapeView({ model: model, svg: this.svg });
        },
    });

    return View;
});
