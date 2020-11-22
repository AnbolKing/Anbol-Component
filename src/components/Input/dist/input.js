"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
var react_1 = require("react");
var classnames_1 = require("classnames");
var icon_1 = require("../Icon/icon");
var Input = function (props) {
    var _a;
    var disabled = props.disabled, size = props.size, icon = props.icon, prepend = props.prepend, append = props.append, style = props.style, restProps = __rest(props, ["disabled", "size", "icon", "prepend", "append", "style"]);
    var classes = classnames_1["default"]('anbol-input-wrapper', (_a = {
            'is-disabled': disabled,
            'input-group': prepend || append,
            'input-group-append': !!append,
            'input-group-prepend': !!prepend
        },
        _a["input-size-" + size] = size,
        _a));
    return (react_1["default"].createElement("div", { style: style, className: classes },
        prepend && react_1["default"].createElement("div", { className: 'anbol-input-group-prepend' }, prepend),
        icon && react_1["default"].createElement("div", { className: 'icon-wrapper' },
            react_1["default"].createElement(icon_1["default"], { icon: icon, title: "title-" + icon })),
        react_1["default"].createElement("input", __assign({ className: 'anbol-input-inner', disabled: disabled }, restProps)),
        append && react_1["default"].createElement("div", { className: 'anbol-input-group-append' }, append)));
};
exports["default"] = Input;
