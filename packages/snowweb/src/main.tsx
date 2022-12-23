import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
// import './index.css'
import BabelPage from './pages/babel'
import Vite from './pages/vite'
// import './juejin.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Router>
			<Routes>
				<Route path="/" element={<Vite />} />
				{/* <Route path="/babel" element={<BabelPage />} />
				<Route path="/vite_plugin" element={<Vite />} /> */}
				{/* <Route path="*" element={<App />}></Route> */}
			</Routes>
		</Router>
	</React.StrictMode>
)
