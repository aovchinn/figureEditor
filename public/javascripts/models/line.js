define([
    'backbone'
], function (Backbone) {

    var Line = Backbone.Model.extend({
        defaults: {
            'type': 'line',
            'x1': '100',
            'y1': '90',
            'x2': '200',
            'y2': '160',
            'stroke': '#000000',
            'stroke-width': '2',
            'stroke-dasharray': '0'
        },

        parse(attrs, options) {
            console.log('parsing line');
            var strokeDashArray = '0'; // default value 'solid'
            if (attrs.properties['stroke-style'] === 'dotted') {
                strokeDashArray = '1, 4';
            } else if (attrs.properties['stroke-style'] === 'dashed') {
                strokeDashArray = '8, 10';
            }

            //moving nested properties up on one level with 'type',
            return {
                'type': attrs.type,
                'x1': attrs.properties.start.x,
                'y1': attrs.properties.start.y,
                'x2': attrs.properties.end.x,
                'y2': attrs.properties.end.y,
                'stroke': attrs.properties['stroke-color'],
                'stroke-width': attrs.properties['stroke-width'],
                'stroke-dasharray': strokeDashArray
            };
        }
    });

    return Line;
});
