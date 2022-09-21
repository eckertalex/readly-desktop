import create from 'zustand'
import {logger} from './zustand-logger'
import {NavItem} from 'epubjs'
import {PackagingMetadataObject} from 'epubjs/types/packaging'

type Epub = {
	id: string
	toc: NavItem[]
	metadata: PackagingMetadataObject
	coverUrl?: string
}

type EpubListState = {
	epubs: Epub[]
	addEpub: (epub: Epub) => void
}

export const useEpubListStore = create<EpubListState>()(
	logger((set, get) => ({
		epubs: [],
		addEpub: (epub) => {
			const epubs = get().epubs
			if (epubs.findIndex((e) => e.id === epub.id) === -1) {
				set(() => ({epubs: [...epubs, epub]}))
			}
		},
	}))
)
