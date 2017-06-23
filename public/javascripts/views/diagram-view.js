define([
    "underscore",
    "jquery",
    "backbone",
    "d3",
    "views/shape-view",
], function(_, $, Backbone, d3, ShapeView) {
    const View = Backbone.View.extend({
        initialize() {
            this.$el.empty();
            this.$el.prepend("<h2 class='title'></h2>");
            this.$title = this.$(".title");
            this.shapeViews = [];
            this.svg = d3.select(this.el)
                .insert("svg")
                    .attr("width", "300")
                    .attr("height", "200");
            this.render();
            this.listenTo(this.collection, "update", this.render);
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
            this.$title.text(this.collection.getTitle());
        },

        _createShapeViews() {
            this.shapeViews = this.collection.map(this._createShapeView.bind(this));
        },

        _createShapeView(model) {
            return new ShapeView({ model: model, svg: this.svg });
        },
    });

    return View;
});
