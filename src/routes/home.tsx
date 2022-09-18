import {BookList} from '../features/epub/list/book-list'
import {Upload} from '../features/epub/list/upload'

export function Home() {
	return (
		<>
			<Upload />
			<BookList />
		</>
	)
}
