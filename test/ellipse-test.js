define(['public/javascripts/models/ellipse'],
    function (Ellipse) {
        describe('Ellipse', function () {
            it('should parse input', function () {
                const ellipseConfig = {
                    'type': 'ellipse',
                    'properties': {
                        'x': 50,
                        'y': 40,
                        'rx': 50,
                        'ry': 50,
                        'fill': '#BDBBB8',
                        'stroke-color': '#0000ff',
                        'stroke-width': 2,
                        'stroke-style': 'dashed'
                    }
                };
                const expectedEllipse = {
                    'type': 'ellipse',
                    'cx': 50,
                    'cy': 40,
                    'rx': 50,
                    'ry': 50,
                    'fill': '#BDBBB8',
                    'stroke': '#0000ff',
                    'stroke-width': 2,
                    'stroke-dasharray': '8, 10'
                };

                const ellipse = new Ellipse(ellipseConfig, {
                    parse: true
                });

                assert.deepEqual(ellipse.attributes, expectedEllipse, 'parse');
            });
        });
    });
