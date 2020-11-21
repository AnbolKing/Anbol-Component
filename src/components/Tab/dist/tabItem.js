"use strict";
exports.__esModule = true;
var react_1 = require("react");
var classnames_1 = require("classnames");
var tab_1 = require("./tab");
var TabItem = function (props) {
    var label = props.label, disabled = props.disabled, style = props.style, className = props.className, index = props.index;
    var context = react_1.useContext(tab_1.TabContext);
    var classes = classnames_1["default"]('tab-item', className, {
        'is-disbaled': disabled,
        'is-active': context.index === index
    });
    var handleClick = function () {
        if (context.onSelect && !disabled && (typeof index === 'number')) {
            context.onSelect(index);
        }
    };
    return (react_1["default"].createElement("li", { className: classes, style: style, onClick: handleClick }, label));
};
TabItem.displayName = 'TabItem';
TabItem.defaultProps = {
    label: 'This is Label'
};
exports["default"] = TabItem;
