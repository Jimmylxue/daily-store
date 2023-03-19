import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
	useNavigate,
} from 'react-router-dom'
import 'antd/dist/reset.css'
import './index.css'
import BabelPage from './pages/babel'
import { Button } from 'antd'
import { SnowDesign } from './pages/snowDesign'
import { ForwardRefDemo } from './pages/forwardRef/forwardRef'
// import Vite from './pages/vite/index'
// import 'snow-react-markdown/dist/css/juejin.css'

const Main = () => {
	const navigate = useNavigate()
	const isLogin = true
	useEffect(() => {
		if (isLogin) {
			navigate('/')
		}
	}, [])

	return (
		<div>
			<Link to={'/snowDesign'}>snowDesign</Link>
			<Link className="ml-3" to={'/forwardRef'}>
				forwardRef
			</Link>
			<hr />
			<Routes>
				<Route index element={<App />} />
				<Route path="/app" element={<App />} />
				<Route path="/babel" element={<BabelPage />} />
				<Route path="/snowDesign" element={<SnowDesign />} />
				<Route path="/forwardRef" element={<ForwardRefDemo />} />
				{/* <Route path="/vite_plugin" element={<Vite />} /> */}
				{/* <Route path="*" element={<App />}></Route> */}
			</Routes>
		</div>
	)
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	// <React.StrictMode>
	<Router>
		<Main />
	</Router>

	// </React.StrictMode>
)
