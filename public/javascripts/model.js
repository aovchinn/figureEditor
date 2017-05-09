define([
    'db', 'jquery', 'underscore', 'backbone'
], function(db, $, _, Backbone) {

    var Model = Backbone.Model.extend({

        defaults: {
            'title': 'My diagram',
            'components': []
        },

        initialize: function() {
            console.log('initializing model');
        },

        getEllipses: function() {
            //TODO index should disapear in collection?
            // how to organize data into collection?
            //returning only for first diagram ( [0]-index )

            return _.where(db[0].components, {'type': 'ellipse'});
        },

        getLines: function() {
            //TODO index should disapear in collection?
            // how to organize data into collection?
            //returning only for first diagram ( [0]-index )

            return _.where(db[0].components, {'type': 'line'});
        }
    });

    return new Model();
});
