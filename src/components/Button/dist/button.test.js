"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_2 = require("@testing-library/react");
var button_1 = require("./button");
describe('test Button Component', function () {
    it('should render the correct default button', function () {
        var wrapper = react_2.render(react_1["default"].createElement(button_1["default"], null, "Nice"));
        var element = wrapper.getByText('Nice');
        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual('BUTTON');
        expect(element).toHaveClass('btn btn-default');
    });
    it('should render the correct component based on different props', function () {
    });
    it('should render a link when btnType equals link and href is provided', function () {
    });
    it('should render disabled button when disabled set to true', function () {
    });
});
