define([
    "jquery",
    "backbone",
    "eventDispatcher",
    "models/diagram",
    "views/diagram-view",
    "views/settings-view",
    "views/toolbar-view"
], function($, Backbone, eventDispatcher, Diagram,
            DiagramView, SettingsView, ToolbarView) {
    const controller = {
        initialize() {
            eventDispatcher.on({
                //router.js
                "show:diagram": this._showDiagram.bind(this),
                //settings-view.js
                "change:shapeProperties": this._changeShapeProperties.bind(this),
                "save:state": this._saveState.bind(this),
                //shape-view.js
                "move:shape": this._moveShape.bind(this),
                "moveend:shape": this._saveState.bind(this),
                "toggle:shapeSelection": this._toggleShapeSelection.bind(this),
                //toolbar-view.js
                "save:diagram": this._saveDiagram.bind(this),
                "dragstart:mousedown": this._dragstart.bind(this),
                "cancel:changes": this._cancelChanges.bind(this),
                "undo:state": this._undoState.bind(this),
                "redo:state": this._redoState.bind(this),
            });
        },

        _showDiagram(id) {
            this._fetchDiagram(id)
                .then(() => this._createViews())
                .catch(e => {
                    console.error("fetch diagram failed", e);
                });
        },

        _fetchDiagram(diagramId) {
            this.diagram = new Diagram({ id: diagramId });
            return this.diagram.fetchDiagram();
        },

        _createViews() {
            this.DiagramView = new DiagramView({
                model: this.diagram,
                container: ".app",
            });
            new ToolbarView({
                model: this.diagram,
                insertAfter: "header",
                svg: this.DiagramView.svg
            });
            new SettingsView({
                model: this.diagram,
                svg: this.DiagramView.svg,
            });
        },

        _changeShapeProperties(shape, props) {
            this.diagram.changeShapeProperties(shape, props);
        },

        _moveShape(shape, deltas) {
            shape.move(deltas);
        },

        _saveState() {
            this.diagram.saveState();
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
        },

        _deselectShape() {
            this.diagram.deselect();
        },

        _saveDiagram() {
            this.diagram.saveDiagram();
            this._deselectShape();
        },

        _dragstart(shapeType, mousedownEvent, svg = this.DiagramView.svg.node()) {
            const collection = this.diagram.shapes;
            const clickOffset = this._getOffset(mousedownEvent, svg);
            const newShape = collection.add({ type: shapeType });
            this._setupDrag(collection, newShape, clickOffset);
            $(document).on("mousemove", e => {
                this._moveNewShape(e, newShape, svg, clickOffset);
            });
            $(document).on("mouseup", e => {
                this._drop(e, collection, newShape, svg);
            });
        },

        _setupDrag(collection, newShape, clickOffset) {
            this._setUserSelection("none");
            newShape.move({ dx: clickOffset.x, dy: clickOffset.y });
            collection.each(shape => shape.set("class", "pointer-events-none"));
        },

        _setUserSelection(value) {
            //TODO: all other browser prefixes
            $("html").css("user-select", value);
        },

        _getOffset(e, container) {
            const containerOffset = $(container).offset();
            return {
                x: e.pageX - containerOffset.left,
                y: e.pageY - containerOffset.top,
            };
        },

        _moveNewShape(e, shape, container, prevCoords) {
            const moveDeltas = this._getMoveDeltas(prevCoords, e, container);
            shape.move(moveDeltas);
            prevCoords.x += moveDeltas.dx;
            prevCoords.y += moveDeltas.dy;
        },

        _getMoveDeltas(prevCoords, e, container) {
            const offset = this._getOffset(e, container);
            return {
                dx: offset.x - prevCoords.x,
                dy: offset.y - prevCoords.y,
            };
        },

        _drop(e, collection, newShape, dropTarget) {
            this._setUserSelection("auto");
            this._unbindDropEvents(dropTarget);
            collection.each(shape => shape.set("class", ""));
            if (e.target !== dropTarget) {
                collection.remove(newShape);
            } else {
                this._saveState();
            }
        },

        _unbindDropEvents(dropTarget) {
            $(document).off("mousemove");
            $(document).off("mouseup");
        },

        _cancelChanges() {
            this.diagram.cancelChanges();
        },

        _undoState() {
            this.diagram.undoState();
        },

        _redoState() {
            this.diagram.redoState();
        }
    };

    return controller;
});
