define([
    'backbone', '../models/ellipse', '../models/line'
], function (Backbone, Ellipse, Line) {
    var Components = Backbone.Collection.extend({
        model: function (attrs, options) {
            if (attrs.type === 'ellipse') {
                return new Ellipse(attrs, options);
            } else if (attrs.type === 'line') {
                return new Line(attrs, options);
            } else {
                console.error('can\'t create model in collection' + attrs);
            }
        },

        initialize() {
            console.log('initializing components collection');
        },

        getEllipses() {
            return this.where({
                type: 'ellipse'
            });
        },

        getLines() {
            return this.where({
                type: 'line'
            });
        }


    });

    return Components;
});
