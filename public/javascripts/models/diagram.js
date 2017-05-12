define([
    'backbone', '../collections/components'
], function (Backbone, Components) {
    var Diagram = Backbone.Model.extend({
        urlRoot: '/api/diagrams/',
        defaults: {
            'title': 'diagram-name',
            'components': []
        },

        initialize() {
            console.log('initializing diagram, id: ' + this.id);
            this.components = new Components();
            this.components.url = '/api/diagrams/' + this.id + '/components';
        }
    });

    return Diagram;
});
