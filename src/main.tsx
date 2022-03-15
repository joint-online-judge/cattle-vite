import App from 'App'
import { AccessContextProvider } from 'models/access'
import { AuthContextProvider } from 'models/auth'
import { DomainContextProvider } from 'models/domain'
import { LangContextProvider } from 'models/lang'
import { PageHeaderContextProvider } from 'models/pageHeader'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { registerSW } from 'virtual:pwa-register'
import './i18n'
import './index.less'

registerSW()

ReactDOM.render(
	<StrictMode>
		<LangContextProvider>
			<AuthContextProvider>
				<AccessContextProvider>
					<DomainContextProvider>
						<PageHeaderContextProvider>
							<BrowserRouter>
								<App />
							</BrowserRouter>
						</PageHeaderContextProvider>
					</DomainContextProvider>
				</AccessContextProvider>
			</AuthContextProvider>
		</LangContextProvider>
	</StrictMode>,
	document.querySelector('#root')
)
