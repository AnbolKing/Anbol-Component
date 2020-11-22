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
var input_1 = require("../Input/input");
var AutoComplete = function (props) {
    var fetchSuggestions = props.fetchSuggestions, onSelect = props.onSelect, value = props.value, renderOptions = props.renderOptions, restProps = __rest(props, ["fetchSuggestions", "onSelect", "value", "renderOptions"]);
    var _a = react_1.useState(value), inputValue = _a[0], setInputValue = _a[1];
    var _b = react_1.useState([]), suggestions = _b[0], setSuggestions = _b[1];
    var handleChange = function (e) {
        var value = e.target.value.trim();
        setInputValue(value);
        if (value) {
            var result = fetchSuggestions(value);
            setSuggestions(result);
        }
        else {
            setSuggestions([]);
        }
    };
    var handleSelect = function (item) {
        setInputValue(item.value);
        setSuggestions([]);
        if (onSelect) {
            onSelect(item);
        }
    };
    var renderTemplate = function (item) {
        return renderOptions ? renderOptions(item) : item;
    };
    var generateDropDown = function () {
        return (react_1["default"].createElement("ul", null, suggestions.map(function (item, index) {
            return (react_1["default"].createElement("li", { key: index, onClick: function () { return handleSelect(item); } }, renderTemplate(item)));
        })));
    };
    return (react_1["default"].createElement("div", { className: "anbol-auto-complete" },
        react_1["default"].createElement(input_1["default"], __assign({ value: inputValue }, restProps, { onChange: handleChange })),
        suggestions.length > 0 && generateDropDown()));
};
exports["default"] = AutoComplete;
