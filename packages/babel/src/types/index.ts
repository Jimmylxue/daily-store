export type TVisitor = {
	CallExpression: (path: any, { opts }: any) => void
}
