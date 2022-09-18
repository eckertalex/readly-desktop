import shallow from 'zustand/shallow'
import {useEpubStore} from '../use-epub-store'
import {Grid} from '@chakra-ui/react'
import {BookItem} from './book-item'

export function BookList() {
	const {coverUrl, metadata} = useEpubStore((state) => ({coverUrl: state.coverUrl, metadata: state.metadata}), shallow)

	return (
		<Grid padding={6} rowGap={4} columnGap={2} gridTemplateColumns="repeat(auto-fit, 192px)">
			<BookItem coverUrl={coverUrl} title={metadata?.title} author={metadata?.creator} />
		</Grid>
	)
}
