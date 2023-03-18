import React, { FC } from 'react'
import ReactDOM from 'react-dom/client'
import '../../assets/css/tailwind.less'

const Main: FC = () => {
	return <>login</>
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Main />
	</React.StrictMode>
)
