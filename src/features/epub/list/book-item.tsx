import {Image, Tooltip} from '@chakra-ui/react'
import {Link as RouterLink} from 'react-router-dom'
import {useLoadEpub} from '../use-load-epub'
import {BookPlaceholder} from './book-placeholder'

type BookItemProps = {
	url: ArrayBuffer
	name: string
}

export function BookItem(props: BookItemProps) {
	const {url, name} = props
	const {title, author, coverUrl} = useLoadEpub({url})

	if (!coverUrl) {
		return <BookPlaceholder title={title} author={author} />
	}

	return (
		<RouterLink to={name}>
			<Tooltip label={`${title} by ${author}`} hasArrow placement="top">
				<Image src={coverUrl} alt={`${title} by ${author}`} objectFit="contain" />
			</Tooltip>
		</RouterLink>
	)
}
