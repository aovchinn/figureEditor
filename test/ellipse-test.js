define(['public/javascripts/models/ellipse'],
    function (Ellipse) {
        describe('Ellipse', function () {
            it('should parse input',
                function () {
                    let input = {
                        'type': 'ellipse',
                        'properties': {
                            'x': 50,
                            'y': 40,
                            'rx': '50',
                            'ry': '50',
                            'fill': '#BDBBB8',
                            'stroke-color': '#0000ff',
                            'stroke-width': '2',
                            'stroke-style': 'dashed'
                        }
                    };
                    let output = {
                        'type': 'ellipse',
                        'cx': 50,
                        'cy': 40,
                        'rx': '50',
                        'ry': '50',
                        'fill': '#BDBBB8',
                        'stroke': '#0000ff',
                        'stroke-width': '2',
                        'stroke-dasharray': '8, 10'
                    };
                    let ellipse = new Ellipse(input, {
                        parse: true
                    });
                    assert.deepEqual(ellipse.attributes, output, 'parse');
                });
        });
    });
