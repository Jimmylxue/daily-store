"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const upload_1 = require("../utils/upload");
const upload_2 = require("./upload");
// 接受进程任务
process.on('message', (tasks) => {
    ;
    (() => __awaiter(void 0, void 0, void 0, function* () {
        const data = tasks.map(task => compressImage(task));
        const details = yield Promise.all([...data.map(fn => fn())]);
        yield Promise.all(details.map(({ path, file }) => {
            new Promise((resolve, reject) => {
                fs_1.default.writeFile(path, Buffer.concat([file, upload_1.tagBuf]), err => {
                    if (err)
                        reject(err);
                    resolve(true);
                });
            });
        }));
        // process?.send(details)
        if (process.send) {
            process.send(details);
        }
    }))();
});
function compressImage({ fullRoute, outputRoute, fileName, }) {
    return () => __awaiter(this, void 0, void 0, function* () {
        const result = {
            input: 0,
            output: 0,
            ratio: 0,
            msg: '',
            time: 0,
            file: fs_1.default.readFileSync(fullRoute),
            path: outputRoute,
            fileName,
        };
        try {
            const start = +new Date();
            // 上传
            const dataUpload = yield (0, upload_2.upload)(result.file);
            // 下载
            const dataDownload = yield (0, upload_2.download)(dataUpload.output.url);
            result.input = dataUpload.input.size;
            result.output = dataUpload.output.size;
            result.ratio = 1 - dataUpload.output.ratio;
            result.file = Buffer.alloc(dataDownload.length, dataDownload, 'binary');
            result.time = +new Date() - start;
        }
        catch (error) {
            result.msg = `错误：${JSON.stringify(error || {})}`;
        }
        return result;
    });
}
