export function Layout() {
	const size = new Array(15).fill('')
	return (
		<>
			{/* row */}
			{size.map((_, index) => (
				<div
					className="row absolute bg-black"
					key={index}
					style={{
						width: 750,
						height: 1,
						top: (750 / 14) * index,
					}}
				></div>
			))}

			{/* col */}
			{size.map((_, index) => (
				<div
					className="col absolute bg-black"
					key={index}
					style={{
						width: 1,
						height: 750,
						left: (750 / 14) * index,
					}}
				></div>
			))}
		</>
	)
}
