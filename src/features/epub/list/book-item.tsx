import {Flex, Image, Tooltip} from '@chakra-ui/react'
import {Link as RouterLink} from 'react-router-dom'
import {BookPlaceholderImage} from './book-placeholder'
import {Book} from '../../../types'

type BookItemProps = {
	book: Book
}

function toPng(a: Uint8Array) {
	const blob = new Blob([a], {type: 'image/png'})
	// this needs to be revoked using URL.createObjectURL
	// https://javascript.info/blob
	const imageUrl = URL.createObjectURL(blob)
	return imageUrl
}

export function BookItem(props: BookItemProps) {
	const {book} = props

	return (
		<Tooltip label={`${book.title} by ${book.author}`} hasArrow placement="top">
			<Flex alignItems="flex-end" as={RouterLink} to={book.file_name}>
				{book.cover_data ? (
					<Image src={toPng(book.cover_data)} alt={`${book.title} by ${book.author}`} objectFit="contain" />
				) : (
					<BookPlaceholderImage title={book.title} author={book.author} />
				)}
			</Flex>
		</Tooltip>
	)
}
