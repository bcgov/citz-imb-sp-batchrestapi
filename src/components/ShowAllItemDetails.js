import React, { useState, useEffect } from "react"
import axios from "axios"

export default function ShowAllItemDetails({ listName }) {
	console.log('ShowAllItemDetails', listName)
	const [details, setDetails] = useState(<div></div>)
	const clickHandler = () => {
		axios({
			url: `http://localhost:8081/_api/$batch`,
			method: "POST",
			headers: {
				"X-RequestDigest": document.getElementById("__REQUESTDIGEST").value,
				"Content-Type": 'multipart/mixed; boundary="batch_c3e7509c-3ae2-4791-969b-822ca75868f7"'
			},
			data:
				"--batch_c3e7509c-3ae2-4791-969b-822ca75868f7/r/n" +
				"Content-Type: application/http/r/n" +
				"Content-Transfer-Encoding: binary/r/n" +
				"/r/n" +
				"GET http://localhost:8081/_api/web/lists/getByTitle('calculations')/items HTTP/1.1/r/n" +
				"Accept: application/json;odata=verbose/r/n" +
				"/r/n" +
				"--batch_c3e7509c-3ae2-4791-969b-822ca75868f7"
		})
			.then(response => {
                console.log(`response`,response)
				setDetails(
					<div>
						<div>ID: {response.data.ID}</div>
						<div>Created: {response.data.Created}</div>
						<div>Modified: {response.data.Modified}</div>
					</div>
				)
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

	useEffect(() => {
		setDetails(
			<button id='showItems' type='button' onClick={clickHandler}>
				Show All Items
			</button>
		)
		return () => {}
	}, [])
	return <div>{details}</div>
}
