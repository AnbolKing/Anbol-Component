"use strict";
exports.__esModule = true;
var react_1 = require("react");
var classnames_1 = require("classnames");
var select_1 = require("./select");
var icon_1 = require("../Icon/icon");
var Option = function (props) {
    var index = props.index, value = props.value, label = props.label, disabled = props.disabled;
    var context = react_1.useContext(select_1.SelectContext);
    var _a = react_1.useState(false), selected = _a[0], setSelected = _a[1];
    var optionClass = classnames_1["default"]('anbol-select-item', {
        'is-disabled': disabled,
        'is-selected': context.tags && selected
    });
    react_1.useEffect(function () {
        if (context.onAdd && context.onDelete) {
            if (selected) {
                context.onAdd(value);
            }
            if (!selected) {
                context.onDelete(value);
            }
        }
    }, [selected]);
    var handleClick = function () {
        setSelected(!selected);
        if (context.onSelect && !disabled && (typeof index === 'string')) {
            context.onSelect(index, value);
        }
    };
    return (react_1["default"].createElement("li", { className: optionClass, onClick: handleClick, key: label },
        value,
        selected && react_1["default"].createElement(icon_1["default"], { icon: 'check' })));
};
Option.displayName = 'OptionItem';
exports["default"] = Option;
