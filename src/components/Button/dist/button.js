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
exports.ButtonType = exports.ButtonSize = void 0;
var react_1 = require("react");
var classnames_1 = require("classnames");
var ButtonSize;
(function (ButtonSize) {
    ButtonSize["Large"] = "lg";
    ButtonSize["Small"] = "sm";
})(ButtonSize = exports.ButtonSize || (exports.ButtonSize = {}));
var ButtonType;
(function (ButtonType) {
    ButtonType["Primary"] = "primary";
    ButtonType["Default"] = "default";
    ButtonType["Danger"] = "danger";
    ButtonType["Link"] = "link";
})(ButtonType = exports.ButtonType || (exports.ButtonType = {}));
var Button = function (props) {
    var _a;
    var children = props.children, size = props.size, btnType = props.btnType, disabled = props.disabled, className = props.className, href = props.href, restProps = __rest(props, ["children", "size", "btnType", "disabled", "className", "href"]);
    var classes = classnames_1["default"]('btn', className, (_a = {},
        _a["btn-" + btnType] = btnType,
        _a["btn-" + size] = size,
        _a['disabled'] = (btnType === ButtonType.Link) && disabled,
        _a));
    if (btnType === ButtonType.Link && href) {
        return (react_1["default"].createElement("a", __assign({ href: href, className: classes }, restProps), children));
    }
    else {
        return (react_1["default"].createElement("button", __assign({ className: classes }, restProps, { disabled: disabled }), children));
    }
};
Button.defaultProps = {
    disabled: false,
    btnType: ButtonType.Default
};
exports["default"] = Button;
