"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInvalidFile = exports.isDir = exports.isImage = exports.filterFile = void 0;
const fs_1 = __importDefault(require("fs"));
function filterFile(fileList, path) {
    return fileList.filter(fileName => {
        if (isDir(path + '/' + fileName)) {
            // console.log('yes')
        }
        else {
        }
        return ((!fileName.startsWith('.') && fileName.endsWith('png')) ||
            fileName.endsWith('jpeg') ||
            fileName.endsWith('jpg'));
    });
}
exports.filterFile = filterFile;
function isImage(fileName) {
    return (fileName.endsWith('png') ||
        fileName.endsWith('jpeg') ||
        fileName.endsWith('jpg'));
}
exports.isImage = isImage;
function isDir(pathName) {
    const stat = fs_1.default.lstatSync(pathName);
    return stat.isDirectory();
}
exports.isDir = isDir;
function isInvalidFile(fileName) {
    return !!fileName.startsWith('.');
}
exports.isInvalidFile = isInvalidFile;
