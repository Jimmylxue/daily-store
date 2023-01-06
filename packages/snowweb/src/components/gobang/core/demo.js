const arr = []

for (let x = 0; x <= 14; x++) {
	const row = []
	for (let y = 0; y <= 14; y++) {
		const item = {
			x,
			y,
		}
		row.push(item)
	}
	arr.push(row)
}

const newArr = arr[0].map((col, i) => arr.map(row => row[i]))
// console.log(newArr)

const point = { x: 7, y: 1 }
// expect {6，2} {5，3} {4，4} {3，5} {2，6} {1，7} {0，8}
