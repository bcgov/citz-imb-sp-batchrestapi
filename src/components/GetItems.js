import React, { useEffect, useState } from "react"
import axios from "axios"
import ShowItemDetails from "./ShowItemDetails"

export default function GetItems({ listName, refresh }) {
	console.log('GetItems', listName, refresh)
	const [data, setData] = useState([])

	useEffect(() => {
		console.log('GetItems useEffect', refresh)
		axios
			.get(`http://localhost:8081/_api/web/lists/getByTitle('${listName}')/items`)
			.then(response => {
				console.log("items", response.data.value)
				setData(response.data.value)
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

		return () => { }
	}, [listName, refresh])
	return (
		<ul>
			{data.map((item, index) => {
				return (
					<li key={index}>
						{item.Title}
						<ShowItemDetails listName={listName} itemId={item.Id} />
					</li>
				)
			})}
		</ul>
	)
}
