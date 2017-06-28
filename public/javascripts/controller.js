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
                //router.js
                "show:diagram": this._showDiagram.bind(this),
                //settings-view.js
                "change:shapeProperties": this._changeShapeProperties.bind(this),
                //shape-view.js
                "move:shape": this._moveShape.bind(this),
                "toggle:shapeSelection": this._toggleShapeSelection.bind(this),
                //toolbar-view.js
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
            new DiagramView({
                model: this.diagram,
                container: ".app"
            });
            new ToolbarView({
                collection: this.diagram.shapes,
                insertAfter: "header"
            });
        },

        _changeShapeProperties(shape, props) {
            this.diagram.changeShapeProperties(shape, props);
        },

        _moveShape(shape, deltas) {
            shape.move(deltas);
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
            if (this.settingsView) {
                this.settingsView.remove();
            }
        },

        _saveDiagram() {
            this.diagram.saveDiagram();
            this._deselectShape();
        },
    };

    return controller;
});
