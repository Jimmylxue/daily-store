import { TVisitor } from 'src/types'

const visitor: TVisitor = {
	AwaitExpression(path, { opts }) {
		// check whether is try node in this AST node parent
		if (path.findParent((parent: any) => parent.isTryStatement())) {
		}
	},
}

export default () => {
	return {
		name: '@daily-store/snow-babel-console',
		visitor,
	}
}
