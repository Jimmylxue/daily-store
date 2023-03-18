import React, { FC } from 'react'
import ReactDOM from 'react-dom/client'

const Test: FC = () => {
	return <div>test</div>
}

const Main: FC = () => {
	return <>hello world@@@@</>
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Main />
	</React.StrictMode>
)
