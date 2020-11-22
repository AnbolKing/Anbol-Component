"use strict";
exports.__esModule = true;
var react_1 = require("react");
var icon_1 = require("./components/Icon/icon");
var upload_1 = require("./components/Upload/upload");
var fontawesome_svg_core_1 = require("@fortawesome/fontawesome-svg-core");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
fontawesome_svg_core_1.library.add(free_solid_svg_icons_1.fas);
var defaultFileList = [
    { uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 30 },
    { uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
    { uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 30 }
];
function App() {
    return (react_1["default"].createElement("div", { className: "App" },
        react_1["default"].createElement("header", { className: "App-header" },
            react_1["default"].createElement(upload_1["default"], { action: 'http://jsonplaceholder.typicode.com/posts', defaultFileList: defaultFileList, mutiple: true, drag: true },
                react_1["default"].createElement(icon_1["default"], { icon: "upload", size: "5x", theme: "secondary" }),
                react_1["default"].createElement("br", null),
                react_1["default"].createElement("p", null, "Drag file over to upload")))));
}
exports["default"] = App;
