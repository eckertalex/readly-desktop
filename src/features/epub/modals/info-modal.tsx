import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalOverlay,
	Image,
	Heading,
	Text,
	Stack,
	Flex,
	Spacer,
} from '@chakra-ui/react'
import shallow from 'zustand/shallow'
import {useEpubStore} from '../use-epub-store'
import {useModalStore} from './use-modal-store'

export function InfoModal() {
	const setOpenedModal = useModalStore((state) => state.setOpenedModal)
	const {coverUrl, metadata} = useEpubStore((state) => ({coverUrl: state.coverUrl, metadata: state.metadata}), shallow)

	return (
		<Modal onClose={() => setOpenedModal()} size="lg" isOpen>
			<ModalOverlay />
			<ModalContent minWidth="50vw" maxHeight="90vh">
				<ModalCloseButton />
				<ModalBody>
					<Stack direction={{base: 'column', xl: 'row'}}>
						<Image src={coverUrl} alt="Book Cover" maxHeight="33vh" objectFit="contain" />
						<Flex flexDirection="column">
							<Heading as="h2" fontSize="xl">
								{metadata?.title}
							</Heading>
							<Text color="gray.500" marginBottom={4}>
								<span>{metadata?.creator}</span>
								{metadata?.pubdate ? <span> — {new Date(metadata.pubdate).getFullYear()}</span> : ''}
							</Text>
							{metadata?.description ? <Text fontSize="lg">{metadata.description}</Text> : null}
							<Spacer />
							{metadata?.publisher ? <Text color="gray.500">Published by {metadata?.publisher}</Text> : null}
							{metadata?.rights ? (
								<Text color="gray.500" fontSize="sm">
									{metadata?.rights}
								</Text>
							) : null}
						</Flex>
					</Stack>
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}
