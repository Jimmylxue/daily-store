import { memo } from 'react'
import useTextSelection from '..'

export default memo(() => {
	const { text } = useTextSelection()
	return (
		<div>
			<p>selectText:{text}</p>
			<p>hello world</p>
		</div>
	)
})
