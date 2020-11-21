"use strict";
exports.__esModule = true;
var react_1 = require("react");
var menu_1 = require("./components/Menu/menu");
var subMenu_1 = require("./components/Menu/subMenu");
var menuItem_1 = require("./components/Menu/menuItem");
function App() {
    return (react_1["default"].createElement("div", { className: "App" },
        react_1["default"].createElement("header", { className: "App-header" },
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
