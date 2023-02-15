import { memo } from 'react'
import { useNavigate } from 'react-router-dom'

export default memo(() => {
	const navigate = useNavigate()

	return (
		<div>
			<h3>Babel</h3>
			<div
				onClick={() => {
					navigate('/app')
				}}
			>
				Back
			</div>
		</div>
	)
})
