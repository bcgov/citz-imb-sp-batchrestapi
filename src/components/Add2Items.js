import React from 'react'
import axios from 'axios'

export default function Add2Items({listName, itemTitle, itemCreatedCallback}) {
    console.log('Add2Items', listName, itemTitle, itemCreatedCallback)

    let itemsAsJson = []

    const generateUUID = () => {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
        });
        return uuid;
    };

    const clickHandler = () => {
        console.log("AddItem clickHandler", itemTitle)
        axios
            .get(
                `http://localhost:8081/_api/web/lists/getbytitle('${listName}')/listItemEntityTypeFullName`
            )
            .then(response => {
                console.log("listItemEntityTypeFullName", response.data)
                itemsAsJson = [{
                    __metadata: { type: response.data.value },
                    Title: itemTitle + '_a'
                },
                {
                    __metadata: { type: response.data.value },
                    Title: itemTitle + '_b'
                }]

                const batchGuid = generateUUID()
                let batchContents = []
                const changeSetId = generateUUID()


                const batchBody = () => {
                    const endpoint = `http://localhost:8081/_api/web/lists/getbytitle('${listName}')/items`
                    let tempArray = []
                    itemsAsJson.map(item => {
                        tempArray.push(`--changeset_${changeSetId}`)
                        tempArray.push(`Content-Type: application/http`)
                        tempArray.push(`Content-Transfer-Encoding: binary`)
                        tempArray.push(``)
                        tempArray.push(`POST ${endpoint} HTTP/1.1`)
                        tempArray.push(`Content-Type: application/json;odata:verbose`)
                        tempArray.push(``)
                        tempArray.push(JSON.stringify(itemsAsJson))
                        tempArray.push(``)
                    })
                    tempArray.push(`--changeset_${changeSetId}`)

                    return tempArray.join(`/r/n`)
                }
                console.log('Add2Items batchBody', batchBody())

                axios.post(`http://localhost:8081/_api/$batch`,
                    batchBody(),
                    {
                        headers: {
                            'X-RequestDigest': document.getElementById("__REQUESTDIGEST").value,
                            'Content-Type': 'multipart/mixed;boundary="batch_' + batchGuid + '"'
                        }
                    }
                ).then(response => {
                    console.log('Add2Items response', response)
                    //itemCreatedCallback(1)
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
        <button id='add2items' type='button' onClick={clickHandler}>
            Add 2 items - batch
        </button>
    )
}
