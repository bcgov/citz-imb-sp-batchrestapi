import React, { useEffect, useContext, useState } from 'react'
import './App.css'
import RestAPI from './components/RestAPI'
import { PageContext } from './components/PageContext'
import axios from 'axios'

function App() {
	const [pageContext, setPageContext] = useState({})

	useEffect(() => {
		fetch(`http://localhost:8081/_api/contextinfo`, { method: 'POST' })
			.then(response => {
				console.log(`response`, response)
				return response.json()
			})
			.then(data => {
				console.log(data.d.GetContextWebInformation)
				setPageContext(data.d.GetContextWebInformation)
			})

		return () => {
			setPageContext({})
		}
	}, [])

	return (
		<PageContext.Provider>
			{/* <RestAPI /> */}
			{pageContext.FormDigestValue}
		</PageContext.Provider>
	)
}

export default App
