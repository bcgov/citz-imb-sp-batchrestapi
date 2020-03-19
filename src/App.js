import React, { useContext, useState } from "react"
import "./App.css"
import RestAPI from "./components/RestAPI"
import {PageContext} from './components/PageContext'
import axios from 'axios'

function App() {
 const [pageContext, setPageContext] = useState(() => {
    axios
		.post({
			url: `http://localhost:8081/_api/contextinfo`,
			{"headers": { "Accept": 'application/json; odata=verbose' }}
		})
		.then(response => {
            console.log('contextinfo', response)
            return 'hello'
		})
		.catch(error => {
			console.groupCollapsed('Error Details')
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
				console.error('Error', error.message)
			}
			console.error(error.config)
			console.groupEnd()
		})
	return 'hello world'

})
 console.log("pageContext",pageContext)
	return <PageContext.Provider>
		{/* <RestAPI /> */}
	</PageContext.Provider>
}

export default App
