"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const utils_1 = require("./utils");
function scanFire(input, output) {
    const objStruct = {};
    const path = (0, path_1.resolve)(__dirname, `${input}`);
    diffFile(path, objStruct, input);
    outputFile(objStruct, (0, path_1.resolve)(__dirname, `${output}`));
    return objStruct;
}
function diffFile(path, obj, entry) {
    obj.dirRoute = path;
    obj.dirname = entry;
    let res = fs_1.default.readdirSync(path);
    if (res) {
        res.map(item => {
            var _a, _b;
            if ((0, utils_1.isDir)(path + '/' + item)) {
                // isDirectory
                if (!obj.dirChildren) {
                    obj.dirChildren = [];
                }
                if (!obj.dirChildren.find(dir => dir.dirRoute === item)) {
                    obj.dirChildren.push({
                        dirRoute: item,
                    });
                }
                diffFile(path + '/' + item, (_a = obj.dirChildren) === null || _a === void 0 ? void 0 : _a.find(dir => dir.dirRoute === item), item);
            }
            else {
                // is file
                if (!obj.fileChildren) {
                    obj.fileChildren = [];
                }
                if (!(0, utils_1.isInvalidFile)(item)) {
                    (_b = obj.fileChildren) === null || _b === void 0 ? void 0 : _b.push({
                        isDir: false,
                        isImage: (0, utils_1.isImage)(item),
                        fileName: item,
                        fullRoute: path + '/' + item,
                    });
                }
            }
        });
    }
    else {
        console.warn('空目录');
    }
}
function outputFile(fileStruct, output) {
    var _a, _b;
    fs_1.default.mkdirSync(output);
    (_a = fileStruct.fileChildren) === null || _a === void 0 ? void 0 : _a.map(fileItemInfo => {
        const { fileName, fullRoute } = fileItemInfo;
        const file = fs_1.default.readFileSync(fullRoute);
        console.log('写入完成：', fileName);
        fs_1.default.writeFileSync(`${output}/${fileName}`, file);
    });
    (_b = fileStruct.dirChildren) === null || _b === void 0 ? void 0 : _b.map(dirItemInfo => {
        outputFile(dirItemInfo, output + '/' + dirItemInfo.dirname);
    });
}
scanFire('./images', './temp');
