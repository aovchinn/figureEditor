define([
    'backbone', 'd3', './edit-el-view'
], function (Backbone, d3, editElView) {

    const SELECTION_PADDING = 4;

    const View = Backbone.View.extend({
        el: 'svg',

        initialize() {
            console.log(this.collection);
            this.svg = d3.select('svg')
                .attr('width', '300')
                .attr('height', '200');

            //cleaning when switching to new diagram
            this.svg.selectAll('*')
                .remove();

            this.listenTo(this.collection, 'change', this.render);
            this.listenTo(this.collection, 'update', this.render);
        },

        render() {
            // TODO bug description to not forget
            // load to http://localhost:3000/#my-diagram-2
            // then go to diagram-1
            // render order is not right
            this._renderTitle();
            this._renderShapes();
            this._changeRenderOrder();
            return this;
        },

        _renderTitle() {
            $('#diagram-title')
                .text(this.collection.getTitle());
        },

        _renderShapes() {
            this._drawEllipses(this.collection.getEllipses());
            this._drawLines(this.collection.getLines());
        },

        _changeRenderOrder() {
            this.svg.selectAll('ellipse, line')
                .sort((a, b) => a.cid > b.cid ? 1 : -1);
        },

        _drawEllipses(ellipsesData = []) {
            const ellipses = this.svg
                .selectAll('ellipse')
                    .data(ellipsesData);

            const appendedEllipses = ellipses.enter()
                .append('ellipse')
                    .on('click', d => this._editShape(d));

            appendedEllipses.merge(ellipses)
                .attr('cx', d => d.cx)
                .attr('cy', d => d.cy)
                .attr('rx', d => d.rx)
                .attr('ry', d => d.ry)
                .attr('fill', d => d.fill)
                .attr('stroke', d => d.stroke)
                .attr('stroke-width', d => d['stroke-width'])
                .attr('stroke-dasharray', d => d['stroke-dasharray']);

            ellipses.exit()
                .on('click', null)
                .remove();
        },

        _editShape(shape) {
            const index = this.collection.getIndexByJSON(shape);
            this.collection.selectShape(index);
            console.log(index);
        },

        _drawLines(linesData = []) {
            const lines = this.svg
                .selectAll('line')
                .data(linesData);

            const appendedLines = lines.enter()
                .append('line')
                    .on('click', d => this._editShape(d));

                appendedLines.merge(lines)
                    .attr('x1', d => d.x1)
                    .attr('y1', d => d.y1)
                    .attr('x2', d => d.x2)
                    .attr('y2', d => d.y2)
                    .attr('stroke', d => d.stroke)
                    .attr('stroke-width', d => d['stroke-width'])
                    .attr('stroke-dasharray', d => d['stroke-dasharray']);

            lines.exit()
                .on('click', null)
                .remove();
        }
    });

    return View;
});
