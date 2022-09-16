import ReactDOM from 'react-dom/client'
import {StrictMode, useDebugValue, useEffect, useRef, useState} from 'react'
import {
	ChakraProvider,
	Box,
	Tooltip,
	Button,
	Icon,
	Tabs,
	TabList,
	Tab,
	TabPanels,
	TabPanel,
	Grid,
	FormControl,
	Checkbox,
	DarkMode,
	theme,
} from '@chakra-ui/react'
import {Wrench as WrenchIcon} from 'lucide-react'

function install() {
	function DevTools() {
		const [rootRef, isHovering] = useHover<HTMLDivElement>()
		const [persist, setPersist] = useLocalStorageState('__readly_devtools_persist__', false)
		const show = persist || isHovering
		const [tabIndex, setTabIndex] = useLocalStorageState('__readly_devtools_tab_index__', 0)
		const togglePersist = () => {
			setPersist((v) => !v)
		}

		useEffect(() => {
			const appRoot = document.getElementById('root')
			if (isHovering || persist) {
				appRoot?.setAttribute('style', 'margin-bottom: 50vh')
			} else {
				appRoot?.style.removeProperty('margin-bottom')
			}
		}, [persist, isHovering])

		return (
			<ChakraProvider theme={theme}>
				<DarkMode>
					<Box position="fixed" bottom={-4} left={0} right={0}>
						<Box
							ref={rootRef}
							background="blue.900"
							opacity={show ? '1' : '0'}
							boxSizing="content-box"
							height={show ? '50vh' : 16}
							width="full"
							transition="all 0.3s"
							overflow="scroll"
						>
							<Tooltip label="Toggle Persist DevTools">
								<Button
									display="flex"
									position="absolute"
									color="white"
									colorScheme="blue"
									backgroundColor="blue.900"
									_hover={{}}
									_active={{}}
									_focus={{}}
									alignItems="center"
									fontSize="1.2rem"
									border="none"
									paddingX={2}
									paddingY={4}
									marginTop={-10}
									marginLeft={5}
									overflow="hidden"
									roundedBottom="none"
									_before={{
										content: '""',
										position: 'absolute',
										height: 1,
										width: 'full',
										left: 0,
										top: 0,
										background: persist ? 'yellow.300' : 'transparent',
									}}
									onClick={togglePersist}
									leftIcon={<Icon as={WrenchIcon} color={persist ? 'white' : 'gray.300'} />}
								>
									readly DevTools
								</Button>
							</Tooltip>
							{show ? (
								<Tabs index={tabIndex} onChange={(i) => setTabIndex(i)} color="white">
									<TabList borderBottomColor="whiteAlpha.300">
										<Tab>Controls</Tab>
									</TabList>
									<TabPanels>
										<TabPanel>
											<ControlsPanel />
										</TabPanel>
									</TabPanels>
								</Tabs>
							) : null}
						</Box>
					</Box>
				</DarkMode>
			</ChakraProvider>
		)
	}

	// add dev tools UI to the page
	const devToolsRoot = document.createElement('div')
	document.body.appendChild(devToolsRoot)
	ReactDOM.createRoot(devToolsRoot).render(
		<StrictMode>
			<DevTools />
		</StrictMode>
	)
}

function ControlsPanel() {
	return (
		<Grid
			gridTemplateColumns="1fr"
			gridTemplateRows="repeat(auto-fill, minmax(40px, 40px) )"
			gridGap={2}
			marginRight={6}
		>
			<EnableDevTools />
			<ClearLocalStorage />
		</Grid>
	)
}

function EnableDevTools() {
	const [enableDevTools, setEnableDevTools] = useLocalStorageState('dev-tools', process.env.NODE_ENV === 'development')

	return (
		<FormControl id="enableDevTools" display="flex" alignItems="center" width="full">
			<Checkbox
				isChecked={enableDevTools}
				colorScheme="yellow"
				onChange={(event) => {
					setEnableDevTools(event.target.checked)
				}}
			>
				Enable DevTools by default
			</Checkbox>
		</FormControl>
	)
}

function ClearLocalStorage() {
	function clear() {
		window.localStorage.clear()
		window.location.assign(window.location.toString())
	}
	return <Button onClick={clear}>Purge Database</Button>
}

function useLocalStorageState<DataType>(key: string, defaultValue: DataType) {
	const [state, setState] = useState<DataType>(() => {
		const valueInLocalStorage = window.localStorage.getItem(key)
		if (valueInLocalStorage) {
			return JSON.parse(valueInLocalStorage)
		}
		return typeof defaultValue === 'function' ? defaultValue() : defaultValue
	})

	useDebugValue(`${key}: ${JSON.stringify(state)}`)

	const prevKeyRef = useRef(key)

	useEffect(() => {
		const prevKey = prevKeyRef.current
		if (prevKey !== key) {
			window.localStorage.removeItem(prevKey)
		}
		prevKeyRef.current = key
	}, [key])

	useEffect(() => {
		window.localStorage.setItem(key, JSON.stringify(state))
	}, [key, state])

	return [state, setState] as const
}

function useHover<RefType extends HTMLDivElement>() {
	const [isHovering, setHovering] = useState(false)
	const ref = useRef<RefType>(null)
	const timerRef = useRef<number>()

	useEffect(() => {
		function handleMouseOver() {
			if (timerRef.current) {
				clearTimeout(timerRef.current)
			}

			timerRef.current = window.setTimeout(() => {
				setHovering(true)
			}, 0)
		}

		function handleMouseOut() {
			if (timerRef.current) {
				clearTimeout(timerRef.current)
			}

			timerRef.current = window.setTimeout(() => {
				setHovering(false)
			}, 0)
		}

		const node = ref.current
		if (node) {
			node.addEventListener('mouseover', handleMouseOver)
			node.addEventListener('mouseout', handleMouseOut)
		}

		return () => {
			if (node) {
				node.removeEventListener('mouseover', handleMouseOver)
				node.removeEventListener('mouseout', handleMouseOut)
			}
		}
	}, [])

	return [ref, isHovering] as const
}

export {install}
