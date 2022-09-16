import {Box} from '@chakra-ui/react'
import {Outlet} from 'react-router-dom'

export function Layout() {
	return (
		<Box as="main" boxSize="full">
			<Outlet />
		</Box>
	)
}
