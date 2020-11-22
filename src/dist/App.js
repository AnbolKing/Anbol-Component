"use strict";
exports.__esModule = true;
var react_1 = require("react");
var icon_1 = require("./components/Icon/icon");
var upload_1 = require("./components/Upload/upload");
var fontawesome_svg_core_1 = require("@fortawesome/fontawesome-svg-core");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var autoComplete_1 = require("./components/AutoComplete/autoComplete");
fontawesome_svg_core_1.library.add(free_solid_svg_icons_1.fas);
var defaultFileList = [
    { uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 30 },
    { uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
    { uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 30 }
];
var lakersWithNumber = [
    { value: 'bradley', number: 11 },
    { value: 'pope', number: 1 },
    { value: 'caruso', number: 4 },
    { value: 'cook', number: 2 },
    { value: 'cousins', number: 15 },
    { value: 'james', number: 23 },
    { value: 'AD', number: 3 },
    { value: 'green', number: 14 },
    { value: 'howard', number: 39 },
    { value: 'kuzma', number: 0 },
];
function App() {
    var handleFetch = function (query) {
        return lakersWithNumber.filter(function (player) { return player.value.includes(query); });
    };
    var renderOption = function (item) {
        return (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement("h2", null,
                "Name: ",
                item.value),
            react_1["default"].createElement("p", null,
                "Number: ",
                item.number)));
    };
    return (react_1["default"].createElement("div", { className: "App" },
        react_1["default"].createElement("header", { className: "App-header" },
            react_1["default"].createElement(upload_1["default"], { action: 'http://jsonplaceholder.typicode.com/posts', defaultFileList: defaultFileList, mutiple: true, drag: true },
                react_1["default"].createElement(icon_1["default"], { icon: "upload", size: "5x", theme: "secondary" }),
                react_1["default"].createElement("br", null),
                react_1["default"].createElement("p", null, "Drag file over to upload")),
            react_1["default"].createElement(autoComplete_1["default"], { fetchSuggestions: handleFetch, onSelect: function (item) { console.log(item); }, renderOptions: renderOption }))));
}
exports["default"] = App;
