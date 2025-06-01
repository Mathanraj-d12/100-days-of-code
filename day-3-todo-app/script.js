const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskText = input.value.trim();
  if (taskText !== '') {
    addTask(taskText);
    input.value = '';
  }
});

function addTask(task) {
  const li = document.createElement('li');
  li.innerHTML = `
    ${task}
    <button onclick="removeTask(this)">X</button>
  `;
  list.appendChild(li);
}

function removeTask(button) {
  button.parentElement.remove();
}
