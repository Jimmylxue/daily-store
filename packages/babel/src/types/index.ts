export type TVisitor = {
	CallExpression?: (path: any, { opts }: any) => void
	AwaitExpression?: (path: any, { opts }: any) => void
}
