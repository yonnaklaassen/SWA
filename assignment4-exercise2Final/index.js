export function Warnings(){
    let initBol = true

    const retrieveData = (message) =>{
        if(initBol){
            initData(message)
        }else {
            let json = JSON.parse(message.data)
            let element = document.getElementById(`${json.id}`)

            if (element === null) {
                addWarning(json)
            } else {
                updateWarning(element, json)
            }
        }
    }

    const initData = message => {
        let json = JSON.parse(message.data)

        json.warnings.forEach(warning => {addWarning(warning)})
        initBol = false
    }

    const addWarning = (text) => {
        const li = document.createElement('li')
        li.setAttribute("id", `${text.id}`)
        li.innerText = JSON.stringify(text)
        document.querySelector('#warnings').appendChild(li)
    }
    const updateWarning = (element, newData) => {
        const a = document.createElement('a')
        a.innerText = JSON.stringify(newData)
        element.appendChild(a)
    }

    return {
        retrieveData, warningsOnOff
    }
}
