import create from 'zustand'
import {logger} from '../zustand-logger'

type ModalTypes = 'info' | 'toc'

type ModalState = {
	openedModal?: ModalTypes
	setOpenedModal: (modal?: ModalTypes) => void
}

export const useModalStore = create<ModalState>()(
	logger((set) => ({
		setOpenedModal: (openedModal) => set(() => ({openedModal}), false),
	}))
)
