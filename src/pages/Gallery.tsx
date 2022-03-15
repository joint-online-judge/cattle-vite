import type { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'

export default function GalleryPage(): ReactElement {
	return (
		<div>
			<h1>Gallery</h1>
			<Outlet />
		</div>
	)
}
