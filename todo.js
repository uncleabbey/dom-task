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

    todos.forEach(todo => {
      if(todo.id === Number(id)) {
        if(todo.isComplete) {
          todo.isComplete = false;
        } 
        todo.isComplete = true;
      }
    });
    console.log(todos);
    localStorage.setItem('todos', JSON.stringify(todos));
  }
}

// handle ui Logic
const ui = {
  displayTodo: () => {
    const todos = store.getTodos();
    todos.forEach(todo => ui.addTodoToList(todo))
  },
  addTodoToList: (todo) => {
    const list = document.querySelector('.tbody');
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>
        <input type="checkbox" class="change" onchange=handleChange(${todo.id}); />
      </td>  
      <td id=${todo.id} class=${todo.isComplete}>${todo.title}</td>
      <td><button type="button" class="delete">X</button></td>
    `;

    list.appendChild(row);
  },
  removeTodo: (el) => {
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.remove()
    }
  },
  clearForm: () => {
    document.querySelector("#form-title").value = ''
  },
  markTodoComplete: (el) => {
    if(el.classList.contains('change')) {
      console.log(el.parentElement.nextElementSibling)
    }
  }
};

// display todos event
document.addEventListener('DOMContentLoaded', ui.displayTodo());


// Add todo event
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.querySelector("#form-title").value;
    
    const todo = todoObj(title);

    ui.addTodoToList(todo);

    store.addTodosToStore(todo)

    addForm.style.display = 'none';
  });


// remove todo event
document.querySelector('.tbody').addEventListener('click', (event) => {
  ui.removeTodo(event.target);
  store.removeTodoFromStore(event.target.parentElement.previousElementSibling.id)
});

const handleChange = (id) => {
  store.markTodoCompleteStore(id)
  document.location.reload(true);
}