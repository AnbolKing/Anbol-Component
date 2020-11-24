"use strict";
exports.__esModule = true;
var react_1 = require("react");
var fontawesome_svg_core_1 = require("@fortawesome/fontawesome-svg-core");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var select_1 = require("./components/Select/select");
var options_1 = require("./components/Select/options");
fontawesome_svg_core_1.library.add(free_solid_svg_icons_1.fas);
function App() {
    return (react_1["default"].createElement("div", { className: "App" },
        react_1["default"].createElement("header", { className: "App-header" },
            react_1["default"].createElement(select_1["default"], { placeholder: '\u8BF7\u9009\u62E9', onChange: function (value) { return console.log(value); }, 
                // disabled={true}
                multiple: true },
                react_1["default"].createElement(options_1["default"], { value: "One", index: '0' }),
                react_1["default"].createElement(options_1["default"], { value: "Two", index: '1' }),
                react_1["default"].createElement(options_1["default"], { value: "Three", index: '2' }),
                react_1["default"].createElement(options_1["default"], { value: "Four", index: '3', disabled: true }),
                react_1["default"].createElement(options_1["default"], { value: "Five", index: '4' })))));
}
exports["default"] = App;
