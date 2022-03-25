import React from 'react'
import type {
	ProblemDetailWithLatestRecord,
	ProblemDetailWithLatestRecordResp
} from 'utils/service'

interface IProblemContextValue {
	problem: ProblemDetailWithLatestRecord | undefined
	loading: boolean
	refresh: () => Promise<ProblemDetailWithLatestRecordResp>
}

const ProblemContext = React.createContext<IProblemContextValue | undefined>(
	undefined
)

export default ProblemContext
