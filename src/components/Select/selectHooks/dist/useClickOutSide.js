"use strict";
exports.__esModule = true;
var react_1 = require("react");
function useClickOutSide(ref, handler) {
    react_1.useEffect(function () {
        var listener = function (event) {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler(event);
        };
        document.addEventListener('click', listener);
        return function () {
            document.removeEventListener('click', listener);
        };
    }, [ref, handler]);
}
exports["default"] = useClickOutSide;
