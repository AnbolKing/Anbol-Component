"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.SelectContext = void 0;
var react_1 = require("react");
var classnames_1 = require("classnames");
var icon_1 = require("../Icon/icon");
var useClickOutSide_1 = require("./selectHooks/useClickOutSide");
exports.SelectContext = react_1.createContext({ index: '0' });
var Select = function (props) {
    var defaultIndex = props.defaultIndex, placeholder = props.placeholder, disabled = props.disabled, multiple = props.multiple, name = props.name, onChange = props.onChange, onVisibleChange = props.onVisibleChange, children = props.children;
    var componentRef = react_1.useRef(null);
    var _a = react_1.useState(placeholder), hold = _a[0], setHold = _a[1];
    var _b = react_1.useState(defaultIndex), currentIndex = _b[0], setCurrentIndex = _b[1];
    var _c = react_1.useState(false), selectOpen = _c[0], setSelectOpen = _c[1];
    var _d = react_1.useState([]), selectedValues = _d[0], setSelectedValues = _d[1];
    var selectClass = classnames_1["default"]('anbol-select', {
        'is-opened': selectOpen,
        'is-disabled': disabled
    });
    useClickOutSide_1["default"](componentRef, function () {
        setSelectOpen(false);
    });
    var handleChangeItem = function (selectIndex, selectValues) {
        setCurrentIndex(selectIndex);
        if (!multiple) {
            setSelectOpen(false);
            setHold(selectValues);
        }
        if (onChange) {
            onChange(selectIndex + "-" + selectValues);
        }
    };
    var handleAddItem = function (item) {
        setSelectedValues(__spreadArrays(selectedValues, [item]));
    };
    var handleDeleteItem = function (item) {
        // let valueIndex = selectedValues.indexOf(item);
        // if(valueIndex > -1) {
        //   let newList:string[] = selectedValues.splice(valueIndex, 1);
        //   console.log(newList);
        //   setSelectedValues(newList);
        // }
        var newList = selectedValues.filter(function (query) { return (query !== item); });
        setSelectedValues(newList);
    };
    var inputClass = classnames_1["default"]('anbol-input-inner');
    var iconClass = classnames_1["default"]('icon-wrapper');
    var passedContext = {
        index: currentIndex ? currentIndex : '0',
        onSelect: handleChangeItem,
        tags: multiple,
        onAdd: handleAddItem,
        onDelete: handleDeleteItem
    };
    var handleClick = function () {
        if (disabled) {
            return;
        }
        else {
            setSelectOpen(function (open) {
                open = !open;
                if (onVisibleChange) {
                    onVisibleChange(open);
                }
                return open;
            });
        }
    };
    var renderSelectList = function () {
        var dropClass = classnames_1["default"]('anbol-select-dropdown', {
            'is-children': !children
        });
        var childrenElement = react_1["default"].Children.map(children, function (child, index) {
            var childElement = child;
            if (childElement.type.displayName === 'OptionItem') {
                return react_1["default"].cloneElement(childElement);
            }
            else {
                console.error("Warning: Option has a child which is not a OptionItem component");
            }
        });
        return (react_1["default"].createElement("ul", { className: dropClass },
            react_1["default"].createElement(exports.SelectContext.Provider, { value: passedContext }, childrenElement)));
    };
    var renderSelectedTag = function () {
        var tagClass = classnames_1["default"]('anbol-select-tags');
        return (react_1["default"].createElement("div", { className: tagClass }, selectedValues.map(function (item) {
            return (react_1["default"].createElement("span", { className: "select-tag" },
                item,
                react_1["default"].createElement(icon_1["default"], { icon: 'times', style: { cursor: 'pointer', marginLeft: '3px' }, onClick: function () { handleDeleteItem(item); } })));
        })));
    };
    return (react_1["default"].createElement("div", { className: selectClass, ref: componentRef },
        react_1["default"].createElement("div", { className: "anbol-select-input" },
            react_1["default"].createElement("div", { className: "anbol-input-wrapper", onClick: handleClick },
                react_1["default"].createElement("div", { className: iconClass },
                    react_1["default"].createElement(icon_1["default"], { icon: 'angle-down' })),
                react_1["default"].createElement("input", { type: 'text', className: inputClass, readOnly: true, placeholder: disabled ? '被禁止' : (selectedValues.length > 0 ? '' : hold), name: name }))),
        selectOpen && renderSelectList(),
        (multiple && selectedValues.length > 0) && renderSelectedTag()));
};
exports["default"] = Select;
