import {Stack, Text, Link} from '@chakra-ui/react'
import {Link as RouterLink} from 'react-router-dom'

export default function NotFoundScreen() {
	return (
		<Stack boxSize="full" justifyContent="center" alignItems="center">
			<Text>Sorry... nothing here.</Text>
			<Link as={RouterLink} to="/">
				Go home
			</Link>
		</Stack>
	)
}
