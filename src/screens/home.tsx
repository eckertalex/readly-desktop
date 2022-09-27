import {invoke} from '@tauri-apps/api'
import {documentDir} from '@tauri-apps/api/path'
import {BookList} from '../features/epub/list/book-list'
import {FullPageSpinner} from '../components/full-page-spinner'
import {useLoaderData} from 'react-router-dom'
import {BaseDirectory, readBinaryFile} from '@tauri-apps/api/fs'
import {Book} from '../types'

async function getBooks() {
	const documentDirPath = await documentDir()
	const epubs = (await invoke('list_epubs', {path: documentDirPath + 'epubs2/'})) as Omit<Book, 'cover_data'>[]

	let books: Book[] = []
	for (let epub of epubs) {
		const cover_data = await readBinaryFile('epubs2/' + epub.cover_file_name, {dir: BaseDirectory.Document})
		books.push({
			...epub,
			cover_data,
		})
	}

	return books
}

export async function loader() {
	const books = await getBooks()
	return books
}

export default function HomeScreen() {
	const books = useLoaderData() as Book[]

	if (!books.length) {
		return <FullPageSpinner />
	}

	return <BookList books={books ?? []} />
}
