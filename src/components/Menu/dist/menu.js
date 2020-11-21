"use strict";
exports.__esModule = true;
exports.Menu = exports.MenuContext = void 0;
var react_1 = require("react");
var classnames_1 = require("classnames");
exports.MenuContext = react_1.createContext({ index: '0' });
exports.Menu = function (props) {
    var className = props.className, mode = props.mode, style = props.style, onSelect = props.onSelect, children = props.children, defaultIndex = props.defaultIndex, defaultOpenMenu = props.defaultOpenMenu;
    //设置当前被点击的菜单项
    var _a = react_1.useState(defaultIndex), currentActive = _a[0], setActive = _a[1];
    var classes = classnames_1["default"]('anbol-menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical'
    });
    var handleClick = function (index) {
        setActive(index);
        if (onSelect) {
            onSelect(index);
        }
    };
    var passedContext = {
        index: currentActive ? currentActive : '0',
        onSelect: handleClick,
        mode: mode,
        defaultOpenMenu: defaultOpenMenu
    };
    return (react_1["default"].createElement("ul", { className: classes, style: style },
        react_1["default"].createElement(exports.MenuContext.Provider, { value: passedContext }, children)));
};
exports.Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenMenu: []
};
exports["default"] = exports.Menu;
