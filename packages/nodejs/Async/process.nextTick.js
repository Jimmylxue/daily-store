/**
 * sometime we want do something asynchronously, we can use setTimeout with 0.
 *  but we can use process.nextTick to realize it in node environment, which is similar like some front end frame's nextTick function
 */
setTimeout(() => {
	console.log('do it')
}, 0)

process.nextTick(() => {
	console.log('next tick')
})

console.log('hello world')

/**
 * output order is :
 *  hello world
 *  next tick
 *  do it
 */
