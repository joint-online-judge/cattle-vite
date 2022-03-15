import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

const Gallery = lazy(async () => import('pages/Gallery'))
const Details = lazy(async () => import('pages/Details'))
const NotFound = lazy(async () => import('pages/NotFound'))

const routes: RouteObject[] = [
	{
		path: '/',
		element: <Gallery />,
		children: [
			{
				path: ':domainUrl',
				element: <Details />,
				children: [
					{
						path: 'problem',
						element: <Details />,
						children: [
							{
								path: ':problemId',
								element: <Details />
							}
						]
					}
				]
			}
		]
	},
	{ path: '*', element: <NotFound /> }
]

export default routes
