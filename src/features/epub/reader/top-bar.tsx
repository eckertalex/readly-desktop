import {Flex, Heading, HStack, Icon, IconButton} from '@chakra-ui/react'
import {Menu as MenuIcon, Home as HomeIcon, Baseline as BaselineIcon, Info as InfoIcon} from 'lucide-react'
import {useEpubStore} from '../use-epub-store'
import shallow from 'zustand/shallow'
import {useModalStore} from '../modals/use-modal-store'
import {useSettingsStore} from '../use-settings-store'
import {Link as RouterLink} from 'react-router-dom'

type TopBarProps = {
	updateFontSize: (size: string) => void
	isLoading: boolean
}

export function TopBar(props: TopBarProps) {
	const {updateFontSize, isLoading} = props
	const title = useEpubStore((state) => state.metadata?.title)
	const setOpenedModal = useModalStore((state) => state.setOpenedModal)
	const {fontSize, setFontSize} = useSettingsStore(
		(state) => ({fontSize: state.fontSize, setFontSize: state.setFontSize}),
		shallow
	)

	function toggleFontSize() {
		const newFontSize = fontSize === 'sm' ? 'md' : fontSize === 'md' ? 'lg' : fontSize === 'lg' ? 'sm' : 'md'
		updateFontSize(
			newFontSize === 'sm' ? '80%' : newFontSize === 'md' ? '100%' : newFontSize === 'lg' ? '120%' : '100%'
		)
		setFontSize(newFontSize)
	}

	return (
		<Flex width="full" justifyContent="space-between" alignItems="center" paddingY={2} paddingX={4}>
			<IconButton
				as={RouterLink}
				to="/"
				variant="ghost"
				size="xs"
				icon={<Icon as={HomeIcon} boxSize={4} />}
				aria-label="Go to home"
			/>
			<Heading as="h1" fontSize="sm" fontWeight="normal" textAlign="center" color="gray.400">
				{isLoading ? 'Loading...' : title}
			</Heading>
			<HStack>
				<IconButton
					isLoading={isLoading}
					onClick={() => setOpenedModal('info')}
					variant="ghost"
					size="xs"
					icon={<Icon as={InfoIcon} boxSize={4} />}
					aria-label="Open Info"
				/>
				<IconButton
					isLoading={isLoading}
					onClick={toggleFontSize}
					variant="ghost"
					size="xs"
					icon={<Icon as={BaselineIcon} boxSize={4} />}
					aria-label="Toggle font size"
				/>
				<IconButton
					isLoading={isLoading}
					onClick={() => setOpenedModal('toc')}
					variant="ghost"
					size="xs"
					icon={<Icon as={MenuIcon} boxSize={4} />}
					aria-label="Open Table of Contents"
				/>
			</HStack>
		</Flex>
	)
}
