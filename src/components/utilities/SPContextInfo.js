export const GetFormDigestValue = url => {
    return new Promise((resolve, reject) => {
        fetch(`${url}/_api/contextinfo`, { method: 'POST' })
            .then(response => {
                return response.json()
            })
            .then(data => {
                resolve (data.d.GetContextWebInformation.FormDigestValue)
            })
            .catch(error => {
                console.log(error)
                reject(error)
            })
    })





}
