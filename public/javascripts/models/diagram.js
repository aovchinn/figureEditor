define([
    'underscore', 'backbone'
], function (_, Backbone) {
    var Diagram = Backbone.Model.extend({
        urlRoot: '/api/diagrams/',
        defaults: {
            'title': 'diagram-name',
            'components': []
        },

        initialize() {
            console.log('initializing diagram');
        },

        parse(response, options) {
            console.log(response);
            var parsed = [];
            var ellipses = _.where(response.components, {
                'type': 'ellipse'
            });
            var lines = _.where(response.components, {
                'type': 'line'
            });

            for (ellipse of ellipses) {
                parsed.push(parseEllipse(ellipse));
            }

            for (line of lines) {
                parsed.push(parseLine(line));
            }

            return {
                'title': response.title,
                'components': parsed
            };

            function parseEllipse(ellipse) {
                console.log('parsing ellipse');
                //strokeDashArray - the border of ellipse (solid, dashed or dotted)
                var strokeDashArray = '0'; // default value 'solid'
                if (ellipse.properties['stroke-style'] === 'dotted') {
                    strokeDashArray = '1, 4';
                } else if (ellipse.properties['stroke-style'] === 'dashed') {
                    strokeDashArray = '8, 10';
                }

                //moving nested properties up on one level with 'type',
                return {
                    'type': ellipse.type,
                    'cx': ellipse.properties.x,
                    'cy': ellipse.properties.y,
                    'rx': ellipse.properties.rx,
                    'ry': ellipse.properties.ry,
                    'fill': ellipse.properties.fill,
                    'stroke': ellipse.properties['stroke-color'],
                    'stroke-width': ellipse.properties['stroke-width'],
                    'stroke-dasharray': strokeDashArray
                };
            }

            function parseLine(line) {
                console.log('parsing line');
                var strokeDashArray = '0'; // default value 'solid'
                if (line.properties['stroke-style'] === 'dotted') {
                    strokeDashArray = '1, 4';
                } else if (line.properties['stroke-style'] === 'dashed') {
                    strokeDashArray = '8, 10';
                }

                //moving nested properties up on one level with 'type',
                return {
                    'type': line.type,
                    'x1': line.properties.start.x,
                    'y1': line.properties.start.y,
                    'x2': line.properties.end.x,
                    'y2': line.properties.end.y,
                    'stroke': line.properties['stroke-color'],
                    'stroke-width': line.properties['stroke-width'],
                    'stroke-dasharray': strokeDashArray
                };
            }
        },


        getEllipses() {
            return _.where(this.get('components'), {
                'type': 'ellipse'
            });
        },

        getLines() {
            return _.where(this.get('components'), {
                'type': 'line'
            });
        }
    });

    return Diagram;
});
