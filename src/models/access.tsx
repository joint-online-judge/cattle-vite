import type { FC } from 'react'
import { createContext, useContext, useMemo } from 'react'
import { AuthContext } from './auth'
import { DomainContext } from './domain'

export interface AccessContextValue {
	// Site Permissions
	authenticated: boolean
	isRoot: boolean
	accepted: boolean
	denied: boolean
	// Domain Permissions
	canCreateProblemSet: boolean
	canCreateProblem: boolean
}

const AccessContext = createContext<AccessContextValue>({
	authenticated: false,
	isRoot: false,
	accepted: true,
	denied: false,
	canCreateProblem: false,
	canCreateProblemSet: false
})

const AccessContextProvider: FC = ({ children }) => {
	const { permission } = useContext(DomainContext)
	const { user } = useContext(AuthContext)

	const value = useMemo(
		() => ({
			// Site Permissions
			authenticated: Boolean(user?.sub && user.category === 'user'),
			isRoot: user?.role === 'root',
			accepted: true,
			denied: false,
			// Domain Permissions
			canCreateProblemSet: permission?.problemSet?.create === true,
			canCreateProblem: permission?.problem?.create === true
		}),
		[user, permission]
	)

	return (
		<AccessContext.Provider value={value}>{children}</AccessContext.Provider>
	)
}

export { AccessContext, AccessContextProvider }
