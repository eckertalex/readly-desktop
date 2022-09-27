import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import HomeScreen, {loader as homeLoader} from './screens/home'
import ReadScreen, {loader as readLoader} from './screens/read'
import {FullPageErrorFallback} from './components/full-page-error-fallback'
import NotFoundScreen from './screens/not-found'
import LayoutScreen from './screens/layout'
import {FullPageSpinner} from './components/full-page-spinner'

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<LayoutScreen />} errorElement={<FullPageErrorFallback />}>
			<Route path="" element={<HomeScreen />} loader={homeLoader} />
			<Route path=":url" element={<ReadScreen />} loader={readLoader} />
			<Route path="*" element={<NotFoundScreen />} />
		</Route>
	)
)

if (import.meta.hot) {
	import.meta.hot.dispose(() => router.dispose())
}

export function App() {
	return <RouterProvider router={router} fallbackElement={<FullPageSpinner />} />
}
