"use strict";
exports.__esModule = true;
var react_1 = require("react");
var MyProgress = function (props) {
    var percent = props.percent, height = props.height, showText = props.showText, style = props.style, theme = props.theme;
    return (react_1["default"].createElement("div", { className: "anbol-progress-bar", style: style },
        react_1["default"].createElement("div", { className: "anbol-progress-bar-outer", style: { height: height + "px" } },
            react_1["default"].createElement("div", { className: "anbol-progress-bar-inner color-" + theme, style: { width: percent + "%" } }, showText && react_1["default"].createElement("span", { className: "inner-text" }, "" + percent)))));
};
MyProgress.defaultProps = {
    height: 15,
    theme: 'primary',
    showText: true
};
exports["default"] = MyProgress;
