define([
    'jquery', 'underscore', 'backbone', '../collections/components'
], function($, _, Backbone, Components) {
    var Diagram = Backbone.Model.extend({
        urlRoot: '/api/diagrams/',
        defaults: {
            'title': 'diagram-name',
            'components': []
        },

        initialize: function() {
            console.log('initializing diagram, id: ' + this.id);
            this.components = new Components();
            this.components.url = '/api/diagrams/' + this.id + '/components';
        }
    });

    return Diagram;
});
