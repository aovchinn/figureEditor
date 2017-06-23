define(["underscore", "backbone", "d3", "../eventDispatcher"],
  function(_, Backbone, d3, eventDispatcher) {
      const SELECTION_PADDING = 4;

      const ellipseView = Backbone.View.extend({
          events: {
              "click": "_toggleSelect"
          },

          initialize(options) {
              this.svg = options.svg;
              this.shape = this.svg.append(this.model.get("type"));
              this.setElement(this.shape.node());
              this.render();
              this.listenTo(this.model, "change", this.render);
          },

          render() {
              const attributes = _.omit(this.model.toJSON(), "type");
              _.each(attributes, (value, key) => this.shape.attr(key, value));
              if (this.model.get("selected")) {
                  this._drawSelection(...this.model.getSelectionCoords());
              } else {
                  this._clearSelection();
              }
          },

          _toggleSelect: function(e) {
              eventDispatcher.trigger("toggle:shapeSelection", this.model, this.svg);
          },

          _drawSelection(x, y, width, height) {
              this._clearSelection();
              this.selection = this.svg.append("rect")
                  .classed("selection", true)
                  .attr("x", x - SELECTION_PADDING / 2)
                  .attr("y", y - SELECTION_PADDING / 2)
                  .attr("width", width + SELECTION_PADDING)
                  .attr("height", height + SELECTION_PADDING)
                  .attr("rx", 5)
                  .attr("stroke", "aqua")
                  .attr("stroke-width", 2)
                  .attr("stroke-dasharray", "10, 4")
                  .attr("fill", "aqua")
                  .attr("fill-opacity", 0.3);
          },

          _clearSelection() {
              if (this.selection) {
                  this.selection.remove();
              }
          },
      });

      return ellipseView;
  });
