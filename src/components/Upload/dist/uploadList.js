"use strict";
exports.__esModule = true;
var react_1 = require("react");
var icon_1 = require("../Icon/icon");
var UploadList = function (props) {
    var fileList = props.fileList, onRemove = props.onRemove;
    return (react_1["default"].createElement("ul", { className: "anbol-upload-list" }, fileList.map(function (item) {
        return (react_1["default"].createElement("li", { className: "anbol-upload-list-item", key: item.uid },
            react_1["default"].createElement("span", { className: "file-name file-name-" + item.status },
                react_1["default"].createElement(icon_1["default"], { icon: "file-alt", theme: "secondary" }),
                item.name)));
    })));
};
exports["default"] = UploadList;
