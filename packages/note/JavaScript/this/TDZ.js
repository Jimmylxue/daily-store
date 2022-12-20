// base TDZ
function demo() {
	console.log(a)
	const a = 'jimmy'
}
/**
 * the above case is express us what is TDZ, we can simple to think before a initialize block is an TDZ（暂时性死区）
 */

demo()

/**
 * this is an advanced case, when we provider argument of a1, this case will success return real a1 and a2
 *
 * but if we doesn't provider a1, this argument will to handle a1 = a2, but a2 doesn't has value now, so, this is also an TDZ
 */

function foo(a1 = a2, a2) {
	console.log(a1, a2)
}

foo('jimmy', 'xuexue') // jimmy  xuexue

foo(undefined, 'xuexue') // Cannot access 'a2' before initialization

/**
 * this is an explain but don't know whether reliable to check TDZ is throw error message whether include Cannot access some variable before initialization
 */

/** ------------------------------ */

/**
 * in this case will success return null and xuexue, this is because null is an really variable in function understand!
 *  those is about deferent between null and undefined
 */

foo(null, 'xuexue') // null xuexue
