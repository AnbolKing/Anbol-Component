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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var axios_1 = require("axios");
var dragger_1 = require("./dragger");
var MyUpload = function (props) {
    var action = props.action, defaultFileList = props.defaultFileList, beforeUpload = props.beforeUpload, onProgress = props.onProgress, onSuccess = props.onSuccess, onError = props.onError, onChange = props.onChange, onRemove = props.onRemove, name = props.name, withCredentials = props.withCredentials, data = props.data, headers = props.headers, accept = props.accept, mutiple = props.mutiple, children = props.children, drag = props.drag;
    var fileInput = react_1.useRef(null);
    var _a = react_1.useState(defaultFileList || []), fileList = _a[0], setFileList = _a[1];
    var updateFileList = function (uploadFile, updateObj) {
        setFileList(function (prevList) {
            return prevList.map(function (file) {
                if (file.uid === uploadFile.uid) {
                    return __assign(__assign({}, file), updateObj);
                }
                else {
                    return file;
                }
            });
        });
    };
    var handleClick = function () {
        if (fileInput.current) {
            fileInput.current.click();
        }
    };
    var handleChange = function (e) {
        // console.log(e);
        var files = e.target.files;
        if (!files) {
            return;
        }
        uploadFiles(files);
        if (fileInput.current) {
            fileInput.current.value = '';
        }
    };
    var uploadFiles = function (files) {
        console.log(files);
        var postFiles = Array.from(files);
        postFiles.forEach(function (file) {
            if (!beforeUpload) {
                post(file);
            }
            else {
                var result = beforeUpload(file);
                if (result && result instanceof Promise) {
                    result.then(function (processFile) {
                        post(processFile);
                    });
                }
                if (result !== false) {
                    post(file);
                }
            }
        });
    };
    var post = function (file) {
        var oneFile = {
            uid: Date.now() + 'upload-file',
            status: 'ready',
            name: file.name,
            size: file.size,
            raw: file,
            percent: 0
        };
        setFileList(function (prevList) {
            return __spreadArrays([oneFile], prevList);
        });
        var formData = new FormData();
        formData.append(name || 'file', file);
        if (data) {
            Object.keys(data).forEach(function (key) {
                formData.append(key, data[key]);
            });
        }
        axios_1["default"].post(action, formData, {
            headers: __assign(__assign({}, headers), { 'Content-Type': 'multipart/form-data' }),
            withCredentials: withCredentials,
            onDownloadProgress: function (e) {
                var percentage = Math.round((e.loaded * 100) / e.total);
                if (percentage < 100) {
                    updateFileList(oneFile, { percent: percentage, status: 'uploading' });
                    if (onProgress) {
                        onProgress(percentage, file);
                    }
                }
            }
        }).then(function (res) {
            console.log(res);
            updateFileList(oneFile, { response: res.data, status: 'success' });
            if (onSuccess) {
                onSuccess(res.data, file);
            }
            if (onChange) {
                onChange(file);
            }
        })["catch"](function (err) {
            console.log(err);
            updateFileList(oneFile, { error: err, status: 'error' });
            if (onError) {
                onError(err, file);
            }
        });
    };
    var handleDrag = function (files) {
        uploadFiles(files);
    };
    return (react_1["default"].createElement("div", { className: "anbol-upload-component" },
        react_1["default"].createElement("div", { className: "anbol-upload-input", style: { display: 'inline-block' }, onClick: handleClick },
            drag ?
                react_1["default"].createElement(dragger_1["default"], { onFile: handleDrag }, children)
                : { children: children },
            react_1["default"].createElement("input", { type: 'file', className: 'anbol-file-input', ref: fileInput, style: { display: 'none' }, accept: accept, multiple: mutiple, onChange: handleChange }))));
};
exports["default"] = MyUpload;
