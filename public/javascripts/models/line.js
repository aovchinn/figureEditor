define(["./shape"],
    function(Shape) {
        const Line = Shape.extend({
            defaults: {
                "type": "line",
                "x1": 0,
                "y1": 0,
                "x2": 100,
                "y2": 0,
                "stroke": "#000000",
                "stroke-width": 2,
                "stroke-dasharray": 0,
            },

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
                    "stroke-dasharray": this._getStrokeDashArray(response.properties["stroke-style"]),
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
            },

            move(deltas) {
                const { dx, dy } = deltas;
                const { x1, y1, x2, y2 } = this.attributes;
                this.set({
                    x1: parseFloat(x1) + dx,
                    y1: parseFloat(y1) + dy,
                    x2: parseFloat(x2) + dx,
                    y2: parseFloat(y2) + dy,
                });
            },
        });

        const toolbarAttrs = () => {
            const width = 80;
            const height = 40;
            const xPadding = 10;
            return {
                x1: xPadding,
                y1: height / 2,
                x2: width - xPadding,
                y2: height / 2,
                stroke: "#ffffff",
                "stroke-width": 5,
                "stroke-linecap": "round"
            };
        };

        return { Model: Line, toolbarAttrs: toolbarAttrs() };
    }
);
