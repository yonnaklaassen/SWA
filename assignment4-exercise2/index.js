export function Warnings() {

    const retrieveData = (warning) => {
        let element = document.getElementById(`${warning.id}`)

        if (element === null) {
            addWarning(warning)
        } else {
            updateWarning(element, warning)
        }
    }

    const addWarning = (text) => {
        const li = document.createElement('li')
        li.setAttribute("id", `${text.id}`)
        document.querySelector('#warnings').appendChild(li)
        updateWarning(li, text)
    }
    const updateWarning = (element, newData) => {
        const a = document.createElement('a')
        a.innerText = JSON.stringify(newData)
        element.appendChild(a)
    }

    return {
        retrieveData, changeMinSeverity
    }
}
