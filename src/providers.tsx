import {ChakraProvider} from '@chakra-ui/react'

type AppProvidersProps = {
	children: React.ReactNode
}

export function AppProviders({children}: AppProvidersProps) {
	return <ChakraProvider>{children}</ChakraProvider>
}
