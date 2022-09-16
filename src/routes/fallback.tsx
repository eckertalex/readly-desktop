import {Flex, Spinner} from '@chakra-ui/react'

export function Fallback() {
	return (
		<Flex boxSize="full" justifyContent="center" alignItems="center">
			<Spinner thickness="4px" emptyColor="gray.200" color="blue.500" size="xl" />
		</Flex>
	)
}
