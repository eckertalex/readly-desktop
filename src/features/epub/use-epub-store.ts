import create from 'zustand'
import {persist} from 'zustand/middleware'
import {logger} from './zustand-logger'
import {NavItem} from 'epubjs'
import {PackagingMetadataObject} from 'epubjs/types/packaging'

type EpubState = {
	toc: NavItem[]
	location?: string
	metadata?: PackagingMetadataObject
	coverUrl?: string
	updateToc: (toc: NavItem[]) => void
	setLocation: (location?: string) => void
	setMetadata: (metadata?: PackagingMetadataObject) => void
	setCoverUrl: (coverUrl?: string) => void
}

export const useEpubStore = create<EpubState>()(
	logger(
		persist(
			(set, get) => ({
				toc: [],
				location: '2',
				updateToc: (toc) => {
					if (get().toc !== toc) {
						set(() => ({toc}), false)
					}
				},
				setLocation: (location) => {
					if (get().location !== location) {
						set(() => ({location}), false)
					}
				},
				setMetadata: (metadata) => {
					if (get().metadata !== metadata) {
						set(() => ({metadata}), false)
					}
				},
				setCoverUrl: (coverUrl) => {
					if (get().coverUrl !== coverUrl) {
						set(() => ({coverUrl}), false)
					}
				},
			}),
			{
				name: '__readly_epub_persist__',
			}
		)
	)
)
