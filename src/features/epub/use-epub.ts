import Epub, {Book, Rendition} from 'epubjs'
import {useCallback, useEffect, useRef, useState} from 'react'
import shallow from 'zustand/shallow'
import {useEpubStore} from './use-epub-store'

type Options = {
	url: string
}

type Location = {
	index: number
	start: string
	end: string
	href: string
	percentage: number
}

export function useEpub(options: Options) {
	const {url} = options
	const bookRef = useRef<Book>()
	const renditionRef = useRef<Rendition>()
	const viewerRef = useRef<HTMLDivElement>(null)
	const [isLoading, setLoading] = useState(true)
	const {updateToc, location, setLocation, setMetadata, setCoverUrl} = useEpubStore(
		(state) => ({
			updateToc: state.updateToc,
			location: state.location,
			setLocation: state.setLocation,
			setMetadata: state.setMetadata,
			setCoverUrl: state.setCoverUrl,
		}),
		shallow
	)

	const loadEpub = useCallback(() => {
		if (bookRef.current) {
			bookRef.current.destroy()
		}

		bookRef.current = Epub(url, {})

		bookRef.current.opened.then(() => {
			setLoading(false)
		})

		bookRef.current?.loaded.metadata.then((metadata) => {
			setMetadata(metadata)
		})

		bookRef.current?.coverUrl().then((coverUrl) => {
			setCoverUrl(coverUrl ?? undefined)
		})

		bookRef.current?.loaded.navigation.then(({toc}) => {
			updateToc(toc)
		})
	}, [url, setMetadata, setCoverUrl, updateToc])

	const locationChange = useCallback(
		(loc: Location) => {
			setLocation(loc.start)
		},
		[setLocation]
	)

	const handleKeyPress = (event: KeyboardEvent) => {
		if (event.key === 'ArrowLeft') {
			renditionRef.current?.prev()
		}
		if (event.key === 'ArrowRight') {
			renditionRef.current?.next()
		}
	}

	const renderEpub = useCallback(() => {
		if (isLoading || !viewerRef.current) {
			return
		}
		if (renditionRef.current) {
			renditionRef.current.destroy()
		}

		renditionRef.current = bookRef.current?.renderTo(viewerRef.current, {
			height: '100%',
			width: '100%',
		})

		if (!renditionRef.current) {
			return
		}

		renditionRef.current?.on('locationChanged', locationChange)
		renditionRef.current?.on('keyup', handleKeyPress)

		if (typeof location === 'string') {
			renditionRef.current.display(location)
		} else if (typeof location === 'number') {
			renditionRef.current.display(location)
		} else {
			renditionRef.current.display()
		}

		return () => {
			// renditionRef.current?.off('locationChanged', locationChange)
			renditionRef.current?.off('keyup', handleKeyPress)
		}
	}, [isLoading, location, locationChange])

	useEffect(() => {
		loadEpub()

		return () => {
			if (bookRef.current) {
				bookRef.current.destroy()
			}
		}
	}, [loadEpub])

	useEffect(() => {
		renderEpub()

		return () => {
			if (renditionRef.current) {
				renditionRef.current.destroy()
			}
		}
	}, [renderEpub])

	useEffect(() => {
		if (!renditionRef.current) {
			return
		}

		if (typeof location === 'string') {
			renditionRef.current.display(location)
		} else if (typeof location === 'number') {
			renditionRef.current.display(location)
		} else {
			renditionRef.current.display()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		document.addEventListener('keyup', handleKeyPress, false)
		return () => {
			document.removeEventListener('keyup', handleKeyPress, false)
		}
	}, [])

	return [
		viewerRef,
		{
			isLoading,
			renditionRef,
		},
	] as const
}
