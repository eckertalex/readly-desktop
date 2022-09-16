import {
	Grid,
	GridItem,
	List,
	ListItem,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Image,
	Button,
	ButtonProps,
} from '@chakra-ui/react'
import {NavItem} from 'epubjs'
import {Fragment} from 'react'
import shallow from 'zustand/shallow'
import {useEpubStore} from '../use-epub-store'
import {useModalStore} from './use-modal-store'

type TocItemsProps = {
	items: NavItem[]
	onLocationChange: (location?: string) => void
	buttonStyles?: ButtonProps
}

function TocItems(props: TocItemsProps) {
	const {items, onLocationChange, buttonStyles} = props

	return (
		<List color="gray.600">
			{items.map((item) => (
				<Fragment key={item.id}>
					<ListItem paddingX={1}>
						<Button
							width="full"
							justifyContent="flex-start"
							borderRadius="none"
							variant="ghost"
							borderBottomWidth={1}
							borderBottomStyle="solid"
							borderBottomColor="gray.400"
							{...buttonStyles}
							onClick={() => onLocationChange(item.href)}
						>
							{item.label}
						</Button>
					</ListItem>
					{!item.subitems?.length ? null : (
						<ListItem>
							<TocItems
								items={item.subitems}
								onLocationChange={onLocationChange}
								buttonStyles={{paddingLeft: 6, fontWeight: 'normal'}}
							/>
						</ListItem>
					)}
				</Fragment>
			))}
		</List>
	)
}

type TocModalProps = {
	onLocationChange: (location?: string) => void
}

export function TocModal(props: TocModalProps) {
	const {onLocationChange} = props
	const setOpenedModal = useModalStore((state) => state.setOpenedModal)
	const {toc, coverUrl, title} = useEpubStore(
		(state) => ({
			toc: state.toc,
			coverUrl: state.coverUrl,
			title: state.metadata?.title,
		}),
		shallow
	)

	return (
		<Modal onClose={() => setOpenedModal()} size="full" isOpen>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader color="gray.600">{title}</ModalHeader>
				<ModalCloseButton />
				<ModalBody padding="0">
					<Grid templateColumns="repeat(2, 1fr)" gap={6}>
						<GridItem display="flex" justifyContent="center" alignItems="center">
							<Image src={coverUrl} alt="Book Cover" height="90vh" objectFit="contain" />
						</GridItem>
						<GridItem overflowY="auto" height="90vh" paddingY={2}>
							<TocItems
								items={toc}
								onLocationChange={(location) => {
									onLocationChange(location)
									setOpenedModal()
								}}
							/>
						</GridItem>
					</Grid>
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}
