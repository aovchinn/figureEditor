define(["./shape"],
    function(Shape) {
        const Line = Shape.extend({
            parse(response, options) {
                console.log("parsing line");
                return {
                    "type": response.type,
                    "x1": response.properties.start.x,
                    "y1": response.properties.start.y,
                    "x2": response.properties.end.x,
                    "y2": response.properties.end.y,
                    "stroke": response.properties["stroke-color"],
                    "stroke-width": response.properties["stroke-width"],
                    "stroke-dasharray": this._getStrokeDashArray(response.properties["stroke-style"])
                };
            },

            unparse() {
                return {
                    type: "line",
                    properties: {
                        start: {
                            x: this.get("x1"),
                            y: this.get("y1")
                        },
                        end: {
                            x: this.get("x2"),
                            y: this.get("y2")
                        },
                        "stroke-color": this.get("stroke"),
                        "stroke-width": this.get("stroke-width"),
                        "stroke-style": this._getStrokeStyle()
                    }
                };
            },

            getSelectionCoords() {
                const line = this.attributes;
                const x = Math.min(line.x1, line.x2);
                const y = Math.min(line.y1, line.y2);
                const width = Math.abs(line.x2 - line.x1);
                const height = Math.abs(line.y2 - line.y1);
                return [x, y, width, height];
            }

        });
        return Line;
    }
);
