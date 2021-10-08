const client = () => {
    const sendRequestGetResponse = (path, f) => {
        const request = new XMLHttpRequest()
        request.open('GET', `http://localhost:8080${path}`)
        request.send()
        request.onerror = () => {
            window.alert(request.status)
        }
        request.onload = () => {
            if (request.status != 200) {
                window.alert(request.status)
            }

            f(JSON.parse(request.responseText))
        }
    }

    return {sendRequestGetResponse}
}
export default client