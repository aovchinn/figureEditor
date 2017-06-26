define(["underscore", "backbone"],
    function(_, Backbone) {
        const Shape = Backbone.Model.extend({
            strokes: {
                "dashed": "8, 10",
                "dotted": "1, 4",
                "solid": "0"
            },

            _getStrokeDashArray(strokeStyle) {
                return this.strokes[strokeStyle] || this.strokes.solid;
            },

            _getStrokeStyle() {
                return _.findKey(this.strokes,
                    value => value === this.get("stroke-dasharray")
                );
            }
        });
        return Shape;
    }
);
