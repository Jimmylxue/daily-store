"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.download = exports.upload = void 0;
const https_1 = __importDefault(require("https"));
const url_1 = __importDefault(require("url"));
const upload_1 = require("../utils/upload");
function upload(file) {
    const header = (0, upload_1.randomHeader)();
    return new Promise((resolve, reject) => {
        const req = https_1.default.request(header, res => {
            res.on('data', data => {
                try {
                    const resp = JSON.parse(data.toString());
                    if (resp.error) {
                        reject(resp);
                    }
                    else {
                        resolve(resp);
                    }
                }
                catch (err) {
                    reject(err);
                }
            });
        });
        req.write(file);
        req.on('error', err => reject(err));
        req.end();
    });
}
exports.upload = upload;
function download(path) {
    const header = new url_1.default.URL(path);
    return new Promise((resolve, reject) => {
        const req = https_1.default.request(header, res => {
            let content = '';
            res.setEncoding('binary');
            res.on('data', data => (content += data));
            res.on('end', () => resolve(content));
        });
        req.on('error', err => reject(err));
        req.end();
    });
}
exports.download = download;
