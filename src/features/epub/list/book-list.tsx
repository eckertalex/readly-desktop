import {Grid} from '@chakra-ui/react'
import {BookItem} from './book-item'
import {Book} from '../../../types'

type BookListProps = {
	books: Book[]
}

export function BookList(props: BookListProps) {
	const {books} = props

	return (
		<Grid padding={6} rowGap={4} columnGap={2} gridTemplateColumns="repeat(auto-fit, 192px)">
			{books.map((book) => (
				<BookItem key={book.file_name} book={book} />
			))}
		</Grid>
	)
}
