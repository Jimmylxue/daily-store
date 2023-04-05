interface Point {
	x: number
	y: number
}

interface Shape {
	area: () => number
}

class Square implements Shape {
	constructor(public point: Point, public side: number) {}
	area() {
		return this.side * this.side
	}
}

class Rectangle implements Shape {
	constructor(
		public point: Point,
		public width: number,
		public height: number
	) {}
	area() {
		return this.width * this.height
	}
}

class Circle implements Shape {
	private PI: number = 3.14
	constructor(public center: Point, public radius: number) {}
	area() {
		return this.radius * this.radius * this.PI
	}
}

export const square = new Square({ x: 0, y: 0 }, 10)

export const rectangle = new Rectangle({ x: 0, y: 0 }, 10, 8)

export const circle = new Circle({ x: 0, y: 0 }, 3)
