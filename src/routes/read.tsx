import {EpubReader} from '../features/epub/reader/epub-reader'

const EPUB_FILE = '/Way of Kings (The Stormlight Archive, Book 1), The - Brandon Sanderson.epub'
// const EPUB_FILE = '/alice.epub'

export default function Read() {
	return <EpubReader url={EPUB_FILE} />
}
