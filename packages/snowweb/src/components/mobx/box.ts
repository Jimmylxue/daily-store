import { makeAutoObservable } from 'mobx'

class Box {
	flag: undefined | boolean
	child: any[] = []
	constructor() {
		makeAutoObservable(this)
	}

	setFlg(flag: boolean) {
		this.flag = flag
	}

	addChild(child: any) {
		this.child.push(child)
	}
}

export const box = new Box()
