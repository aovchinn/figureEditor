define(["underscore", "backbone", "d3", "../eventDispatcher"],
  function(_, Backbone, d3, eventDispatcher) {
      const SELECTION_PADDING = 6;

      const shapeView = Backbone.View.extend({
          events: {
              "click": "_toggleSelect",
          },

          initialize(options) {
              this.svg = options.svg;
              this.shape = this.svg.append(this.model.get("type"));
              this.setElement(this.shape.node());
              this.render();
              this.listenTo(this.model, "change", this.render);
          },

          render() {
              const attributes = _.omit(this.model.toJSON(), "type", "selected");
              _.each(attributes, (value, key) => this.shape.attr(key, value));
              this.shape.call(d3.drag().on("drag", () => this._dragged()));
              if (this.model.get("selected")) {
                  this._drawSelection(...this.model.getSelectionCoords());
              } else {
                  this._clearSelection();
              }
          },

          _dragged() {
              eventDispatcher.trigger("move:shape", this.model, {
                  "dx": d3.event.dx,
                  "dy": d3.event.dy,
              });
          },

          _toggleSelect(e) {
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
                  .attr("stroke", "#00796b")
                  .attr("stroke-dasharray", "4, 4")
                  .attr("stroke-linecap", "round")
                  .attr("fill", "#00796b")
                  .attr("fill-opacity", 0.15);
          },

          _clearSelection() {
              if (this.selection) {
                  this.selection.remove();
              }
          },
      });

      return shapeView;
  });
