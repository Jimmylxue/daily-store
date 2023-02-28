// 有一个"对象"类型， 它一定有 name 和 age 这个两个属性， //sex....

type TBase = {
	name: any
	age: any
}

type TUser = TBase & Record<string, any>

const jim: TUser = {
	name: 'jimmy',
	age: 22,
	love: 22,
	dshsjhds: 'sdhahsdsd',
}
