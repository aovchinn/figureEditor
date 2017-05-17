//TODO do I really need this collection?


define([
    'backbone', '../models/diagram'
], function(Backbone, Diagram) {
    const Diagrams = Backbone.Collection.extend({
        url: '/api/diagrams',
        model: Diagram
    });


    return new Diagrams();
});
