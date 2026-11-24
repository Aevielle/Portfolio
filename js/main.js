/* =========================================================
   EDIT YOUR CONTENT HERE
   ========================================================= */

// Daily drivers: the moving carousel on the Home page.
// "icon" uses the Devicon CDN. If an icon fails to load, a letter badge shows instead.
const TOOLS = [
  { name: "VS Code",    icon: "vscode/vscode-original.svg" },
  { name: "GitHub",     icon: "github/github-original.svg" },
  { name: "Git",        icon: "git/git-original.svg" },
  { name: "HTML5",      icon: "html5/html5-original.svg" },
  { name: "CSS3",       icon: "css3/css3-original.svg" },
  { name: "JavaScript", icon: "javascript/javascript-original.svg" },
  { name: "Next.js",    icon: "nextjs/nextjs-original.svg" },
  { name: "Supabase",   icon: "supabase/supabase-original.svg" },
  { name: "Python",     icon: "python/python-original.svg" },
];

// Projects: shown on the Projects page (first 3 also appear on Home).
const PROJECTS = [
  {
    title: "Hope, Inc. ERP",
    desc: "Team project: a Next.js web app with a Supabase database, built in sprints with Scrum.",
    tags: ["Next.js", "Supabase", "Team project"],
    link: "https://github.com/Aevielle/softEng_scrums",
  },
  {
    title: "Inventory Data Warehouse",
    desc: "ETL pipeline that loads Excel and Access data into an inventory fact table using Pentaho Data Integration.",
    tags: ["Pentaho", "ETL", "Data warehouse"],
    link: "#",
  },
  {
    title: "This Portfolio",
    desc: "A bento-style personal site built with plain HTML, CSS and JavaScript.",
    tags: ["HTML", "CSS", "JavaScript"],
    link: "https://github.com/Aevielle",
  },
];

// About page: what you do, with the tools for each.
const ROLES = [
  { title: "Web Development",      chips: ["HTML", "CSS", "JavaScript", "Next.js"] },
  { title: "Databases & Data",     chips: ["Supabase", "SQL", "Pentaho"] },
  { title: "Teamwork & Tools",     chips: ["Git", "GitHub", "Scrum"] },
];

/* =========================================================
   CODE (you shouldn't need to change anything below)
   ========================================================= */

const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

// ----- Page switching (Home / Projects / About) -----
const PAGES = ["home", "projects", "about"];

function showPage() {
  const hash = location.hash.replace("#", "");
  const page = PAGES.includes(hash) ? hash : "home";
  $$(".page").forEach(p => p.classList.toggle("active", p.dataset.page === page));
  $$(".nav-link").forEach(l => {
    const on = l.dataset.page === page;
    l.classList.toggle("active", on);
    on ? l.setAttribute("aria-current", "page") : l.removeAttribute("aria-current");
  });
  window.scrollTo({ top: 0 });
}
window.addEventListener("hashchange", showPage);

// ----- Daily drivers marquee -----
function renderTools() {
  const track = $("#toolsTrack");
  const base = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/";
  const items = TOOLS.map(t => `
    <div class="tool">
      <img src="${base}${t.icon}" alt="" loading="lazy"
           onerror="this.outerHTML='<span class=&quot;dot&quot;>${t.name[0]}</span>'">
      <span>${t.name}</span>
    </div>`).join("");
  // Duplicate the list so the loop looks seamless (animation moves -50%).
  track.innerHTML = items + items;
  track.lastElementChild && $$(".tool", track).slice(TOOLS.length).forEach(el => el.setAttribute("aria-hidden", "true"));
}

// ----- Projects -----
function renderProjects() {
  $("#projectGrid").innerHTML = PROJECTS.map(p => `
    <a class="card card-link project" href="${p.link}" ${p.link.startsWith("http") ? 'target="_blank" rel="noopener"' : ""}>
      <div class="project-top">
        <h3>${p.title}</h3>
        <span class="arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
        </span>
      </div>
      <p>${p.desc}</p>
      <div class="tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
    </a>`).join("");

  $("#homeProjects").innerHTML = PROJECTS.slice(0, 3).map((p, i) =>
    `<li><span>${p.title}</span><em>${p.tags[0]}</em></li>`).join("");
}

// ----- About roles -----
function renderRoles() {
  $("#roleList").innerHTML = ROLES.map(r => `
    <li><span>${r.title}</span><span class="chips">${r.chips.map(c => `<span class="chip">${c}</span>`).join("")}</span></li>`).join("");
}

// ----- Dark mode -----
function initTheme() {
  const root = document.documentElement;
  let saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  root.dataset.theme = saved || "light";

  $("#themeToggle").addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
  });
}

// ----- Stars (light mode) -----
function renderStars() {
  const box = $("#stars");
  const count = innerWidth < 700 ? 45 : 85;
  let html = "";
  for (let i = 0; i < count; i++) {
    const sparkle = Math.random() < 0.35;
    const size = sparkle ? 8 + Math.random() * 10 : 2 + Math.random() * 3;
    html += `<span class="star${sparkle ? " sparkle" : ""}" style="left:${Math.random() * 100}%;top:${Math.random() * 100}%;width:${size}px;height:${size}px;animation-duration:${2.5 + Math.random() * 4}s;animation-delay:${-Math.random() * 6}s"></span>`;
  }
  box.innerHTML = html;
}

// ----- Glowing circle cursor -----
function initCursor() {
  const ring = $(".cursor-ring");
  const glow = $(".cursor-glow");
  if (!ring || !glow || matchMedia("(pointer: coarse)").matches) return;

  let x = innerWidth / 2, y = innerHeight / 2;
  let rx = x, ry = y, gx = x, gy = y;

  window.addEventListener("mousemove", e => {
    x = e.clientX; y = e.clientY;
    ring.classList.add("visible");
    glow.classList.add("visible");
  });
  document.addEventListener("mouseleave", () => {
    ring.classList.remove("visible");
    glow.classList.remove("visible");
  });
  // Ring grows over links and buttons
  document.addEventListener("mouseover", e => {
    ring.classList.toggle("hover", !!e.target.closest("a, button"));
  });

  // Smooth follow: the ring is quick, the light is a little slower
  (function loop() {
    rx += (x - rx) * 0.2;   ry += (y - ry) * 0.2;
    gx += (x - gx) * 0.08;  gy += (y - gy) * 0.08;
    ring.style.transform = `translate(${rx}px, ${ry}px)`;
    glow.style.transform = `translate(${gx}px, ${gy}px)`;
    requestAnimationFrame(loop);
  })();
}

// ----- Init -----
$("#year").textContent = new Date().getFullYear();
initTheme();
renderTools();
renderProjects();
renderRoles();
renderStars();
initCursor();
showPage();