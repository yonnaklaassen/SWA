class Client {

    constructor() {
        this.url = "http://localhost:8080/"
    }

    async sendGetRequest(path, f) {
        await fetch(`${this.url}${path}`,{method:"GET"})
            .then(res => {
                if (res.ok)
                    return res
                else
                    return Promise.reject(res.statusText)
            })
            .then(res => res.json())
            .then(measurement => f(measurement))
    }

    async sendPostRequest(path, body){
        let response = await fetch(`${this.url}${path}`, {method: "POST", body: JSON.stringify(body)})
        if(!response.ok) window.alert("Something went wrong: "+response.statusText)
    }
}
export default Client