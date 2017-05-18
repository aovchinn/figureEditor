define([
    'backbone', '../models/ellipse', '../models/line'
], function (Backbone, Ellipse, Line) {
    const Diagram = Backbone.Collection.extend({
        url: '/api/diagrams/0',
        title: 'diagram-name',
        id: '0',
        model: function (attrs, options) {
            const constructors = {
                ellipse: (attrs, options) => new Ellipse(attrs, options),
                line: (attrs, options) => new Line(attrs, options)
            };

            if (!constructors[attrs.type]) {
                throw new Error(`can't create figure of type: ${attrs.type}`);
            } else {
                return constructors[attrs.type](attrs, options);
            }
        },

        initialize() {
            console.log('initializing diagram');
        },

        parse(response, options) {
            this.title = response.title;
            return response.components;
        },

        setId(id) {
            this.id = id;
            this.url = `/api/diagrams/${this.id}`;
        },

        getTitle() {
            return this.title;
        },

        getEllipses() {
            return this.where({
                'type': 'ellipse'
            });
        },

        getLines() {
            return this.where({
                'type': 'line'
            });
        }
    });
    return Diagram;
});
