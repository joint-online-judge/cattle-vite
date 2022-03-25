import { UpsertProblemForm } from 'components/Problem/UpsertProblemForm'
import ShadowCard from 'components/ShadowCard'
import type React from 'react'
import { useContext } from 'react'
import { useParams } from 'umi'
import ProblemContext from '../context'

const Index: React.FC = () => {
	const { domainUrl } = useParams<{ domainUrl: string }>()
	const problemContext = useContext(ProblemContext)

	return (
		<ShadowCard>
			<UpsertProblemForm
				domainUrl={domainUrl}
				initialValues={problemContext?.problem}
				onUpdateSuccess={problemContext?.refresh}
			/>
		</ShadowCard>
	)
}

export default Index
