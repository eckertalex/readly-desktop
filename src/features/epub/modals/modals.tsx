import {InfoModal} from './info-modal'
import {TocModal} from './toc-modal'
import {useModalStore} from './use-modal-store'

type ModalsProps = {
	onLocationChange: (location?: string) => void
}

export function Modals(props: ModalsProps) {
	const {onLocationChange} = props
	const openedModal = useModalStore((state) => state.openedModal)

	if (openedModal === 'toc') {
		return <TocModal onLocationChange={onLocationChange} />
	}

	if (openedModal === 'info') {
		return <InfoModal />
	}

	return null
}
