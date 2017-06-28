define(["./shape"],
    function(Shape) {
        const Ellipse = Shape.extend({
            defaults: {
                "type": "line",
                "cx": 50,
                "cy": 50,
                "rx": 30,
                "ry": 40,
                "fill": "cyan",
                "stroke": "black",
                "stroke-width": 2,
                "stroke-dasharray": 0,
            },

            parse(response, options) {
                console.log("parsing ellipse");
                return {
                    "type": response.type,
                    "cx": response.properties.x,
                    "cy": response.properties.y,
                    "rx": response.properties.rx,
                    "ry": response.properties.ry,
                    "fill": response.properties.fill,
                    "stroke": response.properties["stroke-color"],
                    "stroke-width": response.properties["stroke-width"],
                    "stroke-dasharray": this._getStrokeDashArray(response.properties["stroke-style"])
                };
            },

            unparse() {
                return {
                    type: "ellipse",
                    properties: {
                        x: this.get("cx"),
                        y: this.get("cy"),
                        rx: this.get("rx"),
                        ry: this.get("ry"),
                        fill: this.get("fill"),
                        "stroke-color": this.get("stroke"),
                        "stroke-width": this.get("stroke-width"),
                        "stroke-style": this._getStrokeStyle()
                    }
                };
            },

            getSelectionCoords() {
                const ellipse = this.attributes;
                const x = ellipse.cx - ellipse.rx;
                const y = ellipse.cy - ellipse.ry;
                const width = 2 * ellipse.rx;
                const height = 2 * ellipse.ry;
                return [x, y, width, height];
            },

            move(deltas) {
                const { dx, dy } = deltas;
                const { cx, cy } = this.attributes;
                this.set({
                    "cx": parseFloat(cx) + dx,
                    "cy": parseFloat(cy) + dy
                });
            },
        });

        const toolbarAttrs = () => {
            const width = 80;
            const height = 40;
            const xPadding = 10;
            const yPadding = 5;
            return {
                cx: width / 2,
                cy: height / 2,
                rx: width / 2 - xPadding,
                ry: height / 2 - yPadding,
                fill: "none",
                stroke: "black",
                "stroke-width": 3,
            };
        };

        return { Model: Ellipse, toolbarAttrs: toolbarAttrs() };
    }
);
