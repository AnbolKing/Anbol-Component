"use strict";
exports.__esModule = true;
exports.TabContext = void 0;
var react_1 = require("react");
var classnames_1 = require("classnames");
exports.TabContext = react_1.createContext({ index: 0 });
var Tab = function (props) {
    var defaultIndex = props.defaultIndex, children = props.children, className = props.className, type = props.type, style = props.style, onSelect = props.onSelect;
    var _a = react_1.useState(defaultIndex), currentActive = _a[0], setActive = _a[1];
    // const [currentContent, setContent] = useState<React.ElementType>();
    var classesNav = classnames_1["default"]('anbol-tabs-nav', className, {
        'nav-line': type === 'line',
        'nav-card': type === 'card'
    });
    var handleClick = function (key) {
        setActive(key);
        if (onSelect) {
            onSelect(key);
        }
    };
    var passedContext = {
        index: currentActive ? currentActive : 0,
        type: type,
        onSelect: handleClick
    };
    var renderChildren = function () {
        return react_1["default"].Children.map(children, function (child, index) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === 'TabItem') {
                return react_1["default"].cloneElement(childElement, {
                    key: index
                });
            }
            else {
                console.error("Warning: Menu has a child which is not a MenuItem component");
            }
        });
    };
    var renderContent = function () {
        return react_1["default"].Children.map(children, function (child, index) {
            if (index === currentActive) {
                var childElement = child;
                var childProps = childElement.props;
                return childProps.children;
            }
        });
    };
    return (react_1["default"].createElement("div", { className: "anbol-tabs" },
        react_1["default"].createElement("ul", { className: classesNav, style: style },
            react_1["default"].createElement(exports.TabContext.Provider, { value: passedContext }, renderChildren())),
        react_1["default"].createElement('div', { className: "anbol-tabs-content" }, renderContent())));
};
Tab.defaultProps = {
    defaultIndex: 0,
    type: 'line'
};
exports["default"] = Tab;
