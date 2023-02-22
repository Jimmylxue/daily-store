import { makeAutoObservable } from 'mobx'

class Box {
	flag: undefined | boolean
	constructor() {
		makeAutoObservable(this)
	}

	setFlg(flag: boolean) {
		this.flag = flag
	}
}

export const box = new Box()
