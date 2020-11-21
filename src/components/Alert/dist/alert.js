"use strict";
exports.__esModule = true;
exports.AlertType = void 0;
var react_1 = require("react");
var classnames_1 = require("classnames");
var AlertType;
(function (AlertType) {
    AlertType["Success"] = "success";
    AlertType["Danger"] = "danger";
    AlertType["Warning"] = "warning";
    AlertType["Default"] = "default";
})(AlertType = exports.AlertType || (exports.AlertType = {}));
var Alert = function (props) {
    var _a, _b;
    var title = props.title, description = props.description, type = props.type, closable = props.closable, className = props.className;
    var Alertclass = classnames_1["default"]('alert', className, (_a = {},
        _a["alert-" + type] = type,
        _a));
    var closeClass = classnames_1["default"]('alert', className, (_b = {},
        _b["alert-" + type] = type,
        _b['closed'] = closable,
        _b));
    var handleClode = function () {
        var element = document.getElementsByClassName('alert')[0];
        console.log(element);
        element.className = closeClass;
        console.log(element.className);
    };
    return (react_1["default"].createElement("div", { className: Alertclass },
        react_1["default"].createElement("span", { className: "alert-title" }, title),
        react_1["default"].createElement("p", { className: "alert-desc" }, description),
        closable ? (react_1["default"].createElement("span", { className: "alert-close", onClick: handleClode },
            react_1["default"].createElement("svg", { width: '1.2rem', height: '1.2rem', "aria-hidden": "true", focusable: "false", "data-prefix": "fas", "data-icon": "times", className: "svg-inline--fa fa-times fa-w-11 viking-icon", role: "img", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 352 512" },
                react_1["default"].createElement("path", { fill: "currentColor", d: "M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" })))) : null));
};
Alert.defaultProps = {
    closable: true
};
exports["default"] = Alert;
