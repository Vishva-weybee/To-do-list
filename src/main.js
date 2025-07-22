// Selectors
const addListBtn = document.querySelector('.add-btn');
const listContainer = document.getElementById('list-container');
const searchInput = document.getElementById('global-search');
const filterSelect = document.getElementById('global-filter');
const sortSelect = document.getElementById('global-sort');
const selectionActions = document.getElementById('selection-actions');

let colorIndex = 0;
let allTaskLists = [];


function createTaskList(title = 'New List') {
  const card = document.createElement('div');
  card.className = 'task-card';

  const backgroundColors = ['#FFF6E7', '#E5FFE6', '#F3E4F7', '#EDBBB4', '#ECECEC'];
  card.style.backgroundColor = backgroundColors[colorIndex % backgroundColors.length];
  colorIndex++;

  const listData = { id: Date.now(), title, tasks: [] };
  allTaskLists.push(listData);

  const header = document.createElement('div');
  header.className = 'task-card-header';

  // Wrapper to hold heading and date (vertically stacked)
  const headingWrapper = document.createElement('div');

  const heading = document.createElement('h2');
  heading.textContent = title;
  heading.contentEditable = true;
  heading.spellcheck = false;
  heading.className = 'list-heading';
  heading.addEventListener('input', () => listData.title = heading.textContent);


const day = document.createElement('div');
day.className = 'day-with-actions';

// Date section
const dateSection = document.createElement('div');
dateSection.className = 'day';

const calendar = document.createElement('img');
calendar.src = '/images/calendar.png';
calendar.alt = 'Calendar icon';
dateSection.appendChild(calendar);

const date = document.createElement('p');
date.textContent = formatDateText(new Date());
dateSection.appendChild(date);

// Actions section
const actions = document.createElement('div');
actions.className = 'task-actions';

// Delete Selected
const deleteSelected = document.createElement('img');
deleteSelected.src = '/images/delete-selected.png';
deleteSelected.alt = 'Delete selected';
deleteSelected.title = 'Delete selected tasks';
deleteSelected.className = 'action-icon';
deleteSelected.onclick = () => {
  const checkboxes = ul.querySelectorAll('.task-checkbox:checked');
  checkboxes.forEach(checkbox => {
    const li = checkbox.closest('li');
    const taskId = +li.dataset.taskId;
    li.remove();
    listData.tasks = listData.tasks.filter(t => t.id !== taskId);
  });
};

// Select All
const selectAll = document.createElement('img');
selectAll.src = '/images/select-all.jpg';
selectAll.alt = 'Select all';
selectAll.title = 'Select all tasks';
selectAll.className = 'action-icon';
selectAll.onclick = () => {
  const checkboxes = ul.querySelectorAll('.task-checkbox');
  checkboxes.forEach(cb => cb.checked = true);
};

// Unselect All
const unselectAll = document.createElement('img');
unselectAll.src = '/images/unselect.png';
unselectAll.alt = 'Unselect all';
unselectAll.title = 'Unselect all tasks';
unselectAll.className = 'action-icon';
unselectAll.onclick = () => {
  const checkboxes = ul.querySelectorAll('.task-checkbox');
  checkboxes.forEach(cb => cb.checked = false);
};

actions.appendChild(deleteSelected);
actions.appendChild(selectAll);
actions.appendChild(unselectAll);

day.appendChild(dateSection);
day.appendChild(actions);


  headingWrapper.appendChild(heading);
  headingWrapper.appendChild(day);

  const deleteListBtn = document.createElement('button');
  deleteListBtn.className = 'delete-list-btn';
  const deleteBtn = document.createElement("img");
  deleteBtn.src = "/images/trash-2.png";
  deleteListBtn.appendChild(deleteBtn);
  deleteListBtn.title = 'Delete list';

  deleteListBtn.onclick = () => {
    if (confirm('Delete this list?')) {
      card.remove();
      allTaskLists = allTaskLists.filter(l => l.id !== listData.id);
    }
  };

  header.appendChild(headingWrapper); // now contains heading + date
  header.appendChild(deleteListBtn);

  const ul = document.createElement('ul');
  ul.className = 'task-list';

  const inputContainer = document.createElement('div');
  inputContainer.className = 'task-input-container';

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = '+ Add a task';

  inputContainer.onclick = () => {
    const taskText = input.value.trim();
    if (taskText) {
      const taskObj = {
        id: Date.now(),
        text: taskText,
        completed: false
      };
      listData.tasks.push(taskObj);
      const li = createTaskItem(taskObj, listData);
      ul.appendChild(li);
      input.value = '';
    }
  };

  input.addEventListener('keypress', e => {
    if (e.key === 'Enter') inputContainer.click();
  });

  inputContainer.appendChild(input);

  card.appendChild(header);
  card.appendChild(ul);
  card.appendChild(inputContainer);
  card.dataset.listId = listData.id;

  listContainer.appendChild(card);
}


function createTaskItem(task, list) {
  const li = document.createElement('li');
  li.className = 'task-item';
  li.dataset.taskId = task.id;


  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'task-checkbox';
  checkbox.checked = task.completed;

  const span = document.createElement('span');
  span.textContent = task.text;
  span.className = 'task-text';
  span.contentEditable = true;
  span.spellcheck = false;

  // Apply completed class initially if task is marked completed
  if (task.completed) {
    span.classList.add('completed');
  }

  // Toggle completed state on checkbox change
  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked;
    span.classList.toggle('completed', checkbox.checked);
  });

  span.addEventListener('input', () => task.text = span.textContent);

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-task-btn';
  const deleteIcon = document.createElement("img");
  deleteIcon.src = "/images/Delete.png";
  deleteBtn.appendChild(deleteIcon);
  deleteBtn.title = 'Delete task';

  deleteBtn.onclick = () => {
    li.remove();
    list.tasks = list.tasks.filter(t => t.id !== task.id);
  };

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);

  return li;
}








// Handle adding a new list
addListBtn.addEventListener('click', () => {
  createTaskList();
});

// Add one default list on load
window.addEventListener('DOMContentLoaded', () => {
  createTaskList('Daily To-Do');
  updateDate();
  updateTemperature();
});


// --- Date ---
function updateDate() {
  const dateElement = document.getElementById('current-date');
  const now = new Date();
  const options = { weekday: 'short', day: 'numeric', month: 'short' };
  const formattedDate = now.toLocaleDateString('en-US', options);
  dateElement.textContent = formattedDate;
}

// --- Weather ---
async function updateTemperature() {
  const tempElement = document.getElementById('current-temp');
  const apiKey = 'ac35b54345facf65d8c8f980cace967c';
  const city = 'Ahmedabad';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const temperature = Math.round(data.main.temp);
    tempElement.textContent = `${temperature}°C`;
  } catch (error) {
    tempElement.textContent = '--°C';
    console.error('Failed to fetch temperature:', error);
  }
}
setInterval(updateTemperature, 10 * 60 * 1000);

// --- Global Search ---
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const cards = listContainer.querySelectorAll('.task-card');

  cards.forEach(card => {
    const title = card.querySelector('h2').textContent.toLowerCase();
    const tasks = [...card.querySelectorAll('.task-text')];
    const matches = title.includes(query) || tasks.some(t => t.textContent.toLowerCase().includes(query));
    card.style.display = matches ? 'block' : 'none';
  });
});

// --- Filter ---
filterSelect.addEventListener('change', () => {
  const value = filterSelect.value;
  const cards = listContainer.querySelectorAll('.task-card');

  cards.forEach(card => {
    const tasks = Array.from(card.querySelectorAll('.task-item'));
    const total = tasks.length;
    const completed = tasks.filter(task => task.querySelector('input[type="checkbox"]').checked).length;

    if (value === 'all') {
      card.style.display = 'block';
      tasks.forEach(task => (task.style.display = ''));
    } else if (value === 'completed') {
      if (total > 0 && completed === total) {
        card.style.display = 'block';
        tasks.forEach(task => (task.style.display = ''));
      } else {
        card.style.display = 'none';
      }
    } else if (value === 'active') {
      if (total > 0 && completed < total) {
        card.style.display = 'block';
        tasks.forEach(task => {
          const isCompleted = task.querySelector('input[type="checkbox"]').checked;
          task.style.display = isCompleted ? 'none' : '';
        });
      } else {
        card.style.display = 'none';
      }
    }
  });
});


// --- Sort ---
sortSelect.addEventListener('change', () => {
  const value = sortSelect.value;

  let cards = Array.from(listContainer.children);
  cards.sort((a, b) => {
    const aTitle = a.querySelector('h2').textContent.toLowerCase();
    const bTitle = b.querySelector('h2').textContent.toLowerCase();

    if (value === 'az') return aTitle.localeCompare(bTitle);
    if (value === 'za') return bTitle.localeCompare(aTitle);
    if (value === 'oldest') return +a.dataset.listId - +b.dataset.listId;
    if (value === 'newest') return +b.dataset.listId - +a.dataset.listId;
  });

  cards.forEach(card => listContainer.appendChild(card));
});


function formatDateText(dateObj) {
  const options = { weekday: 'short', day: 'numeric', month: 'short' }; // e.g., Thu, 18 Jul
  return dateObj.toLocaleDateString('en-US', options);
}
