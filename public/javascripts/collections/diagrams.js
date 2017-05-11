//TODO do I really need this collection?


define([
    'jquery', 'underscore', 'backbone', '../models/diagram'
], function($, _, Backbone, Diagram) {
    var Diagrams = Backbone.Collection.extend({
        url: '/api/diagrams',
        model: Diagram
    });


    return new Diagrams();
});
