import {Button, Code, Stack, Text} from '@chakra-ui/react'
import {useRouteError} from 'react-router-dom'

export function RootErrorBoundary() {
	let error = useRouteError() as Error

	return (
		<Stack role="alert" height="100vh" direction="column" alignItems="center" justifyContent="center">
			<Text color="red.400" fontSize="lg">
				Uh oh... There's a problem. Try refreshing the app.
			</Text>
			<Code colorScheme="red" as="pre">
				{error.message || JSON.stringify(error)}
			</Code>
			<Button onClick={() => (window.location.href = '/')}>Click here to reload the app</Button>
		</Stack>
	)
}
