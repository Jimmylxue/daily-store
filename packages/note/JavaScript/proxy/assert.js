const assert = new Proxy(
	{},
	{
		set(target, check, value) {
			if (!value) {
				console.log('fail :', check)
			} else {
				console.log('pass :', check)
			}
			return true
		},
		get(target, check) {
			return target[check]
		},
	}
)

assert['check 15 is smaller than 17'] = 15 > 17

function checkCount(count) {
	return count > 25
}

assert['function should return true when count is 30'] = checkCount(30)
assert['function should return false when count is 22'] = checkCount(22)
