let elements = document.getElementsByClassName("block-to-check")
console.log(elements)

function throwError() {
    throw new Error("Deriv Vitaliy")
}

for (let element of elements){
    element.addEventListener("mouseout", ()=>{
        console.log("Hello world!")
        element.textContent="Hello world!"
    })
}