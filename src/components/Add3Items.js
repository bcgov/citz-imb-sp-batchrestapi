import React, { useContext } from 'react'
import axios from 'axios'
import { PageContext } from './PageContext'
import {GetFormDigestValue} from './utilities/SPContextInfo'

export default function Add3Items({
	listName,
	itemTitle,
	itemCreatedCallback
}) {
	console.log('Add3Items', listName, itemTitle, itemCreatedCallback)
	const pageContext = useContext(PageContext)

	const items = [`${itemTitle}_x`, `${itemTitle}_y`, `${itemTitle}_z`]

	const recursiveAxios = title => {
		axios.post(`http://localhost:8081/_api/web/lists/getbytitle('${listName}')/items`,
			{
				__metadata: { type: "response.data.value" },
				Title: title
			},
			{
				headers: {
					'X-RequestDigest': GetFormDigestValue("http://localhost:8081"),
					'Accept': 'application/json;odata=verbose',
					'Content-Type': 'application/json;odata=verbose'
				}
			}
		).then(response => {
			console.log('AddItem response', response)
			itemCreatedCallback(1)
		}).catch(error => {
			console.groupCollapsed("Error Details")
			if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				console.error(error.response.data)
				console.error(error.response.status)
				console.error(error.response.headers)
			} else if (error.request) {
				// The request was made but no response was received
				// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
				// http.ClientRequest in node.js
				console.error(error.request)
			} else {
				// Something happened in setting up the request that triggered an Error
				console.error("Error", error.message)
			}
			console.error(error.config)
			console.groupEnd()
		})
	}

	const clickHandler = () => {
		axios
			.get(
				`http://localhost:8081/_api/web/lists/getbytitle('${listName}')/listItemEntityTypeFullName`
			)
			.then(response => {

			})
			.catch(error => {
				console.groupCollapsed("Error Details")
				if (error.response) {
					// The request was made and the server responded with a status code
					// that falls out of the range of 2xx
					console.error(error.response.data)
					console.error(error.response.status)
					console.error(error.response.headers)
				} else if (error.request) {
					// The request was made but no response was received
					// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
					// http.ClientRequest in node.js
					console.error(error.request)
				} else {
					// Something happened in setting up the request that triggered an Error
					console.error("Error", error.message)
				}
				console.error(error.config)
				console.groupEnd()
			})
	}

	return (
		<button id='add3items' type='button' onClick={clickHandler}>
			Add 3 items - NO batch {pageContext}
		</button>
	)
}
