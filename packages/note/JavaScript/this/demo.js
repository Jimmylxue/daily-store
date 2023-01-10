const person = {
	name: 'jimmy',
	getName: () => {
		console.log(this.name)
	},
}

person.getName()
