import { memo, useEffect } from 'react'
import { sendMessage } from '@daily-store/library/dist/js'

export default memo(() => {
	useEffect(() => {}, [])

	return (
		<div>
			<button
				onClick={() => {
					sendMessage('dzSend', {
						name: 'jimmy',
					})
				}}
			>
				send
			</button>
			<snow-markdown source="./introduce.md" />
		</div>
	)
})
