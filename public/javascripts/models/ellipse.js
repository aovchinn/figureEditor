define([
    'backbone'
], function (Backbone) {

    var Ellipse = Backbone.Model.extend({
        defaults: {
            'type': 'ellipse',
            'cx': '0',
            'cy': '0',
            'rx': '0',
            'ry': '0',
            'fill': '#BDBBB8',
            'stroke': '#0000ff',
            'stroke-width': '2',
            'stroke-dasharray': '0',
        },

        parse(attrs, options) {
            console.log('parsing ellipse');
            //strokeDashArray - the border of ellipse (solid, dashed or dotted)
            var strokeDashArray = '0'; // default value 'solid'
            if (attrs.properties['stroke-style'] === 'dotted') {
                strokeDashArray = '1, 4';
            } else if (attrs.properties['stroke-style'] === 'dashed') {
                strokeDashArray = '8, 10';
            }

            //moving nested properties up on one level with 'type',
            return {
                'type': attrs.type,
                'cx': attrs.properties.x,
                'cy': attrs.properties.y,
                'rx': attrs.properties.rx,
                'ry': attrs.properties.ry,
                'fill': attrs.properties.fill,
                'stroke': attrs.properties['stroke-color'],
                'stroke-width': attrs.properties['stroke-width'],
                'stroke-dasharray': strokeDashArray
            };
        }

    });

    return Ellipse;
});
