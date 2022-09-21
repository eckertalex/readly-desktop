import Epub, {Book, NavItem} from 'epubjs'
import {PackagingMetadataObject} from 'epubjs/types/packaging'
import {useCallback, useEffect, useRef, useState} from 'react'
import {useEpubListStore} from './use-epub-list-store'

type Options = {
	url: string | ArrayBuffer
}

export function useLoadEpub(options: Options) {
	const {url} = options
	const bookRef = useRef<Book>()
	const [isLoading, setLoading] = useState(true)
	const [id, setId] = useState<string | undefined>()
	const [coverUrl, setCoverUrl] = useState<string | undefined>()
	const [toc, setToc] = useState<NavItem[]>([])
	const [metadata, setMetadata] = useState<PackagingMetadataObject | undefined>()
	const addEpub = useEpubListStore((state) => state.addEpub)

	const loadEpub = useCallback(() => {
		if (bookRef.current) {
			bookRef.current.destroy()
		}

		bookRef.current = Epub(url, {})

		bookRef.current.opened.then(() => {
			setLoading(false)
		})

		bookRef.current?.loaded.metadata.then((metadata) => {
			setId(metadata.identifier)
			setMetadata(metadata)
		})

		bookRef.current?.coverUrl().then((coverUrl) => {
			setCoverUrl(coverUrl ?? undefined)
		})

		bookRef.current?.loaded.navigation.then(({toc}) => {
			setToc(toc)
		})
	}, [url])

	useEffect(() => {
		loadEpub()

		return () => {
			if (bookRef.current) {
				bookRef.current.destroy()
			}
		}
	}, [loadEpub])

	useEffect(() => {
		if (isLoading) {
			return
		}
		if (!id || !metadata) {
			return
		}

		addEpub({
			id,
			toc,
			metadata,
			coverUrl,
		})

		return () => {}
	}, [addEpub, coverUrl, id, isLoading, metadata, toc])

	return {
		id,
		title: metadata?.title,
		author: metadata?.creator,
		coverUrl,
		metadata,
		toc,
	}
}
