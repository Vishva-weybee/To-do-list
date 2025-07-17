// Selectors
const addListBtn = document.querySelector('.add-btn');
const listContainer = document.getElementById('list-container');

let colorIndex = 0;
// Function to create a new task card (list)
function createTaskList(title = 'New List') {
  const card = document.createElement('div');
  card.className = 'task-card';

  const backgroundColors = ['#FFF6E7', '#E5FFE6', '#F3E4F7', '#EDBBB4', '#ECECEC'];
  card.style.backgroundColor = backgroundColors[colorIndex % backgroundColors.length];
  colorIndex++;
  // Header
  const header = document.createElement('div');
  header.className = 'task-card-header';
 
  
  const heading = document.createElement('h2');
  heading.textContent = title;
  heading.contentEditable = true;
  heading.spellcheck = false;

  const deleteListBtn = document.createElement('button');
  deleteListBtn.className = 'delete-list-btn';
  const deleteBtn = document.createElement("img")
  deleteBtn.src = "images/trash-2.png"
  deleteListBtn.appendChild(deleteBtn)
  deleteListBtn.title = 'Delete list';

  deleteListBtn.onclick = () => {
    if (confirm('Delete this list?')) {
      card.remove();
    }
  };

  const day = document.createElement('div')
  day.className = 'day'
  const calender = document.createElement("img")
  calender.src = "images/calender.png"
  day.appendChild(calender)
  const date = document.createElement('p')
  date.textContent = "Today"
  day.appendChild(date)

  header.appendChild(heading);
  header.appendChild(deleteListBtn);

  // Task list
  const ul = document.createElement('ul');
  ul.className = 'task-list';

  // Input for new tasks
  const inputContainer = document.createElement('div');
  inputContainer.className = 'task-input-container';

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = '+ Add a task';


  inputContainer.onclick = () => {
    const taskText = input.value.trim();
    if (taskText) {
      const li = createTaskItem(taskText);
      ul.appendChild(li);
      input.value = '';
    }
  };

  input.addEventListener('keypress', e => {
    if (e.key === 'Enter') inputContainer.click();
  });

  inputContainer.appendChild(input);
//   inputContainer.appendChild(addTaskBtn);

  // Assemble card
  card.appendChild(header);
  card.appendChild(ul);
  card.appendChild(inputContainer);

  listContainer.appendChild(card);
}

// Function to create individual task item
function createTaskItem(text) {
  const li = document.createElement('li');
  li.className = 'task-item';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'task-checkbox';

  const span = document.createElement('span');
  span.textContent = text;
  span.className = 'task-text';
  span.contentEditable = true;
  span.spellcheck = false;

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-task-btn';
  const deleteIcon = document.createElement("img")
  deleteIcon.src = "images/Delete.png"
  deleteBtn.appendChild(deleteIcon)
  deleteBtn.title = 'Delete task';

  deleteBtn.onclick = () => li.remove();

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
});



// --- Update Date ---
function updateDate() {
  const dateElement = document.getElementById('current-date');
  const now = new Date();
  const options = { weekday: 'short', day: 'numeric', month: 'short' }; // Example: Thu, 17 Jul
  const formattedDate = now.toLocaleDateString('en-US', options);
  dateElement.textContent = formattedDate;
}

// --- Fetch Temperature from OpenWeatherMap ---
async function updateTemperature() {
  const tempElement = document.getElementById('current-temp');
  
  const apiKey = 'ac35b54345facf65d8c8f980cace967c'; // <-- Replace with your actual OpenWeatherMap API key
  const city = 'Ahemdabad'; // You can replace this with any city or use geolocation
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

// --- Initialize on Page Load ---
window.addEventListener('DOMContentLoaded', () => {
  updateDate();
  updateTemperature();
});
setInterval(updateTemperature, 10 * 60 * 1000);

