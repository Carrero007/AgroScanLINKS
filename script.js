/* ==========================================================
   AgroScan | Página de links
   EDITE APENAS ESTE BLOCO: nomes, links e fotos
   ========================================================== */
const CONFIG = {
  // Link do botão principal (sistema AgroScan)
  plataforma:
    "https://agroscan-fde4frfqh5hba8h2.brazilsouth-01.azurewebsites.net/hortalicas.html",

  // Link do vídeo do YouTube (botão abaixo do principal).
  // Deixe "" para esconder o botão.
  video: "https://youtu.be/la_itLi9va0?si=LCXQhX5gBUyDsWE5",

  // Imagens (opcional). Deixe "" para usar o desenho padrão.
  // Coloque os arquivos na pasta img/ e informe o caminho.
  logo: "img/logo.png", // ícone quadrado ao lado do nome
  favicon: "img/logo.png", // ícone da aba do navegador
  hero: "img/hero.png", // imagem principal (substitui a folha)

  // Desenvolvedores: troque nome, LinkedIn e (opcional) foto
  devs: [
    {
      nome: "Pedro A. Carrero",
      linkedin:
        "https://www.linkedin.com/in/pedro-agostinho-carrero-a54361329/",
      foto: "img/carrero.jpeg",
    },
    {
      nome: "Talita A. Godoy",
      linkedin: "https://www.linkedin.com/in/talita-assis-godoy-01781b351/",
      foto: "img/talita.png",
    },
    {
      nome: "Mateus C. Romano",
      linkedin: "https://www.linkedin.com/in/mateus-santos-a03831404/",
      foto: "img/mateus.jpeg",
    },
    // Sem foto (foto: ""), aparecem as iniciais do nome automaticamente.
  ],
};

/* ---------- Código (não precisa editar) ---------- */
const LINKEDIN_ICON =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>';

const iniciais = (nome) =>
  nome
    .replace(/^Desenvolvedor\s*/i, "Dev ")
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();

function criarDev({ nome, linkedin, foto }) {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.className = "dev";
  a.href = linkedin;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  a.setAttribute("aria-label", `LinkedIn de ${nome} (abre em nova aba)`);

  const avatar = foto
    ? `<span class="avatar"><img src="${foto}" alt="" loading="lazy"></span>`
    : `<span class="avatar" aria-hidden="true">${iniciais(nome)}</span>`;

  a.innerHTML = `${avatar}
      <span><span class="dev-name"></span><span class="dev-role">Desenvolvedor do projeto</span></span>
      <span class="dev-go">${LINKEDIN_ICON}<span>LinkedIn</span></span>`;
  a.querySelector(".dev-name").textContent = nome; // evita injeção de HTML
  li.appendChild(a);
  return li;
}

// Troca o desenho padrão por imagem própria, se informada.
// Se a imagem não carregar, volta automaticamente ao desenho padrão.
function usarImagem(imgId, svgId, src) {
  if (!src) return;
  const img = document.getElementById(imgId);
  const svg = document.getElementById(svgId);
  img.onload = () => {
    img.removeAttribute("hidden");
    svg.setAttribute("hidden", ""); // SVG não tem a propriedade .hidden, por isso o atributo
  };
  img.onerror = () => console.warn(`Imagem não encontrada: ${src}`);
  img.src = src;
}
usarImagem("logo-img", "logo-svg", CONFIG.logo);
usarImagem("hero-img", "hero-svg", CONFIG.hero);
if (CONFIG.favicon) document.getElementById("favicon").href = CONFIG.favicon;

document.getElementById("cta").href = CONFIG.plataforma;
if (CONFIG.video) {
  const btnVideo = document.getElementById("cta-video");
  btnVideo.href = CONFIG.video;
  btnVideo.removeAttribute("hidden");
}
document.getElementById("devs").append(...CONFIG.devs.map(criarDev));
document.getElementById("year").textContent = new Date().getFullYear();
