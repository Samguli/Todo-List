const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

function eventListeners() {
  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
  secondCardBody.addEventListener("click", deleteTodo);
  filter.addEventListener("keyup", filterTodo);
  clearButton.addEventListener("click", clearAllItems);
}
eventListeners();

function clearAllItems() {
  if (confirm("Are you sure to delete all tasks?")) {
    // todoList.innerHTML = ""; // slow action
    while (todoList.firstElementChild !== null) {
      todoList.removeChild(todoList.firstElementChild);
    }
    localStorage.removeItem("todos");
  }
}

function filterTodo(e) {
  //   console.log(e.target.value);
  const filterValue = e.target.value.toLowerCase();
  const listItems = document.querySelectorAll(".list-group-item");
  listItems.forEach((item) => {
    const text = item.textContent.toLowerCase();
    if (text.indexOf(filterValue) === -1) {
      item.setAttribute("style", "display: none !important");
    } else {
      item.setAttribute("style", "display: block");
    }
  });
}
function deleteTodo(e) {
  //   console.log(e.target);
  if (e.target.className === "fa fa-remove") {
    e.target.parentElement.parentElement.remove();
    deleteFromStorage(e.target.parentElement.parentElement.textContent);
    showAlert("success", "Your task was removed successfully");
  }
}

function deleteFromStorage(todo) {
  let todos = getTodosFromStorage();
  todos.forEach((item, index) => {
    if (todo === item) {
      todos.splice(index, 1);
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadAllTodosToUI() {
  let todos = getTodosFromStorage();
  todos.forEach((todo) => addTodoToUI(todo));
}

function addTodo(e) {
  const newTodo = todoInput.value.trim();

  if (newTodo === "") {
    showAlert("danger", "Can't add an empty item. Please fill the field!");
  } else {
    addTodoToUI(newTodo);
    addTodoToStorage(newTodo);
    showAlert("success", "Your task was added succesfully");
  }

  e.preventDefault();
}

function getTodosFromStorage() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

function addTodoToStorage(newTodo) {
  let todos = getTodosFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function showAlert(type, message) {
  const alert = document.createElement("div");
  alert.className = `alert alert-${type}`;
  alert.textContent = message;
  firstCardBody.appendChild(alert);
  setTimeout(() => {
    alert.remove();
  }, 1000);
}

function addTodoToUI(newTodo) {
  //list item
  const listItem = document.createElement("li");
  listItem.className = "list-group-item d-flex justify-content-between";
  // link element creation
  const link = document.createElement("a");
  link.href = "#";
  link.className = "delete-item";
  link.innerHTML = "<i class='fa fa-remove'></i>";
  // text node addition
  listItem.appendChild(document.createTextNode(newTodo));
  listItem.appendChild(link);
  todoList.appendChild(listItem);

  todoInput.value = "";
}
