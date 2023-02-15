import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function RouterBug() {
	const [showDialog, setShowDialog] = useState(false)
	const navigate = useNavigate()
	const clickFn = () => {
		navigate('babel')
	}

	return (
		<div>
			<div onClick={() => setShowDialog(true)}>开启展示区域</div>
			{showDialog && <div onClick={clickFn}>展示区域</div>}
		</div>
	)
}
