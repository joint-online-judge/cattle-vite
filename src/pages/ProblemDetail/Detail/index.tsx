import { Empty } from 'antd'
import MarkdownRender from 'components/MarkdownRender'
import ShadowCard from 'components/ShadowCard'
import type React from 'react'
import { useContext } from 'react'
import ProblemContext from '../context'

const Index: React.FC = () => {
	const problemContext = useContext(ProblemContext)

	return (
		<ShadowCard title='Problem Description'>
			{problemContext?.problem?.content ? (
				<MarkdownRender>
					{problemContext.problem.content || 'No Description'}
				</MarkdownRender>
			) : (
				<Empty description={<span>No description for this problem!</span>} />
			)}
		</ShadowCard>
	)
}

export default Index
