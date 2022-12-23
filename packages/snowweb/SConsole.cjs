'use strict'

const visitor = {
	CallExpression(path, { opts }) {
		// console.log(path);
		// console.log(opts);
	},
}
var index = () => {
	return {
		name: '@daily-store/snow-babel-console',
		visitor,
	}
}

module.exports = index
