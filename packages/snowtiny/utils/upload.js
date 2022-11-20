"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagBuf = exports.randomHeader = exports.randomNum = void 0;
function randomNum(min = 0, max = 10) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
exports.randomNum = randomNum;
function randomHeader() {
    return {
        headers: {
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Postman-Token': Date.now(),
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
            'X-Forwarded-For': new Array(4)
                .fill(0)
                .map(() => parseInt(String(Math.random() * 255), 10))
                .join('.'), // 构造ip
        },
        hostname: ['tinyjpg.com', 'tinypng.com'][randomNum(0, 1)],
        method: 'POST',
        path: '/web/shrink',
        rejectUnauthorized: false,
    };
}
exports.randomHeader = randomHeader;
// 用于标识该文件是否被压缩过
exports.tagBuf = Buffer.from('tiny', 'binary');
