import React from "react"
import axios from "axios"

export default function AddItem({ listName, itemTitle, itemCreatedCallback }) {
	const clickHandler = () => {
		console.log("clicked")
		axios
			.post(
				`http://localhost:8081/_api/web/lists/getbytitle('${listName}')/items`,
				{ __metadata: { type: "SP.Data" }, Title: itemTitle },
				{
					headers: {
						accept: "application/json;odata=verbose",
						"X-RequestDigest": document.getElementById("__REQUESTDIGEST").value,
						"content-type": "application/json;odata=verbose"
					}
				}
			)
			.then(response => {
				console.log("/lists/getbyname(${listName})/items", response.data)
				itemCreatedCallback()
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
		<button id='add1item' type='button' onClick={clickHandler}>
			Add 1 item
		</button>
	)
}
