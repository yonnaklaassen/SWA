class Client {

    async sendRequestGetResponse(path, f) {
        await fetch(`http://localhost:8080/${path}`,{method:"GET"})
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