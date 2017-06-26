define([
    "underscore",
    "jquery",
    "backbone",
    "../eventDispatcher",
    "text!./templates/toolbar-template.html"
], function(_, $, Backbone, eventDispatcher, toolbarTemplate) {
    const Toolbar = Backbone.View.extend({
        template: _.template(toolbarTemplate),
        events:  {
            "click button[name='saveDiagramButton']": "_saveDiagram"
        },

        initialize(options) {
            this._createEl(options.svg);
            this.render();
        },

        _createEl(svg) {
            const elHtml = "<nav class='toolbar'></nav>";
            const el = $(elHtml).insertBefore(svg);
            this.setElement(el);
        },

        render() {
            this.$el.html(this.template);
        },

        _saveDiagram() {
            console.log("saving diagram");
            eventDispatcher.trigger("save:diagram");
        },
    });

    return Toolbar;
});
