// console.log('JS is sourced!');

/**
 * DOM elements of interest
 */
let tbody = document.getElementById("todoTbody");
let toDoTextInput = document.getElementById("toDoTextInput");


function onReady() {
    axios({
        method: "GET",
        url: `https://dustinhagstrom.codes/todos`,
    })
        .then((res) => {
            // console.log("data from response:", res.data);
            appendsTodosToTable(res.data);
        })
        .catch((err) => {
            console.log("whoops, there be an error in here");
            console.error(err);
        });
}

function appendsTodosToTable(arrayOfTodos) {
    // console.log("inside of appendsTodosToTable function");
    // console.log("arrayOfTodos:", arrayOfTodos);

    // reset the table
    tbody.innerHTML = "";

    for (let todo of arrayOfTodos) {
        // console.log("current todo:", todo);
        tbody.innerHTML += `
            <tr data-id="${todo.id}" data-testid="toDoItem" class="${
            todo.isComplete ? "completed" : "notCompleted"
        }">
            <td>${todo.text}</td>
            <td><button class="btn btn-dark" onclick="markCompleted(event)">${todo.isComplete ? "Mark Incomplete" : "Mark Complete"}</button></td>
            <td><button class="btn btn-dark" onclick="deleteTodo(event)">Delete</button></td>
            </tr>
        `;
    }
}

function createTodo(event) {
    //prevent default form behavior
    event.preventDefault();
    // console.log("inside of createTodo function");
    // console.log("createTodo event.target:", event.target);

    let text = toDoTextInput.value;
    axios({
        method: "POST",
        url: `https://dustinhagstrom.codes/todos`,
        data: { text },
    })
        .then((res) => {
            // console.log("successfully create a TODO!");
            // match UI state to DB state
            toDoTextInput.value = '';
            onReady();
        })
        .catch((err) => {
            console.log("Whoops, there be an error in here.");
            console.error(err);
        });
}

function markCompleted(event) {
    // console.log("inside of markCompleted function");
    // console.log("markCompleted event.target:", event.target);
    let rowId = event.target.closest("tr").dataset.id;
    // console.log("rowId to update:", rowId);
    axios({
        method: "PUT",
        url: `https://dustinhagstrom.codes/todos/toggleIsComplete/${rowId}`,
    })
        .then((res) => {
            // console.log(`successfully updated todo with id ${rowId}`);
            // match UI state to DB state
            onReady();
        })
        .catch((err) => {
            console.log("Whoops, there be an error in here.");
            console.error(err);
        });
}

function deleteTodo(event) {
    // console.log("inside of deleteTodo function");
    // console.log("deleteTodo event.target:", event.target);
    let rowId = event.target.closest("tr").dataset.id;
    // console.log("rowId to delete:", rowId);
    axios({
        method: "DELETE",
        url: `https://dustinhagstrom.codes/todos/deleteById/${rowId}`,
    })
        .then((res) => {
            // console.log(`successfully deleted todo with id ${rowId}`);
            // match UI state to DB state
            onReady();
        })
        .catch((err) => {
            console.log("Whoops, there be an error in here.");
            console.error(err);
        });
}

// call onReady() on load
onReady();
