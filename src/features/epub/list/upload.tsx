import {useState} from 'react'
import {useEpub} from '../use-epub'

export function Upload() {
	const [ebook, setEbook] = useState<string>('')

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		const files = Array.prototype.slice.call(event.target.files)
		Promise.all(
			files.map(
				(file) =>
					new Promise((resolve) => {
						let reader = new FileReader()
						reader.onload = (result) => {
							resolve([result, file])
						}
						reader.readAsArrayBuffer(file)
					})
			)
		).then((zippedResults) => {
			if (zippedResults.length > 0) {
				const [e] = zippedResults[0]
				setEbook(e.target.result)
			}
		})
	}

	useEpub({url: ebook})

	return (
		<>
			<label htmlFor="ebook">Choose an ebook!</label>
			<input type="file" id="ebook" name="ebook" accept="application/epub+zip" onChange={handleChange} />
		</>
	)
}
