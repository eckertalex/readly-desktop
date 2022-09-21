import {Grid} from '@chakra-ui/react'
import {BookItem} from './book-item'

type BookListProps = {
	books: {
		name: string
		contents: Uint8Array
	}[]
}

export function BookList(props: BookListProps) {
	const {books} = props
	return (
		<Grid padding={6} rowGap={4} columnGap={2} gridTemplateColumns="repeat(auto-fit, 192px)">
			{books.map((book) => (
				<BookItem key={book.name} url={book.contents.buffer} name={book.name} />
			))}
		</Grid>
	)
}
