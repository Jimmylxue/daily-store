interface Point {
	x: number
	y: number
}

class Square {
	constructor(public point: Point, public side: number) {}
}

class Rectangle {
	constructor(
		public point: Point,
		public width: number,
		public height: number
	) {}
}

class Circle {
	constructor(public center: Point, public radius: number) {}
}

class Geometry {
	private PI: number = 3.14

	public area(obj: any): number | undefined {
		if (obj instanceof Square) {
			return obj.side * obj.side
		} else if (obj instanceof Rectangle) {
			return obj.width * obj.height
		} else if (obj instanceof Circle) {
			return obj.radius * obj.radius * this.PI
		}
	}
}

export const geometry = new Geometry()

export const square = new Square({ x: 0, y: 0 }, 10)

export const rectangle = new Rectangle({ x: 0, y: 0 }, 10, 8)

export const circle = new Circle({ x: 0, y: 0 }, 3)
