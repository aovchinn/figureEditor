define(["./shape"],
    function(Shape) {
        const Ellipse = Shape.extend({
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

            getSelectionCoords() {
                const ellipse = this.attributes;
                const x = ellipse.cx - ellipse.rx;
                const y = ellipse.cy - ellipse.ry;
                const width = 2 * ellipse.rx;
                const height = 2 * ellipse.ry;
                return [x, y, width, height];
            }
        });
        return Ellipse;
    }
);
