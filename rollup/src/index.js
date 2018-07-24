System.register(["react", "react-dom"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var react_1, react_dom_1;
    return {
        setters: [
            function (react_1_1) {
                react_1 = react_1_1;
            },
            function (react_dom_1_1) {
                react_dom_1 = react_dom_1_1;
            }
        ],
        execute: function () {
            react_dom_1.default.render(react_1.default.createElement("p", null, "Hello World Again"), document.body.firstElementChild);
        }
    };
});
