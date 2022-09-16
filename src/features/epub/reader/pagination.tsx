import {Icon, IconButton} from '@chakra-ui/react'
import {ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon} from 'lucide-react'

type PaginationProps = {
	prev: () => void
	next: () => void
	isLoading: boolean
}

export function Pagination(props: PaginationProps) {
	const {prev, next, isLoading} = props
	return (
		<>
			<IconButton
				onClick={prev}
				icon={<Icon as={ChevronLeftIcon} boxSize={12} />}
				variant="ghost"
				colorScheme="blackAlpha"
				size="lg"
				isLoading={isLoading}
				color="gray.400"
				height="auto"
				position="absolute"
				top="40px"
				bottom={0}
				left={0}
				borderLeftRadius="none"
				borderBottomRightRadius="none"
				aria-label="Previous page"
			/>
			<IconButton
				onClick={next}
				icon={<Icon as={ChevronRightIcon} boxSize={12} />}
				variant="ghost"
				colorScheme="blackAlpha"
				size="lg"
				isLoading={isLoading}
				color="gray.400"
				height="auto"
				position="absolute"
				top="40px"
				bottom={0}
				right={0}
				borderRightRadius="none"
				borderBottomLeftRadius="none"
				aria-label="Next page"
			/>
		</>
	)
}
