/**
 * 给出下面代码执行顺序：
 *  记录一下自己做题过程：分析是：script start、async1 start、 async2、 async1 end、 promise1、promise2、script end、promise3、setTimeout
 * 
 * 正确答案：
 *  script start
    async1 start
    async2
    promise1
    promise2
    script end
    async1 end
    promise3
    setTimeout

    做错了，await 后面的代码也算是一种异步代码  原以为 async2()执行结束之后就会执行 async1 end 但是结果并不是这样
 */

async function async1() {
	console.log('async1 start')
	await async2()
	console.log('async1 end')
}
async function async2() {
	console.log('async2')
}
console.log('script start')
setTimeout(function () {
	console.log('setTimeout')
}, 0)
async1()
new Promise(function (resolve) {
	console.log('promise1')
	resolve()
	console.log('promise2')
}).then(function () {
	console.log('promise3')
})
console.log('script end')
