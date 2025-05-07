//choose a position
const dropdown = document.querySelector(".dropdown")
const showToggle = document.querySelector(".toggle")

dropdown.addEventListener("click", () => {
    showToggle.classList.toggle("hidden")
})

showToggle.querySelectorAll("li").forEach(item => {
    item.addEventListener("click", () => {
        dropdown.textContent = item.textContent;  
        showToggle.classList.add("hidden");  
    })
})

document.addEventListener("click", e => {
    if(!dropdown.contains(e.target) && !showToggle.contains(e.target)){
        showToggle.classList.add("hidden");
    }
})

//Choose file for CV
const inputfile = document.getElementById('inputfile')
const filename = document.getElementById('filename')

inputfile.addEventListener("change", () => {
    if(inputfile.files.length > 0){
        filename.textContent = inputfile.files[0].name;
    }else{
        filename.textContent = "No file choosen"
    }

})





