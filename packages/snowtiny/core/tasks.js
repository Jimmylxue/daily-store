"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignTask = void 0;
const os_1 = __importDefault(require("os"));
const path_1 = require("path");
const cluster = require('cluster');
const cpuNums = os_1.default.cpus().length;
function assignTask(taskList) {
    cluster.setupPrimary({
        exec: (0, path_1.resolve)(__dirname, 'process.js'),
    });
    const works = [];
    if (taskList.length <= cpuNums) {
        works.push({ work: cluster.fork(), tasks: taskList });
    }
    else {
        for (let i = 0; i < cpuNums; i++) {
            const work = cluster.fork();
            works.push({ work, tasks: [] });
        }
    }
    // 平均分配任务
    let workNum = 0;
    taskList.forEach(task => {
        if (works.length === 1) {
            return;
        }
        else if (workNum >= works.length) {
            works[0].tasks.push(task);
            workNum = 1;
        }
        else {
            works[workNum].tasks.push(task);
            workNum += 1;
        }
    });
    // 用于记录进程完成数
    let pageNum = works.length;
    let succeedNum = 0; // 成功资源数
    let failNum = 0; // 失败资源数
    const failMsg = []; // 失败列表
    works.forEach(({ work, tasks }) => {
        work.send(tasks);
        // // 接收到进程的成功消息
        work.on('message', (details) => {
            // console.log('压缩成功 ', details)
            details.forEach(item => {
                console.log(`图片资源-${item.fileName}  -- 压缩前：${item.input}  -- 压缩后：${item.output}  压缩比率：${item.ratio * 100}%`);
            });
            cluster.disconnect();
        });
    });
}
exports.assignTask = assignTask;
