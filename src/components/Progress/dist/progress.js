"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Progress = function (props) {
    var percent = props.percent, strokeHeight = props.strokeHeight, showText = props.showText, styles = props.styles, theme = props.theme;
    return (react_1["default"].createElement("div", { className: "anbol-progress-bar", style: styles },
        react_1["default"].createElement("div", { className: "anbol-progress-bar-outer", style: { height: strokeHeight + "px" } },
            react_1["default"].createElement("div", { className: "anbol-progress-bar-inner color-" + theme, style: { width: percent + "%" } }, showText && react_1["default"].createElement("span", { className: "inner-text" }, "" + percent)))));
};
Progress.defaultProps = {
    strokeHeight: 15,
    showText: true,
    theme: 'primary'
};
exports["default"] = Progress;
