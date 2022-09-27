import {BaseDirectory, readBinaryFile} from '@tauri-apps/api/fs'
import {LoaderFunctionArgs, useLoaderData} from 'react-router-dom'
import {EpubReader} from '../features/epub/reader/epub-reader'

async function readEbook(url: string) {
	const contents = await readBinaryFile(`epubs2/${url}`, {dir: BaseDirectory.Document})
	return contents
}

export async function loader({params}: LoaderFunctionArgs) {
	const {url} = params
	if (!url) {
		throw new Response('Not found', {status: 404})
	}

	const contents = await readEbook(url)
	return contents.buffer
}

export default function ReadScreen() {
	const buffer = useLoaderData() as ArrayBuffer

	return <EpubReader buffer={buffer ?? ''} />
}
