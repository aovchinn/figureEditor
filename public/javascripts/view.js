define([
    'backbone', 'd3', 'collections/components'
], function (Backbone, d3, Components) {
    var View = Backbone.View.extend({
        el: 'svg',

        initialize() {
            this.svgContainer = d3.select('svg')
                .attr('width', 300)
                .attr('height', 200);

            this.listenTo(this.model.components, 'change', this.render);
            this.listenTo(this.model.components, 'update', this.render);
        },

        render() {
            //some elements overlapping after redraw
            //think about which elements should be closer to the viewer
            //add depth attribute in the model ?
            this.drawEllipses(this.model.components.getEllipses());
            this.drawLines(this.model.components.getLines());
        },

        drawLines(linesData) {
            var lines = this.svgContainer
                .selectAll('line')
                .data(linesData);

            update(lines.enter()
                .append('line'));

            update(lines);

            lines.exit()
                .remove();

            function update(elem) {
                elem.attr('x1', d => d.get('x1'))
                    .attr('y1', d => d.get('y1'))
                    .attr('x2', d => d.get('x2'))
                    .attr('y2', d => d.get('y2'))
                    .attr('stroke', d => d.get('stroke'))
                    .attr('stroke-width', d => d.get('stroke-width'))
                    .attr('stroke-dasharray', d => d.get('stroke-dasharray'));
            }
        },

        drawEllipses(ellipsesData) {
            var ellipses = this.svgContainer
                .selectAll('ellipse')
                .data(ellipsesData);

            update(ellipses.enter()
                .append('ellipse'));

            update(ellipses);

            ellipses.exit()
                .remove();

            function update(elem) {
                elem.attr('cx', d => d.get('cx'))
                    .attr('cy', d => d.get('cy'))
                    .attr('rx', d => d.get('rx'))
                    .attr('ry', d => d.get('ry'))
                    .attr('fill', d => d.get('fill'))
                    .attr('stroke', d => d.get('stroke'))
                    .attr('stroke-width', d => d.get('stroke-width'))
                    .attr('stroke-dasharray', d => d.get('stroke-dasharray'));
            }
        }
    });

    return View;
});
