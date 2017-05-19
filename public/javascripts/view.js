define([
    'backbone', 'd3'
], function (Backbone, d3) {
    const View = Backbone.View.extend({
        el: 'svg',

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
            $('#diagram-title')
                .text(this.collection.getTitle());

            this.drawEllipses(this.collection.getEllipses());
            this.drawLines(this.collection.getLines());

            this.svg.selectAll('*').sort((a, b) => {
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
                .attr('stroke-dasharray', d => d.attributes['stroke-dasharray']);

            lines.exit()
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
                .attr('stroke-dasharray', d => d.attributes['stroke-dasharray']);

            ellipses.exit()
                .remove();
        }
    });

    return View;
});
