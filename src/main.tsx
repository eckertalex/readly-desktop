import {StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './app'
import {AppProviders} from './providers'
import {loadDevTools} from './features/dev-tools/load'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

loadDevTools(() => {
	root.render(
		<StrictMode>
			<AppProviders>
				<App />
			</AppProviders>
		</StrictMode>
	)
})
