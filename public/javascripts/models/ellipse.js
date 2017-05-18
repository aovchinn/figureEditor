define(['models/element'],
    function (Element) {
        const Ellipse = Element.extend({
            parse(response, options) {
                console.log('parsing ellipse');
                return {
                    'type': response.type,
                    'cx': response.properties.x,
                    'cy': response.properties.y,
                    'rx': response.properties.rx,
                    'ry': response.properties.ry,
                    'fill': response.properties.fill,
                    'stroke': response.properties['stroke-color'],
                    'stroke-width': response.properties['stroke-width'],
                    'stroke-dasharray': this._getStrokeDashArray(response.properties['stroke-style'])
                };
            },
        });
        return Ellipse;
    }
);
