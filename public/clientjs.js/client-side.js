console.log('Client side js loaded')

const chatForm = document.querySelector('form')
const search = document.querySelector('input')
const resultArea = document.querySelector('#output')

chatForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const query = search.value
    resultArea.textContent = 'Loading...'

    console.log('/comm?userquery=' + encodeURIComponent(query))

    fetch('/comm?userquery=' + encodeURIComponent(query)).then((response) => {
        response.json().then((data) => {
            resultArea.textContent = data.message
        })
    })
})