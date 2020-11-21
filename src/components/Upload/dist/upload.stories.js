"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_2 = require("@storybook/react");
var upload_1 = require("./upload");
var SimpleUpload = function () {
    var defaultFileList = [
        { uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 30 },
        { uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
        { uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 30 }
    ];
    return (react_1["default"].createElement(upload_1["default"], { action: 'http://jsonplaceholder.typicode.com/posts', defaultFileList: defaultFileList }));
};
react_2.storiesOf('Upload Component', module)
    .add('Upload', SimpleUpload);
