define([
    'backbone', '../models/ellipse', '../models/line', 'underscore'
], function (Backbone, Ellipse, Line, _) {
    const Diagram = Backbone.Collection.extend({
        url: '/api/diagrams/0',
        title: 'diagram-name',
        id: '0',
        selectedShape: null,

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
            console.log(this);
            return _.pluck(this.where({
                type: 'ellipse'
            }), 'attributes');
        },

        getLines() {
            return _.pluck(this.where({
                type: 'line'
            }), 'attributes');
        },

        selectShape(index) {
            const validIndex = index < this.size() && index >= 0;
            this.selectedShape = validIndex ? index : null;
            if (this.selectedShape !== null) {
                this.trigger('selected');
            }
        },

        getSelected() {
            return this.selectedShape;
        },

        getIndexByJSON(shape){
            return this.findLastIndex((curShape) => {
                return _.isEqual(curShape.toJSON(), shape);
            });
        }
    });
    return Diagram;
});
