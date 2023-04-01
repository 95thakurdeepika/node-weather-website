

console.log('client side javascript file is loaded');

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) =>{
//         console.log(data)
//     })
// })

fetch('http://localhost:3000/weather?address=!').then((response) => {
    response.json().then((data) =>{
        if(data.error){
            console.log(data.error)
        }else{
            console.log(data.loc)
            console.log(data.forecast)
        }
    })
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#mssg-1')
const messageTwo = document.querySelector('#mssg-2')

// messageOne.textContent ='From Javascript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    console.log(location)

    messageOne.textContent ='Loading...'
    messageTwo.textContent =''
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) =>{
        if(data.error){
            // console.log(data.error)
            messageTwo.textContent = data.error
        }else{
            messageOne.textContent = data.loc
            messageTwo.textContent = data.forecast
            console.log(data.loc)
            console.log(data.forecast)
        }
    })
})
})