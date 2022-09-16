import {ChakraProvider} from '@chakra-ui/react'
import {lazy, Suspense} from 'react'
import {createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider} from 'react-router-dom'
import {Fallback} from './routes/fallback'
import {Layout} from './routes/layout'
import {RootErrorBoundary} from './routes/root-error-boundary'

const Read = lazy(() => import('./routes/read'))
const NotFound = lazy(() => import('./routes/not-found'))

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Layout />}>
			<Route path="" element={<Outlet />} errorElement={<RootErrorBoundary />}>
				<Route
					path="read"
					element={
						<Suspense fallback={<Fallback />}>
							<Read />
						</Suspense>
					}
				/>
			</Route>
			<Route path="*" element={<NotFound />} />
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
