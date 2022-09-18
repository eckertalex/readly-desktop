import {Image, Tooltip} from '@chakra-ui/react'
import {Link as RouterLink} from 'react-router-dom'
import {BookPlaceholder} from './book-placeholder'

type BookItemProps = {
	coverUrl?: string
	title?: string
	author?: string
}

export function BookItem(props: BookItemProps) {
	const {coverUrl, title, author} = props

	if (!coverUrl) {
		return <BookPlaceholder title={title} author={author} />
	}

	return (
		<RouterLink to="read">
			<Tooltip label={`${title} by ${author}`} hasArrow placement="top">
				<Image src={coverUrl} alt={`${title} by ${author}`} objectFit="contain" />
			</Tooltip>
		</RouterLink>
	)
}
