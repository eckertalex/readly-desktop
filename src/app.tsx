import {ChakraProvider} from '@chakra-ui/react'
import {lazy, Suspense} from 'react'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import {Fallback} from './routes/fallback'
import {Home, loader as homeLoader} from './routes/home'
import {Layout} from './routes/layout'
import Read, {loader as readLoader} from './routes/read'
import {RootErrorBoundary} from './routes/root-error-boundary'

// const Read = lazy(() => import('./routes/read'))
const NotFound = lazy(() => import('./routes/not-found'))

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Layout />} errorElement={<RootErrorBoundary />}>
			<Route path="" element={<Home />} loader={homeLoader} />
			<Route
				path=":url"
				loader={readLoader}
				element={
					// <Suspense fallback={<Fallback />}>
					<Read />
					// </Suspense>
				}
			/>
			<Route
				path="*"
				element={
					<Suspense fallback={<Fallback />}>
						<NotFound />
					</Suspense>
				}
			/>
		</Route>
	)
)

if (import.meta.hot) {
	import.meta.hot.dispose(() => router.dispose())
}

export function App() {
	return (
		<ChakraProvider>
			<RouterProvider router={router} fallbackElement={<Fallback />} />
		</ChakraProvider>
	)
}
