import { useEffect, useState } from 'react'
import UseImageDemo from '@daily-store/snowhooks/src/useImage/demo'
import UseEventListenerDOM from '@daily-store/snowhooks/src/useEventListener/demo'

function App() {
	const [count, setCount] = useState(0)

	return (
		<div className="App">
			<UseImageDemo />
			<UseEventListenerDOM />
		</div>
	)
}

export default App
