let inputs = []
let savedInputs = JSON.parse(localStorage.getItem("Leads"))
let inputField = document.getElementById('input-field')
const saveBtn = document.getElementById("save-btn")
const saveTabBtn = document.getElementById("savetab-btn")
const delBtn = document.getElementById("del-btn")
const display = document.getElementById("display-url")
const listUrl = document.getElementById('url-list')
const a = document.createElement('a')
const tabs = [
    { url: "https://fb.com" }
]
if (savedInputs) {
    inputs = savedInputs
    save(inputs)
}
delBtn.addEventListener("dblclick", () => {
    localStorage.clear()
    inputs = []
    save(inputs)
})
saveTabBtn.addEventListener("click", () => {
    chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
    }, function (tabs) {
        inputs.push(tabs[0].url)
        localStorage.setItem("Leads", JSON.stringify(inputs))
        save(inputs)
    });
})
saveBtn.addEventListener("click", () => {
    if (inputField.value) {
        inputs.push(inputField.value)
        inputField.value = null
        localStorage.setItem("Leads", JSON.stringify(inputs))
        save(inputs)
        console.log(localStorage.getItem("Leads"))
    }
})
function save(urls) {
    listUrl.innerHTML = ''
    for (i = 0; i < urls.length; i++) {
        listUrl.innerHTML += `<li>
    <a href='${urls[i]}' target= '_blank'>${urls[i]}</a>
    </li>`
    }

}