
// random integer for id
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const button = document.querySelector('.add-todo-btn');
const cancel = document.querySelector('.cancel');
const addForm = document.querySelector('.add-form');
const form = document.querySelector('#form');

    //  display form
button.onclick = () => {
    addForm.style.display = 'block';
  };
  // close form display
cancel.onclick = (e) => {
    addForm.style.display = 'none';
  };

  // close form display
  window.onclick = (e) => {
    if (e.target == addForm) {
      addForm.style.display = 'none';
    }
  };

// return todo object
const todoObj = (title) => {
  const data = {
      id: randomInteger(1, 1000),
      title,
      isComplete: false
  }
  return data;
}

// Handles locastorage logic

const store = {
  getTodos: () => {
    let todos;
    if(localStorage.getItem('todos') === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem('todos'));
    }
    return todos;
  },
  addTodosToStore: (todo) => {
    const todos = store.getTodos();
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
  },
  removeTodoFromStore: (id) => {
    const getTodos = store.getTodos();
    const todos = getTodos.filter(todo => todo.id !== Number(id));
    localStorage.setItem('todos', JSON.stringify(todos));
  },
  markTodoCompleteStore: (id) => {
    const todos = store.getTodos();
    todos.forEach((todo, index) => {
      if(todo.id === Number(id)) {
        todos[index].isComplete = !todos[index].isComplete
      }
    });
    localStorage.setItem('todos', JSON.stringify(todos));
  }
}

// handle ui Logic
class UI {
  constructor () {
    this.displayTodo()
  }
  displayTodo () {
    const todos = store.getTodos();
    todos.forEach(todo => this.addTodoToList(todo))
  };
  addTodoToList = (todo) => {
    const list = document.querySelector('.tbody');
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <input 
          type="checkbox" 
          class="change" 
          onchange="todo.handleChange(event, ${todo.id})"
          ${todo.isComplete ? "checked" : ""} 
          />
      </td>  
      <td id=${todo.id} class=${todo.isComplete}>${todo.title}</td>
      <td class="delete id"><a onclick="todo.removeTodo(event, ${todo.id})">X</a></td>
    `;

    list.appendChild(row);
  }
  removeTodo = (event, id) => {
    event.preventDefault();
    let el = event.target.parentElement;
    console.log(el.parentElement);
    if(el.classList.contains('delete')) {
      el.parentElement.remove()
    }
    store.removeTodoFromStore(id)
  }
  clearForm = () => {
    document.querySelector("#form-title").value = '';
  }
  handleChange = (event, id) => {
    let target = event.target.parentElement.nextElementSibling
    if(target.className === "false") {
      target.classList.remove("false")
      target.classList.add("true")
    } else {
      target.classList.remove("true")
      target.classList.add("false")
    }
    store.markTodoCompleteStore(id)
}
  addTodo = (event) => {
    event.preventDefault();
    const title = document.querySelector("#form-title").value;
    const todo = todoObj(title);
    this.addTodoToList(todo);
    this.clearForm()
    store.addTodosToStore(todo)
    addForm.style.display = 'none';
  }
};



// display todos event
let todo;
window.addEventListener('load', () => {
  todo =  new UI();
});

