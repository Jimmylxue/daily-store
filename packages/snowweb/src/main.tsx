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
import './index.css'
import BabelPage from './pages/babel'
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
		<Routes>
			<Route index element={<App />} />
			<Route path="/app" element={<App />} />
			<Route path="/babel" element={<BabelPage />} />
			{/* <Route path="/vite_plugin" element={<Vite />} /> */}
			{/* <Route path="*" element={<App />}></Route> */}
		</Routes>
	)
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	// <React.StrictMode>
	<Router>
		<Main />
	</Router>

	// </React.StrictMode>
)
