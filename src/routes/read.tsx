import {BaseDirectory, readBinaryFile} from '@tauri-apps/api/fs'
import {useLoaderData, LoaderFunctionArgs} from 'react-router-dom'
import {EpubReader} from '../features/epub/reader/epub-reader'

export async function loader({params}: LoaderFunctionArgs) {
	const {url} = params
	console.log('url', url)

	if (!url) {
		throw new Response('Not Found', {status: 404})
	}

	const contents = await readBinaryFile(`epubs/${url}`, {dir: BaseDirectory.Document})
	return contents
}

export default function Read() {
	const url = useLoaderData() as string

	return <EpubReader url={url} />
}
