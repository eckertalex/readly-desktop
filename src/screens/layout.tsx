import {Box, HStack, Spinner, Text} from '@chakra-ui/react'
import {Outlet, useNavigation} from 'react-router-dom'

export default function Layout() {
	const navigation = useNavigation()

	return (
		<Box as="main" boxSize="full" position="relative">
			<Outlet />
			{navigation.state === 'loading' ? (
				<HStack
					position="fixed"
					bottom={8}
					right={8}
					padding={4}
					alignItems="center"
					borderRadius="xl"
					backgroundColor="gray.100"
					zIndex="overlay"
					width={96}
					height={28}
				>
					<Spinner size="xl" thickness="4px" emptyColor="gray.200" color="green.300" minWidth={16} minHeight={16} />
					<Box>
						<Text fontSize="sm" fontWeight="semibold" color="gray.700">
							Loading
						</Text>
						<Text fontSize="xs" color="gray.500" noOfLines={1}>
							Path: {navigation.location?.pathname}
						</Text>
					</Box>
				</HStack>
			) : null}
		</Box>
	)
}
