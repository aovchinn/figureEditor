define([
    'backbone', 'd3'
], function (Backbone, d3) {
    const View = Backbone.View.extend({
        el: 'svg',

        events: {
            // 'click ellipse': 'editEllipse',
            // 'click line': 'editLine'
        },

        initialize() {
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
            $('#diagram-title')
                .text(this.collection.getTitle());

            this.drawEllipses(this.collection.getEllipses());
            this.drawLines(this.collection.getLines());

            this.svg.selectAll('*')
                .sort((a, b) => {
                    return a.cid > b.cid ? 1 : -1;
                });

            return this;
        },

        drawLines(linesData) {
            const lines = this.svg
                .selectAll('line')
                .data(linesData);

            lines.enter()
                .append('line')
                .merge(lines)
                .attr('x1', d => d.attributes.x1)
                .attr('y1', d => d.attributes.y1)
                .attr('x2', d => d.attributes.x2)
                .attr('y2', d => d.attributes.y2)
                .attr('stroke', d => d.attributes.stroke)
                .attr('stroke-width', d => d.attributes['stroke-width'])
                .attr('stroke-dasharray', d => d.attributes['stroke-dasharray'])
                .on('click', d => this.editLine(d));

            lines.exit()
                .on('click', null)
                .remove();
        },

        drawEllipses(ellipsesData) {
            const ellipses = this.svg
                .selectAll('ellipse')
                .data(ellipsesData);

            ellipses.enter()
                .append('ellipse')
                .merge(ellipses)
                .attr('cx', d => d.attributes.cx)
                .attr('cy', d => d.attributes.cy)
                .attr('rx', d => d.attributes.rx)
                .attr('ry', d => d.attributes.ry)
                .attr('fill', d => d.attributes.fill)
                .attr('stroke', d => d.attributes.stroke)
                .attr('stroke-width', d => d.attributes['stroke-width'])
                .attr('stroke-dasharray', d => d.attributes['stroke-dasharray'])
                .on('click', d => this.editEllipse(d));

            ellipses.exit()
                .on('click', null)
                .remove();
        },

        editEllipse(ellipse) {
            let x = ellipse.get('cx') - ellipse.get('rx'),
                y = ellipse.get('cy') - ellipse.get('ry'),
                width = 2 * ellipse.get('rx'),
                height = 2 * ellipse.get('ry');

            this.drawSelection(x, y, width, height);
        },

        editLine(line) {
            // create new editView (or in controller)
            // set corresponding el to editElView

            let x = line.get('x1'),
                y = line.get('y1'),
                width = Math.abs(line.get('x2') - x),
                height = Math.abs(line.get('y2') - y);

            this.drawSelection(x, y, width, height);
        },

        drawSelection(x, y, width, height) {
            let padding = 4;

            this.svg.selectAll('rect.selection')
                .remove();

            this.svg
                .append('rect')
                .classed('selection', true)
                .attr('x', x - padding / 2)
                .attr('y', y - padding / 2)
                .attr('width', width + padding)
                .attr('height', height + padding)
                .attr('rx', 5)
                .attr('stroke', 'aqua')
                .attr('stroke-width', 2)
                .attr('stroke-dasharray', '10, 4')
                .attr('fill', 'aqua')
                .attr('fill-opacity', 0.3);
        }
    });

    return View;
});
