import { memo } from 'react'
import useScroll from '..'

export default memo(() => {
	const { left, top } = useScroll()
	return (
		<div
			style={{
				width: '300px',
				height: '400px',
				overflow: 'scroll',
				fontSize: 30,
			}}
		>
			<p>
				left:{left} top:{top}
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
				commodi sit ut animi quo consequatur et sequi, dolorum temporibus eaque!
				Omnis fuga maxime deserunt numquam facere voluptates quisquam quae
				magnam!
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
				commodi sit ut animi quo consequatur et sequi, dolorum temporibus eaque!
				Omnis fuga maxime deserunt numquam facere voluptates quisquam quae
				magnam!
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
				commodi sit ut animi quo consequatur et sequi, dolorum temporibus eaque!
				Omnis fuga maxime deserunt numquam facere voluptates quisquam quae
				magnam!
			</p>
		</div>
	)
})
