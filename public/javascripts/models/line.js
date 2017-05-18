define(['models/element'],
    function (Element) {
        const Line = Element.extend({
            parse(response, options) {
                console.log('parsing line');
                //moving nested properties up on one level with 'type',
                return {
                    'type': response.type,
                    'x1': response.properties.start.x,
                    'y1': response.properties.start.y,
                    'x2': response.properties.end.x,
                    'y2': response.properties.end.y,
                    'stroke': response.properties['stroke-color'],
                    'stroke-width': response.properties['stroke-width'],
                    'stroke-dasharray': this._getStrokeDashArray(response.properties['stroke-style'])
                };
            }

        });
        return Line;
    }
);
