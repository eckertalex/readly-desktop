import {Box, Text, Flex, AspectRatio, Tooltip} from '@chakra-ui/react'
import {Link as RouterLink} from 'react-router-dom'

type BookPlaceholderProps = {
	title?: string
	author?: string
}

const backgroundImage = `linear-gradient(
  90deg,
  hsl(211deg 25% 84%) 0%,
  hsl(212deg 25% 86%) 1%,
  hsl(212deg 25% 87%) 2%,
  hsl(212deg 25% 89%) 3%,
  hsl(212deg 25% 91%) 5%,
  hsl(212deg 25% 93%) 8%,
  hsl(212deg 25% 95%) 12%,
  hsl(212deg 25% 96%) 19%,
  hsl(212deg 25% 98%) 35%,
  hsl(0deg 0% 100%) 100%
);`

export function BookPlaceholder(props: BookPlaceholderProps) {
	const {title, author} = props

	return (
		<Tooltip label={`${title} by ${author}`} hasArrow placement="top">
			<AspectRatio ratio={1 / 1.6}>
				<Box
					as={RouterLink}
					to="read"
					backgroundImage={backgroundImage}
					borderWidth="1px"
					borderStyle="solid"
					borderColor="gray.300"
					aria-label={`${title} by ${author}`}
				>
					<Flex padding={4} boxSize="full" flexDirection="column" justifyContent="space-between" alignItems="center">
						<Text wordBreak="break-word" textAlign="center">
							{title}
						</Text>
						<Text wordBreak="break-word" textAlign="center">
							{author}
						</Text>
					</Flex>
				</Box>
			</AspectRatio>
		</Tooltip>
	)
}
