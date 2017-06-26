define([
    "backbone",
    "eventDispatcher",
    "models/diagram",
    "views/diagram-view",
    "views/settings-view",
    "views/toolbar-view"
], function(Backbone, eventDispatcher, Diagram,
            DiagramView, SettingsView, ToolbarView) {
    const controller = {
        initialize() {
            eventDispatcher.on({
                "show:diagram": this._showDiagram.bind(this),
                "change:shapeProperties": this._changeShapeProperties.bind(this),
                "toggle:shapeSelection": this._toggleShapeSelection.bind(this),
                "save:diagram": this._saveDiagram.bind(this)
            });
        },

        _showDiagram(id) {
            this._fetchDiagram(id)
                .then(() => this._createViews())
                .catch(e => { throw e; });
                //TODO: I think we don't need promise here
                //because _createViews don't return a promise ?
        },

        _fetchDiagram(diagramId) {
            this.diagram = new Diagram({ id: diagramId });
            return this.diagram.fetchDiagram();
        },

        _createViews() {
            this.diagramView = new DiagramView({
                model: this.diagram,
                container: ".app"
            });
            new ToolbarView({ svg: this.diagramView.svg.node() }); //looks hacky ?
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
            if (this.diagram.get("selectedShape")) {
                this._deselectShape();
            }
            this.diagram.selectShape(shape);
            this._showShapeSettings(svg);
        },

        _showShapeSettings(svg) {
            this.settingsView = new SettingsView({
                model: this.diagram.get("selectedShape"),
                svg: svg
            });
        },


        _deselectShape() {
            this.diagram.deselect();
            this.settingsView.remove();
        },

        _saveDiagram() {
            this.diagram.saveDiagram();
            this._deselectShape();
        },
    };

    return controller;
});
