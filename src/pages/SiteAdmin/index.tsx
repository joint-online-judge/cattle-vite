import SideMenuPage from 'components/SideMenuPage'
import type React from 'react'
import type { IRouteComponentProps } from 'umi'

const Index: React.FC<IRouteComponentProps> = ({ children, route }) => (
	<SideMenuPage route={route}>{children}</SideMenuPage>
)

export default Index
