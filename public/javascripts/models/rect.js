define(["./shape"],
    function(Shape) {
        const Rect = Shape.extend({
            defaults: {
                "type": "rect",
                "x": -50,
                "y": -20,
                "width": 100,
                "height": 40,
                "fill": "#00796b",
                "stroke": "#000000",
                "stroke-width": 2,
                "stroke-dasharray": 0,
            },

            parse(response, options) {
                console.warn("parsing format for rect is not defined");
                return {
                    "type": response.type,
                    "x": response.properties.x,
                    "y": response.properties.y,
                    "width": response.properties.width,
                    "height": response.properties.height,
                    "fill": response.properties.fill,
                    "stroke": response.properties["stroke-color"],
                    "stroke-width": response.properties["stroke-width"],
                    "stroke-dasharray": this._getStrokeDashArray(response.properties["stroke-style"]),
                };
            },

            unparse() {
                return {
                    type: "rect",
                    properties: {
                        x: this.get("x"),
                        y: this.get("y"),
                        width: this.get("width"),
                        height: this.get("height"),
                        "stroke-color": this.get("stroke"),
                        "stroke-width": this.get("stroke-width"),
                        "stroke-style": this._getStrokeStyle()
                    }
                };
            },

            getSelectionCoords() {
                const { x, y, width, height } = this.attributes;
                return [+x, +y, +width, +height];
            },

            move(deltas) {
                const { dx, dy } = deltas;
                const { x, y } = this.attributes;
                this.set({
                    x: parseInt(x) + dx,
                    y: parseInt(y) + dy,
                });
            },
        });

        return { Model: Rect };
    }
);
