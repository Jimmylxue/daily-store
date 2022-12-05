import { useEffect, useState } from 'react'
import UseImageDemo from '@daily-store/snowhooks/src/useImage/demo'
import UseEventListenerDOM from '@daily-store/snowhooks/src/useEventListener/demo'
import UseAsyncEffectDemo1 from '@daily-store/snowhooks/src/useAsyncEffect/demo/demo1'
import UseAsyncEffectDemo2 from '@daily-store/snowhooks/src/useAsyncEffect/demo/demo2'
import UseScrollDemo from '@daily-store/snowhooks/src/useScroll/demo'
import LuckDraw from './components/luckDraw'
import { mockList } from './components/luckDraw/mock'

function App() {
	const [count, setCount] = useState(0)

	return (
		<div className="App">
			<LuckDraw prizeList={mockList} />
			<UseImageDemo />
			<UseEventListenerDOM />
			<UseAsyncEffectDemo1 />
			<UseAsyncEffectDemo2 />
			<UseScrollDemo />
		</div>
	)
}

export default App
