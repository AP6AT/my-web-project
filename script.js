
const themeBtn = document.querySelector('#theme-toggle');
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
  });
}

const openBtn = document.querySelector('#open-modal');
const closeBtn = document.querySelector('#close-modal');
const modal = document.querySelector('#modal');

if (openBtn && closeBtn && modal) {
  openBtn.addEventListener('click', () => modal.classList.add('is-open'));
  closeBtn.addEventListener('click', () => modal.classList.remove('is-open'));
  document.addEventListener('keydown', (e) => { if(e.key === 'Escape') modal.classList.remove('is-open') });
}


const projects = [
  { id: 1, title: "Сайт-візитка", tech: "HTML/CSS" },
  { id: 2, title: "Todo App", tech: "JavaScript" },
  { id: 3, title: "Портфоліо", tech: "HTML/CSS/JS" }
];

const projectsContainer = document.querySelector('#projects-container');
const searchProjectsInput = document.querySelector('#search-projects'); // Виправлено ID

function renderProjects(list) {
  if (!projectsContainer) return;
  projectsContainer.innerHTML = list.map(project => `
    <div class="project-card"><h3>${project.title}</h3><p>${project.tech}</p></div>
  `).join('');
}

renderProjects(projects);

if (searchProjectsInput) {
  searchProjectsInput.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = projects.filter(p => p.title.toLowerCase().includes(value));
    renderProjects(filtered);
  });
}

let allPosts = [];
const postsContainer = document.querySelector('#posts-container');
const searchPostsInput = document.querySelector('#search-posts');

function renderPosts(list) {
  if (!postsContainer) return;
  postsContainer.innerHTML = list.map(post => `
    <div class="post">
      <h3>${post.title}</h3>
      <p>${post.body}</p>
    </div>
  `).join('');
}

async function loadPosts() {
  const loading = document.querySelector('#loading');
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) throw new Error('Помилка сервера');
    const data = await response.json();
    allPosts = data.slice(0, 10);
    renderPosts(allPosts);
    if (loading) loading.style.display = 'none';
  } catch (error) {
    if (loading) loading.textContent = 'Помилка завантаження';
  }
}

loadPosts();

if (searchPostsInput) {
  searchPostsInput.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = allPosts.filter(post => post.title.toLowerCase().includes(value));
    renderPosts(filtered);
  });
}

let tasks = [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const data = localStorage.getItem('tasks');
    if (data) {
        tasks = JSON.parse(data);
    }
}

loadTasks();

const input = document.querySelector('#task-input');
const addBtn = document.querySelector('#add-task');

addBtn.addEventListener('click', () => {
    const value = input.value.trim();

    if (value === '') return;

    tasks.push({ text: value });
    saveTasks();
    renderTasks();

    input.value = '';
});

const list = document.querySelector('#task-list');

function renderTasks() {
    list.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.text;

        const btn = document.createElement('button');
        btn.textContent = 'X';

        btn.addEventListener('click', () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        li.appendChild(btn);
        list.appendChild(li);
    });
}

loadTasks();
renderTasks();