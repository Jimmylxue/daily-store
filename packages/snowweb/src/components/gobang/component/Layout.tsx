export function Layout() {
	const size = new Array(16).fill('')

	return (
		<div id="app" className="relative">
			{/* row */}
			{size.map((_, index) => (
				<div
					className="row absolute bg-black pointer-events-none"
					key={index}
					style={{
						width: 750,
						height: 1,
						top: (750 / 15) * index,
					}}
					onClick={() => {
						console.log('点到点了 row')
					}}
				></div>
			))}

			{/* col */}
			{size.map((_, index) => (
				<div
					className="col absolute bg-black pointer-events-none"
					key={index}
					style={{
						width: 1,
						height: 750,
						left: (750 / 15) * index,
					}}
					onClick={() => {
						console.log('点到点了 col')
					}}
				></div>
			))}
		</div>
	)
}
