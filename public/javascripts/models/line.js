define(["./shape"],
    function(Shape) {
        const Line = Shape.extend({
            parse(response, options) {
                console.log("parsing line");
                //moving nested properties up on one level with 'type',
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
