define([
    "backbone",
    "eventDispatcher",
    "collections/diagram",
    "views/diagram-view",
    "views/settings-view"
], function(Backbone, eventDispatcher, Diagram, DiagramView, SettingsView) {
    const controller = {
        initialize() {
            eventDispatcher.on({
                "show:diagram": this._showDiagram.bind(this),
                "change:shapeProperties": this._changeShapeProperties.bind(this),
                "toggle:shapeSelection": this._toggleShapeSelection.bind(this),
            });
        },

        _showDiagram(id) {
            this._fetchDiagram(id)
                .then(() => this._createViews())
                .catch(e => console.error(e));
        },

        _fetchDiagram(diagramId) {
            return fetch(`/api/diagrams/${diagramId}`)
                .then(res => res.json())
                .then(({ title, components }) => {
                    this.diagram = new Diagram(components, { title });
                });
        },

        _createViews() {
            new DiagramView({ collection: this.diagram, el: ".diagram" });
        },

        _changeShapeProperties(shape, props) {
            this.diagram.changeShapeProperties(shape, props);
        },

        _toggleShapeSelection(shape, svg) {
            if (shape.get("selected")) {
                this._deselectShape();
            } else {
                this._selectShape(shape, svg);
            }
        },

        _selectShape(shape, svg) {
            //click on different shapes one after another
            if (this.diagram.getSelected()) {
                this._deselectShape();
            }
            this.diagram.selectShape(shape);
            this._showShapeSettings(svg);
        },

        _showShapeSettings(svg) {
            this.settingsView = new SettingsView({
                model: this.diagram.getSelected(),
                svg: svg
            });
        },


        _deselectShape() {
            this.diagram.deselect();
            this.settingsView.remove();
        },
    };

    return controller;
});
