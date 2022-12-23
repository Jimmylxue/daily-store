import { memo } from 'react'

export default memo(() => {
	return (
		<div>
			<g-markdown file="./README.md" />
		</div>
	)
})
