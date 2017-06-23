if (typeof define !== "function") {
    var define = require("amdefine")(module);
}

define(function() {
    return [
        {
            title: "My diagram 1",
            components: [
                {
                    type: "ellipse",
                    properties: {
                        x: 60,
                        y: 40,
                        rx: 50,
                        ry: 50,
                        fill: "#BDBBB8",
                        "stroke-color": "#0000ff",
                        "stroke-width": 2,
                        "stroke-style": "dashed"
                    }
                }, {
                    type: "line",
                    properties: {
                        start: {
                            x: 100,
                            y: 90
                        },
                        end: {
                            x: 200,
                            y: 150
                        },
                        "stroke-color": "#2196F3",
                        "stroke-width": 2,
                        "stroke-style": "solid"
                    }
                }, {
                    type: "line",
                    properties: {
                        start: {
                            x: 50,
                            y: 40
                        },
                        end: {
                            x: 100,
                            y: 90
                        },
                        "stroke-color": "#E91E63",
                        "stroke-width": 6,
                        "stroke-style": "dotted"
                    }
                }, {
                    type: "ellipse",
                    properties: {
                        x: 200,
                        y: 150,
                        rx: 30,
                        ry: 30,
                        fill: "#ff0000",
                        "stroke-color": "#0000ff",
                        "stroke-width": 2,
                        "stroke-style": "solid"
                    }
                }
            ]
        }, {
            title: "My diagram 2",
            components: [
                {
                    "type": "ellipse",
                    properties: {
                        x: 100,
                        y: 60,
                        rx: 70,
                        ry: 40,
                        fill: "#BDBBff",
                        "stroke-color": "#ff00ff",
                        "stroke-width": 2,
                        "stroke-style": "dotted"
                    }
                }, {
                    type: "line",
                    properties: {
                        start: {
                            x: 0,
                            y: 90
                        },
                        end: {
                            x: 200,
                            y: 150
                        },
                        "stroke-color": "#218603",
                        "stroke-width": 2,
                        "stroke-style": "dashed"
                    }
                }
            ]
        }
    ];
});
