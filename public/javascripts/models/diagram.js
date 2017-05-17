define([
    'underscore', 'backbone'
], function (_, Backbone) {
    const Diagram = Backbone.Model.extend({
        urlRoot: '/api/diagrams/',
        defaults: {
            'title': 'diagram-name',
            'components': []
        },

        initialize() {
            console.log('initializing diagram');
        },

        parse(response, options) {
            const parsed = response.components.map((e) => {
                return this._getParseFunction(e.type)
                    .call(this, e);
            });
            return {
                'title': response.title,
                'components': parsed
            };
        },

        _getParseFunction(element) {
            const elements = {
                'ellipse': this._parseEllipse,
                'line': this._parseLine
            };
            return elements[element] || (e => e);
        },

        _parseEllipse(ellipse) {
            console.log('parsing ellipse');
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
                'stroke-dasharray': this._getStrokeDashArray(ellipse.properties['stroke-style'])
            };
        },

        _parseLine(line) {
            console.log('parsing line');
            //moving nested properties up on one level with 'type',
            return {
                'type': line.type,
                'x1': line.properties.start.x,
                'y1': line.properties.start.y,
                'x2': line.properties.end.x,
                'y2': line.properties.end.y,
                'stroke': line.properties['stroke-color'],
                'stroke-width': line.properties['stroke-width'],
                'stroke-dasharray': this._getStrokeDashArray(line.properties['stroke-style'])
            };
        },

        _getStrokeDashArray(strokeStyle) {
            const strokes = {
                'dashed': '8, 10',
                'dotted': '1, 4',
                'solid': '0'
            }
            return strokes[strokeStyle] || '0';
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
