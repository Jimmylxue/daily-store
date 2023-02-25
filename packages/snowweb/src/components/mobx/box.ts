import { makeAutoObservable } from 'mobx'

class Box {
	flag: undefined | boolean
	childs: any[] = []
	constructor() {
		makeAutoObservable(this)
	}

	setFlg(flag: boolean) {
		this.flag = flag
	}

	addChild(child: any) {
		this.childs.push(child)
	}
}

export const box = new Box()
