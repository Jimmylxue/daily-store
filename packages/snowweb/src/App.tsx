import { useState } from 'react'
import UseImageDemo from '@daily-store/snowhooks/src/useImage/demo'

function App() {
	const [count, setCount] = useState(0)

	return (
		<div className="App">
			<UseImageDemo />
		</div>
	)
}

export default App
