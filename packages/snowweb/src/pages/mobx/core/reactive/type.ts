export type Dep = () => void

export type Options = {
	scheduler?: (fn: () => void) => void
	lazy?: boolean // 立刻执行一次，还是等待变化时再执行
}

// 函数类型 且拥有 deps 静态属性
export interface IDep {
	(): void
	deps: Set<Dep>
	options: Options
}

export type Target = { [key in string]: any }
