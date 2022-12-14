/**
 * sometime we want do something asynchronously, we can use setTimeout with 0.
 *  but we can use process.nextTick to realize it in node environment, which is similar like some front end frame's nextTick function
 *
 * nodejs io is power by event loop, so the difference from setTimeout(fn,0) and process.nextTick is before will add function to event loop queue end,
 * 	but the after one will add function into next event loop queue head! which is why process.nextTick will running fast than setTimeout(fn,0)
 *
 * 	so process.nextTick performance is better than setTimeout(fn,0)
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
