import {BaseDirectory, FileEntry, readBinaryFile, readDir} from '@tauri-apps/api/fs'
import {useLoaderData} from 'react-router-dom'
import {BookList} from '../features/epub/list/book-list'
import {Fallback} from './fallback'

async function readContents(entries: FileEntry[]) {
	let ebooks = []

	for (let entry of entries) {
		const contents = await readBinaryFile(entry.path, {dir: BaseDirectory.Document})
		console.log('entry', entry.name)
		ebooks.push({name: entry.name, contents})
	}

	return ebooks
}

async function loadBooks() {
	const entries = await readDir('epubs', {dir: BaseDirectory.Document, recursive: true})
	console.log(
		'entries',
		entries.map(({name}) => name)
	)
	const books = await readContents(entries)
	return books
}

export async function loader() {
	const books = await loadBooks()
	console.log('books', books)
	return books
}

export function Home() {
	const books = useLoaderData() as {name: string; contents: Uint8Array}[]
	console.log('books react', books)

	if (!books?.length) {
		return <Fallback />
	}

	return <BookList books={books} />
}
