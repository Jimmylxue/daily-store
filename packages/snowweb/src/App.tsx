import { useEffect, useState } from 'react'
import UseImageDemo from '@daily-store/snowhooks/src/useImage/demo'
import UseEventListenerDOM from '@daily-store/snowhooks/src/useEventListener/demo'
import UseAsyncEffectDemo1 from '@daily-store/snowhooks/src/useAsyncEffect/demo/demo1'
import UseAsyncEffectDemo2 from '@daily-store/snowhooks/src/useAsyncEffect/demo/demo2'
import UseScrollDemo from '@daily-store/snowhooks/src/useScroll/demo'
import LuckDraw from './components/luckDraw'
import { mockList } from './components/luckDraw/mock'
import { Gobang } from './components/gobang'
import { Link } from 'react-router-dom'
// const snow_animate = require('./')
import { sendMessage, listenStorage } from '@daily-store/library/dist/js'
function App() {
	const [count, setCount] = useState(0)

	useEffect(() => {
		listenStorage((e: any, payload: any) => {
			console.log(e, payload)
		})
		// console.log(listenStorage)
	}, [])

	return (
		<div className="App">
			<Link to="/babel">babel</Link>
			<Link to="/vite_plugin">vite_plugin</Link>
			<Gobang />
			<LuckDraw prizeList={mockList} drawType="NINE_LATTICE" />
			<UseImageDemo />
			<UseEventListenerDOM />
			<UseAsyncEffectDemo1 />
			<UseAsyncEffectDemo2 />
			<UseScrollDemo />
		</div>
	)
}

export default App
