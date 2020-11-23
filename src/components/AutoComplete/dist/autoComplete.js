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
var icon_1 = require("../Icon/icon");
var useDebounce_1 = require("../../hooks/useDebounce");
var useClickOutSide_1 = require("../../hooks/useClickOutSide");
var classnames_1 = require("classnames");
var AutoComplete = function (props) {
    var fetchSuggestions = props.fetchSuggestions, onSelect = props.onSelect, value = props.value, renderOptions = props.renderOptions, restProps = __rest(props, ["fetchSuggestions", "onSelect", "value", "renderOptions"]);
    var _a = react_1.useState(value), inputValue = _a[0], setInputValue = _a[1];
    var _b = react_1.useState([]), suggestions = _b[0], setSuggestions = _b[1];
    var _c = react_1.useState(false), loading = _c[0], setLoading = _c[1];
    var _d = react_1.useState(-1), highlightIndex = _d[0], setHighlightIndex = _d[1];
    var triggerSearch = react_1.useRef(false);
    var componentRef = react_1.useRef(null);
    var debounceValue = useDebounce_1["default"](inputValue, 500);
    useClickOutSide_1["default"](componentRef, function () {
        setSuggestions([]);
    });
    react_1.useEffect(function () {
        if (debounceValue && triggerSearch.current) {
            var result = fetchSuggestions(inputValue);
            if (result instanceof Promise) {
                console.log('trigger');
                setLoading(true);
                result.then(function (data) {
                    setLoading(false);
                    setSuggestions(data);
                });
            }
            else {
                setSuggestions(result);
            }
        }
        else {
            setSuggestions([]);
        }
        setHighlightIndex(-1);
    }, [debounceValue]);
    var hightlight = function (index) {
        if (index < 0) {
            index = 0;
        }
        if (index >= suggestions.length) {
            index = suggestions.length - 1;
        }
        setHighlightIndex(index);
    };
    var handleKeyDown = function (e) {
        switch (e.keyCode) {
            case 13:
                if (suggestions[highlightIndex]) {
                    handleSelect(suggestions[highlightIndex]);
                }
                break;
            case 38:
                hightlight(highlightIndex - 1);
                break;
            case 40:
                hightlight(highlightIndex + 1);
                break;
            case 27:
                setSuggestions([]);
                break;
            default:
                break;
        }
    };
    var handleChange = function (e) {
        var value = e.target.value.trim();
        setInputValue(value);
        triggerSearch.current = true;
    };
    var handleSelect = function (item) {
        setInputValue(item.value);
        setSuggestions([]);
        if (onSelect) {
            onSelect(item);
        }
        triggerSearch.current = false;
    };
    var renderTemplate = function (item) {
        return renderOptions ? renderOptions(item) : item.value;
    };
    var generateDropDown = function () {
        return (react_1["default"].createElement("ul", null, suggestions.map(function (item, index) {
            var classes = classnames_1["default"]('suggestion-item', {
                'item-highlighted': index === highlightIndex
            });
            return (react_1["default"].createElement("li", { key: index, className: classes, onClick: function () { return handleSelect(item); } }, renderTemplate(item)));
        })));
    };
    return (react_1["default"].createElement("div", { className: "anbol-auto-complete", ref: componentRef },
        react_1["default"].createElement(input_1["default"], __assign({ value: inputValue }, restProps, { onChange: handleChange, onKeyDown: handleKeyDown })),
        loading && react_1["default"].createElement("ul", null,
            react_1["default"].createElement(icon_1["default"], { icon: 'spinner', spin: true })),
        suggestions.length > 0 && generateDropDown()));
};
exports["default"] = AutoComplete;
