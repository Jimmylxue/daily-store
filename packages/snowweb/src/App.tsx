import { useEffect, useState } from 'react'
import UseImageDemo from '@daily-store/snowhooks/src/useImage/demo'
// import UseEventListenerDOM from '@daily-store/snowhooks/src/useEventListener/demo'
// import UseAsyncEffectDemo1 from '@daily-store/snowhooks/src/useAsyncEffect/demo/demo1'
// import UseAsyncEffectDemo2 from '@daily-store/snowhooks/src/useAsyncEffect/demo/demo2'
// import UseScrollDemo from '@daily-store/snowhooks/src/useScroll/demo'
// import LuckDraw from './components/luckDraw'
// import { mockList } from './components/luckDraw/mock'
import { Gobang } from './components/gobang'
// import SetStateDemo from './components/setStateDemo'
import MemoDemo from './components/memoDemo'
import RouterBug from './components/routerBug'
import { DeepDemo } from './components/mobx/deep'
import { Skeleton, Sweep } from './components/snowDesign'
import { MoBxDemo } from './pages/mobx'
import { ComputedDemo } from './pages/mobx/example/computedDemo'
// import MemoDemo2 from './components/memoDemo/demo2'
// import { Link } from 'react-router-dom'
// const snow_animate = require('./')
// import { sendMessage, listenStorage } from '@daily-store/library/dist/js'
function App() {
	const [count, setCount] = useState(0)

	return (
		<div className="App">
			<MoBxDemo />
			{/* <RouterBug /> */}
			{/* <Link to="/babel">babel</Link>
			<Link to="/vite_plugin">vite_plugin</Link> */}
			{/* <SetStateDemo /> */}
			{/* <MoBxDemo /> */}
			{/* <ComputedDemo /> */}
			{/* <DeepDemo /> */}
			{/* <Sweep>
				<div
					className=" w-full bg-gray-200"
					style={{
						height: 300,
					}}
				></div>
			</Sweep> */}
			{/* <MemoDemo /> */}
			{/* <MemoDemo2 />
			<LuckDraw prizeList={mockList} drawType="NINE_LATTICE" /> */}
			{/* <Gobang /> */}
			{/* <UseImageDemo /> */}

			{/* <UseEventListenerDOM />
			<UseAsyncEffectDemo1 />
			<UseAsyncEffectDemo2 />
			<UseScrollDemo /> */}
		</div>
	)
}

export default App
