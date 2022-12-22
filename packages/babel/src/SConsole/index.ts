import { TVisitor } from 'src/types'
const isProduction = process.env.NODE_ENV === 'production'

function removeConsoleExpression() {}

const visitor: TVisitor = {
	CallExpression(path, { opts }) {
		console.log(path)
		console.log(opts)
		const calleePath = path.get('callee')

		if (calleePath && calleePath.matchesPattern('console', true)) {
			// if (env === 'production' || isProduction) {
			// removeConsoleExpression(path, calleePath, exclude, commentWords)
			// }
		}
		// const { exclude, commentWords, env } = opts;
	},
}

export default () => {
	return {
		name: '@daily-store/snow-babel-console',
		visitor,
	}
}
