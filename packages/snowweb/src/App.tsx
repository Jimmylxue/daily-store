import { useEffect, useState } from 'react'
import UseImageDemo from '@daily-store/snowhooks/src/useImage/demo'
import UseEventListenerDOM from '@daily-store/snowhooks/src/useEventListener/demo'
import UseAsyncEffectDemo1 from '@daily-store/snowhooks/src/useAsyncEffect/demo/demo1'
import UseAsyncEffectDemo2 from '@daily-store/snowhooks/src/useAsyncEffect/demo/demo2'

function App() {
	const [count, setCount] = useState(0)

	return (
		<div className="App">
			<UseImageDemo />
			<UseEventListenerDOM />
			<UseAsyncEffectDemo1 />
			<UseAsyncEffectDemo2 />
		</div>
	)
}

export default App
