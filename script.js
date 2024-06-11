let groceryInput = document.getElementById("grocery-input"); 
let submitGroceryItem = document.getElementById("submit-grocery-item"); 

function setGroceriesToLocalStorage(groceries) {
    localStorage.setItem("Groceries", JSON.stringify(groceries));
}

function getGroceriesFromLocalStorage() {
    let groceries = localStorage.getItem("Groceries");
    return groceries ? JSON.parse(groceries) : [];
}

function addToLocalStorage(grocery) {
    let groceries = getGroceriesFromLocalStorage();
    groceries.push(grocery);
    setGroceriesToLocalStorage(groceries);
}

function renderList(grocery, index) {
    let groceryList = document.getElementById("grocery-list"); 
    let div = document.createElement("div"); 
    div.className = "grocery-item";  
    div.dataset.index = index;

    div.innerHTML = `
        <h3>${grocery}</h3>
        <i class='fa fa-edit' style='font-size:24px' id="edit-grocery"></i>
        <i class='fa fa-trash-o' style='font-size:24px' id="remove-grocery"></i>
    `;

    let editIcon = div.querySelector('.fa-edit');
    let deleteIcon = div.querySelector('.fa-trash-o');

    editIcon.addEventListener('click', () => editGrocery(index));
    deleteIcon.addEventListener('click', () => removeGrocery(index));

    groceryList.append(div); 
}

function renderListFromLocalStorage() {
    let groceries = getGroceriesFromLocalStorage();
    let groceryList = document.getElementById("grocery-list"); 
    groceryList.innerHTML = ""; 

    groceries.forEach((grocery, index) => {
        renderList(grocery, index);
    });
}

function editGrocery(index) {
    let groceries = getGroceriesFromLocalStorage();
    let newGrocery = prompt("Edit the item:", groceries[index]);
    if (newGrocery !== null && newGrocery.trim() !== "") {
        groceries[index] = newGrocery.trim();
        setGroceriesToLocalStorage(groceries);
        renderListFromLocalStorage();
    }
}

function removeGrocery(index) {
    let groceries = getGroceriesFromLocalStorage();
    groceries.splice(index, 1);
    setGroceriesToLocalStorage(groceries);
    renderListFromLocalStorage();
}

function clearList() {
    localStorage.removeItem("Groceries");
    renderListFromLocalStorage();
}

submitGroceryItem.addEventListener("click", () => {
    let grocery = groceryInput.value;

    if (grocery.trim() !== "") {
        addToLocalStorage(grocery);
        renderList(grocery, getGroceriesFromLocalStorage().length - 1);
        groceryInput.value = ""; 
    }
});

renderListFromLocalStorage(); 

let clearItems = document.getElementById("clear-items"); 

clearItems.addEventListener("click", () => {

    clearList(); 

});

const toggleBtn = document.getElementById("toggle-btn");

toggleBtn.addEventListener("change", () => {

    document.body.classList.toggle("dark-mode", toggleBtn.checked);

});