define([
    'jquery', 'backbone', 'd3'
], function ($, Backbone, d3) {
    const View = Backbone.View.extend({
        el: 'svg',

        initialize() {
            d3.select('svg')
                .attr('width', '300')
                .attr('height', '200');

            this.EllipseContainer = d3.select('.ellipses');
            this.LinesContainer = d3.select('.lines');

            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'update', this.render);
        },

        render() {
            $('#diagram-title')
                .text(this.model.get('title'));
            this.drawEllipses(this.model.getEllipses());
            this.drawLines(this.model.getLines());

            // read somewhere that there is a convention
            // about returning this from render
            // so you can do smth like view.render().$el.append(...)
            return this;
        },

        drawLines(linesData) {
            const lines = this.LinesContainer
                .selectAll('line')
                .data(linesData);

            lines.enter()
                .append('line')
                .merge(lines)
                .attr('x1', d => d.x1)
                .attr('y1', d => d.y1)
                .attr('x2', d => d.x2)
                .attr('y2', d => d.y2)
                .attr('stroke', d => d.stroke)
                .attr('stroke-width', d => d['stroke-width'])
                .attr('stroke-dasharray', d => d['stroke-dasharray']);

            lines.exit()
                .remove();
        },

        drawEllipses(ellipsesData) {
            const ellipses = this.EllipseContainer
                .selectAll('ellipse')
                .data(ellipsesData);

            ellipses.enter()
                .append('ellipse')
                .merge(ellipses)
                .attr('cx', d => d.cx)
                .attr('cy', d => d.cy)
                .attr('rx', d => d.rx)
                .attr('ry', d => d.ry)
                .attr('fill', d => d.fill)
                .attr('stroke', d => d.stroke)
                .attr('stroke-width', d => d['stroke-width'])
                .attr('stroke-dasharray', d => d['stroke-dasharray']);

            ellipses.exit()
                .remove();
        }
    });

    return View;
});
