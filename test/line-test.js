define(['public/javascripts/models/line'],
    function (Line) {
        describe('Line', function () {
            it('should parse input',
                function () {
                    let input = {
                        'type': 'line',
                        'properties': {
                            'start': {
                                'x': '100',
                                'y': '90'
                            },
                            'end': {
                                'x': '200',
                                'y': '150'
                            },
                            'stroke-color': '#2196F3',
                            'stroke-width': '2',
                            'stroke-style': 'solid'
                        }
                    };
                    let output = {
                        'type': 'line',
                        'x1': '100',
                        'y1': '90',
                        'x2': '200',
                        'y2': '150',
                        'stroke': '#2196F3',
                        'stroke-dasharray': '0',
                        'stroke-width': '2'
                    };
                    let line = new Line(input, {parse: true});
                    assert.deepEqual(line.attributes, output, 'parse');
                });
        });
    });
