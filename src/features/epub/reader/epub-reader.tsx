import {Box, Flex, Spinner} from '@chakra-ui/react'
import {useEpub} from './use-epub'
import {TopBar} from './top-bar'
import {Pagination} from './pagination'
import {Modals} from '../modals/modals'
import {useCallback} from 'react'

type EpubReaderProps = {
	url: string
}

export function EpubReader(props: EpubReaderProps) {
	const {url} = props
	const [viewerRef, {isLoading, renditionRef}] = useEpub({url})

	const updateFontSize = useCallback((size: string) => renditionRef.current?.themes.fontSize(size), [renditionRef])
	const prev = useCallback(() => renditionRef.current?.prev(), [renditionRef])
	const next = useCallback(() => renditionRef.current?.next(), [renditionRef])
	const onLocationChange = useCallback((location?: string) => renditionRef.current?.display(location), [renditionRef])

	return (
		<Flex boxSize="full" flexDirection="column" position="relative">
			<TopBar updateFontSize={updateFontSize} isLoading={isLoading} />
			{isLoading ? (
				<Flex boxSize="full" flex={1} justifyContent="center" alignItems="center">
					<Spinner />
				</Flex>
			) : (
				<>
					<Box boxSize="full" flex={1} ref={viewerRef} />
				</>
			)}
			<Pagination prev={prev} next={next} isLoading={isLoading} />
			<Modals onLocationChange={onLocationChange} />
		</Flex>
	)
}
