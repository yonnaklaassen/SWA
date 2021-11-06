class Client {

    constructor() {
        this.request = new XMLHttpRequest()
    }

    sendRequestGetResponse(path, f) {
        fetch(`http://localhost:8080/${path}`,)
            .then(res => {
                if (res.ok)
                    return res
                else
                    return Promise.reject(res.statusText)
            })
            .then(res => res.json())
            .then(measurement => f(measurement))
    }
}
export default Client