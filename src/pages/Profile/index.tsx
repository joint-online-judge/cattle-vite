import { useModel } from '@@/plugin-model/useModel'
import ProfileCard from 'components/Profile/ProfileCard'
import SidePage from 'components/SidePage'
import type React from 'react'
import { useEffect } from 'react'

const Index: React.FC = () => {
	const { removeHeader } = useModel('pageHeader')
	// Todo: replace with user profile
	useEffect(() => {
		removeHeader()
	}, [removeHeader])

	return (
		<SidePage position='left' extra={<ProfileCard />}>
			test
		</SidePage>
	)
}

export default Index
