
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

const container = document.querySelector('#projects-container');
const searchInput = document.querySelector('#search-input');

function createProjectCard(project) {
  return `<div class="project-card"><h3>${project.title}</h3><p>${project.tech}</p></div>`;
}

function renderProjects(list) {
  if (!container) return;
  container.innerHTML = list.map(project => createProjectCard(project)).join('');
}


renderProjects(projects);

if (searchInput) {
  searchInput.addEventListener('input', () => {
    const value = searchInput.value.toLowerCase();
    const filtered = projects.filter(p => p.title.toLowerCase().includes(value));
    renderProjects(filtered);
  });
}

async function loadPosts() {
  const loading = document.querySelector('#loading');
  const postsContainer = document.querySelector('#posts-container');

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) throw new Error('Помилка');
    
    const data = await response.json();
    
    postsContainer.innerHTML = data.slice(0, 5).map(post => `
      <div class="post">
        <h3>${post.title}</h3>
        <p>${post.body}</p>
      </div>
    `).join('');
    
    if (loading) loading.style.display = 'none';
  } catch (error) {
    if (loading) loading.textContent = 'Помилка завантаження даних';
  }
}

loadPosts();