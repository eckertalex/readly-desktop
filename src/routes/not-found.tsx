import {Flex, Text, Link} from '@chakra-ui/react'
import {Link as RouterLink} from 'react-router-dom'

export default function NotFoundScreen() {
	return (
		<Flex boxSize="full" justifyContent="center" alignItems="center">
			<Text>
				Sorry... nothing here.{' '}
				<Link as={RouterLink} to="/">
					Go home
				</Link>
			</Text>
		</Flex>
	)
}
