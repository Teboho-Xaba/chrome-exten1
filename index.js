let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn")
const tab = document.getElementById("save-tab")

const leadLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if(leadLocalStorage){
    myLeads = leadLocalStorage
    rendor(myLeads)
}

const tabs = [
    {url: "https://www.linkedin.com/in/per-herald-borgen/"}
]

tab.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        rendor(myLeads)
    })
})

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    rendor(myLeads)
})

inputBtn.addEventListener("click", function (){
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    rendor(myLeads);
})

function rendor(leads) {let listItems = "";
for (let i = 0; i < leads.length; i++){
    listItems += `
    <li> 
        <a href='${leads[i]}' target='_blank'> ${leads[i]} </a>
    </li>`;
}

ulEl.innerHTML = listItems;
}
