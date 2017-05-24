define(['backbone', 'd3'],
    function (Backbone, d3) {

        const SELECTION_PADDING = 4;

        const editElView = Backbone.View.extend({
            el: 'div#controls',
            id: 'controls',
            svg: d3.select('svg'),

            events: {
                'submit form': '_saveAll'
            },

            initialize() {
                this.listenTo(this.collection, 'selected', this.render);
            },

            render() {
                this.selectedShape = this.collection.at(this.collection.getSelected());
                this._drawSelection(...this._getCoords(this.selectedShape.toJSON()));
                this.$el.append(this._getControls());
            },

            _getControls() {
                const selectedJSON = this.selectedShape.toJSON();
                const shapeProperties = Object.keys(_.omit(selectedJSON, 'type'))
                    .reduce((acc, key) => {
                        return acc += `<label for='${key}'> ${key} </label>
                                <input id='${key}' name='${key}' value='${selectedJSON[key]}'>`;
                    }, '');
                return `<form>
                            <h4>Properties (${selectedJSON.type})</h4>
                            ${shapeProperties}
                            <input type="submit" value="save">
                        </form>`;
            },

            _getCoords(shape) {
                const types = {
                    'line': this._getLineCoords,
                    'ellipse': this._getEllipseCoords
                }
                console.log(types[shape.type]);

                return types[shape.type] ? types[shape.type](shape) : {};
            },

            _getLineCoords(line) {
                const x = line.x1;
                const y = line.y1;
                const width = Math.abs(line.x2 - x);
                const height = Math.abs(line.y2 - y);
                return [x, y, width, height];
            },

            _getEllipseCoords(ellipse) {
                const x = ellipse.cx - ellipse.rx;
                const y = ellipse.cy - ellipse.ry;
                const width = 2 * ellipse.rx;
                const height = 2 * ellipse.ry;
                return [x, y, width, height];
            },

            _drawSelection(x, y, width, height) {
                this._deselect();

                this.svg
                    .append('rect')
                    .classed('selection', true)
                    .attr('x', x - SELECTION_PADDING / 2)
                    .attr('y', y - SELECTION_PADDING / 2)
                    .attr('width', width + SELECTION_PADDING)
                    .attr('height', height + SELECTION_PADDING)
                    .attr('rx', 5)
                    .attr('stroke', 'aqua')
                    .attr('stroke-width', 2)
                    .attr('stroke-dasharray', '10, 4')
                    .attr('fill', 'aqua')
                    .attr('fill-opacity', 0.3)
                    .on('click', () => this._deselect());
            },

            _deselect(){
                this.svg.selectAll('rect.selection')
                    .remove();
                this.$el.empty();
            },

            _saveAll(e) {
                e.preventDefault();
                const data = $('form')
                    .serializeArray();
                const inputData = {}
                $.each(data, (index, input) => {
                    inputData[input.name] = input.value;
                });
                console.log(inputData);
                this.selectedShape.set(inputData);
                this._deselect();
            },

        });
        return editElView;
    }
);
