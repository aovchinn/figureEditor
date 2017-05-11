define([
    'db', 'underscore', 'backbone', '../models/ellipse', '../models/line'
], function(db, _, Backbone, Ellipse, Line) {
    var Components = Backbone.Collection.extend({
        model: function(attrs, options) {
            if (attrs.type === 'ellipse') {
                return new Ellipse(attrs, options);
            } else if (attrs.type === 'line') {
                return new Line(attrs, options);
            } else {
                console.error('can\'t create model in collection' + attrs);
            }
        },

        initialize: function() {
            console.log('initializing components collection');
        },

        getEllipses: function () {
            return this.where({type: 'ellipse'});
        },

        getLines: function () {
            return this.where({type: 'line'});
        }


    });

    return Components;
});
