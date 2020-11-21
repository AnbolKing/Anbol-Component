"use strict";
exports.__esModule = true;
var react_1 = require("react");
var menu_1 = require("./components/Menu/menu");
var subMenu_1 = require("./components/Menu/subMenu");
var menuItem_1 = require("./components/Menu/menuItem");
var fontawesome_svg_core_1 = require("@fortawesome/fontawesome-svg-core");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var icon_1 = require("./components/Icon/icon");
fontawesome_svg_core_1.library.add(free_solid_svg_icons_1.fas);
function App() {
    return (react_1["default"].createElement("div", { className: "App" },
        react_1["default"].createElement("header", { className: "App-header" },
            react_1["default"].createElement(icon_1["default"], { icon: 'arrow-down', className: 'arrow-icon' }),
            react_1["default"].createElement(menu_1["default"], null,
                react_1["default"].createElement(menuItem_1["default"], null, "list one"),
                react_1["default"].createElement(menuItem_1["default"], null, "list one"),
                react_1["default"].createElement(menuItem_1["default"], null, "list one"),
                react_1["default"].createElement(menuItem_1["default"], null, "list one"),
                react_1["default"].createElement(subMenu_1["default"], { title: 'hello' },
                    react_1["default"].createElement(menuItem_1["default"], null, "list one"),
                    react_1["default"].createElement(menuItem_1["default"], null, "list one"))))));
}
exports["default"] = App;
