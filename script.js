/* =========================================================
   Portfólio Gabriel Alves
   JavaScript puro: idioma, linha do tempo, projetos do GitHub,
   árvores de skills e efeitos de rolagem.
   ========================================================= */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var GITHUB_USER = "GabrielAlvesDeOliveira";
  var MAX_REPOS = 6;
  // Repositórios que nunca aparecem nos cards (o próprio portfólio, por exemplo).
  // Para esconder outro, é só colocar o nome aqui em minúsculas.
  var EXCLUDE_REPOS = ["portfolio", "portifolio", GITHUB_USER.toLowerCase() + ".github.io", GITHUB_USER.toLowerCase()];
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------
     Textos (PT / EN)
     --------------------------------------------------------- */
  var I18N = {
    pt: {
      htmlLang: "pt-BR",
      title: "Gabriel Alves | Portfólio",
      skip: "Pular para o conteúdo",
      navLabel: "Principal",
      pagerLabel: "Seções",
      menu: "Abrir menu",
      menuClose: "Fechar menu",
      langSwitch: "Switch to English",
      cv: "Baixar CV",
      photoAlt: "Foto de Gabriel Alves",
      "nav.sobre": "Sobre mim",
      "nav.trajetoria": "Trajetória",
      "nav.projetos": "Projetos",
      "nav.skills": "Skills",
      "nav.contato": "Contato",
      "about.hello": "Olá, eu sou",
      "about.p1": "Estudante de Engenharia de Computação na UTFPR, campus Cornélio Procópio, com formatura prevista para 2027. Sou curioso por natureza e gosto de entender como as coisas funcionam e de aprender coisas novas.",
      "about.p2": "Comecei na tecnologia no técnico em Informática do IFSP, onde fiz estágio em desenvolvimento e liderei o backend do meu TCC. Desde então trabalho com desenvolvimento de sistemas, banco de dados e organização de projetos, sempre em contato com equipes e clientes.",
      "about.p3": "Busco oportunidades em tecnologia, dados e gestão de projetos, em um lugar onde eu possa continuar aprendendo na prática e contribuir com resultados reais.",
      "timeline.title": "Minha trajetória",
      "timeline.sub": "Clique em um ano para ver o que aconteceu nele. Quando duas coisas aconteceram no mesmo período, as duas aparecem juntas.",
      "timeline.yearLabel": "Ver atividades de {year}",
      "timeline.label": "Linha do tempo",
      "type.formacao": "Formação",
      "type.experiencia": "Experiência",
      "type.extensao": "Extensão",
      "projects.title": "Meus projetos",
      "projects.sub": "Atualizados automaticamente a partir do meu GitHub.",
      "projects.all": "Ver todos no GitHub ↗",
      "projects.filterLabel": "Filtrar por linguagem",
      "projects.allFilter": "Todos",
      "projects.noDesc": "Sem descrição no GitHub.",
      "projects.offline": "Não foi possível falar com o GitHub agora. Mostrando uma lista salva.",
      "projects.open": "Abrir {name} no GitHub",
      "projects.stars": "estrelas",
      "projects.forks": "forks",
      "skills.title": "Minhas árvores de habilidades",
      "skills.sub": "Cada árvore reúne um tipo de habilidade e se ramifica até o que eu sei fazer, com o meu nível em cada uma.",
      "level.1": "Básico",
      "level.2": "Intermediário",
      "level.3": "Avançado",
      "contact.t1": "Vamos",
      "contact.t2": "conversar?",
      "contact.sub": "Estou aberto a oportunidades, projetos e trocas de ideia. Me chama por qualquer um dos canais.",
      "contact.phone": "Telefone"
    },
    en: {
      htmlLang: "en",
      title: "Gabriel Alves | Portfolio",
      skip: "Skip to content",
      navLabel: "Main",
      pagerLabel: "Sections",
      menu: "Open menu",
      menuClose: "Close menu",
      langSwitch: "Mudar para português",
      cv: "Download CV",
      photoAlt: "Photo of Gabriel Alves",
      "nav.sobre": "About me",
      "nav.trajetoria": "Journey",
      "nav.projetos": "Projects",
      "nav.skills": "Skills",
      "nav.contato": "Contact",
      "about.hello": "Hi, I'm",
      "about.p1": "Computer Engineering student at UTFPR, Cornélio Procópio campus, expected to graduate in 2027. I'm curious by nature and I enjoy understanding how things work and learning new things.",
      "about.p2": "I started in tech at IFSP's IT technical program, where I interned in software development and led the backend of my final project. Since then I've worked with systems development, databases and project organization, always in touch with teams and clients.",
      "about.p3": "I'm looking for opportunities in technology, data and project management, somewhere I can keep learning hands-on and deliver real results.",
      "timeline.title": "My journey",
      "timeline.sub": "Click a year to see what happened in it. When two things happened in the same period, both are shown together.",
      "timeline.yearLabel": "See activities from {year}",
      "timeline.label": "Timeline",
      "type.formacao": "Education",
      "type.experiencia": "Experience",
      "type.extensao": "Outreach",
      "projects.title": "My projects",
      "projects.sub": "Automatically updated from my GitHub.",
      "projects.all": "See all on GitHub ↗",
      "projects.filterLabel": "Filter by language",
      "projects.allFilter": "All",
      "projects.noDesc": "No description on GitHub.",
      "projects.offline": "Couldn't reach GitHub right now. Showing a saved list.",
      "projects.open": "Open {name} on GitHub",
      "projects.stars": "stars",
      "projects.forks": "forks",
      "skills.title": "My skill trees",
      "skills.sub": "Each tree groups one kind of skill and branches out into what I can do, with my level in each one.",
      "level.1": "Basic",
      "level.2": "Intermediate",
      "level.3": "Advanced",
      "contact.t1": "Let's",
      "contact.t2": "talk?",
      "contact.sub": "I'm open to opportunities, projects and exchanging ideas. Reach me through any of these channels.",
      "contact.phone": "Phone"
    }
  };

  /* ---------------------------------------------------------
     Trajetória
     --------------------------------------------------------- */
  var TIMELINE = [
    {
      year: ["2020", "2021"],
      items: [
        {
          id: "etec",
          type: "formacao",
          chip: { pt: "Técnico em Transações Imobiliárias, ETEC", en: "Real Estate Technician, ETEC" },
          title: { pt: "Técnico em Transações Imobiliárias", en: "Real Estate Transactions Technician" },
          org: { pt: "ETEC Praia Grande", en: "ETEC Praia Grande" },
          date: { pt: "2º sem. 2020 a 2º sem. 2021", en: "2nd sem. 2020 to 2nd sem. 2021" },
          desc: {
            pt: "Curso técnico voltado ao mercado imobiliário, com foco em avaliação de imóveis e na legislação dos contratos de compra, venda e locação.",
            en: "Technical program focused on the real estate market, covering property appraisal and the law behind purchase, sale and rental contracts."
          },
          highlights: {
            pt: ["Avaliação imobiliária", "Leis e contratos imobiliários"],
            en: ["Property appraisal", "Real estate law and contracts"]
          }
        }
      ]
    },
    {
      year: ["2022"],
      items: [
        {
          id: "ifsp",
          type: "formacao",
          chip: { pt: "Técnico em Informática, IFSP", en: "IT Technician, IFSP" },
          title: { pt: "Técnico em Informática", en: "IT Technician" },
          org: { pt: "IFSP Cubatão, integrado ao ensino médio", en: "IFSP Cubatão, integrated with high school" },
          date: { pt: "2019 a 2022", en: "2019 to 2022" },
          desc: {
            pt: "Curso técnico integrado ao ensino médio, com lógica de programação, desenvolvimento de sistemas e fundamentos de tecnologia.",
            en: "Technical program integrated with high school, covering programming logic, systems development and technology fundamentals."
          },
          highlights: {
            pt: [
              "Liderei o backend em Node.js do TCC Iris, feito em grupo",
              "Iris: app em React Native que detecta e classifica objetos em imagens com IA da AWS",
              "Estágio em desenvolvimento durante o curso"
            ],
            en: [
              "Led the Node.js backend of Iris, our group final project",
              "Iris: a React Native app that detects and classifies objects in images using AWS AI",
              "Software development internship during the program"
            ]
          }
        },
        {
          id: "clearcloud",
          type: "experiencia",
          chip: { pt: "Estágio em desenvolvimento, Clear Cloud", en: "Development intern, Clear Cloud" },
          title: { pt: "Estágio em desenvolvimento", en: "Software Development Intern" },
          org: { pt: "Clear Cloud Software, Praia Grande", en: "Clear Cloud Software, Praia Grande" },
          date: { pt: "fev. a nov. 2022", en: "Feb to Nov 2022" },
          desc: {
            pt: "Desenvolvimento de sistemas mobile e desktop com JavaScript e Ruby, do front-end à integração com serviços em nuvem, com banco MySQL e AWS.",
            en: "Built mobile and desktop systems with JavaScript and Ruby, from the front end to cloud integration, using MySQL and AWS."
          },
          highlights: {
            pt: [
              "Equipe de cerca de 3 estagiários e 1 líder de projeto",
              "Interfaces guiadas por protótipos no Figma",
              "Tarefas organizadas em Kanban e comunicação diária pelo Slack"
            ],
            en: [
              "Team of about 3 interns and 1 project lead",
              "Interfaces built from Figma prototypes",
              "Tasks organized in Kanban, daily updates on Slack"
            ]
          }
        }
      ]
    },
    {
      year: ["2023"],
      items: [
        {
          id: "utfpr",
          type: "formacao",
          chip: { pt: "Engenharia de Computação, UTFPR", en: "Computer Engineering, UTFPR" },
          title: { pt: "Engenharia de Computação", en: "Computer Engineering" },
          org: { pt: "UTFPR, Cornélio Procópio", en: "UTFPR, Cornélio Procópio" },
          date: { pt: "2023/1 a 2027/2 (previsão)", en: "2023 to 2027 (expected)" },
          desc: {
            pt: "Bacharelado com foco em desenvolvimento de software, banco de dados e estrutura de dados aplicados em projetos.",
            en: "Bachelor's degree focused on software development, databases and data structures applied to projects."
          },
          highlights: {
            pt: [
              "Projeto de extensão Key Scape (Escape Room)",
              "Empresa júnior Unect Jr",
              "Projetos das disciplinas publicados no GitHub"
            ],
            en: [
              "Key Scape outreach project (Escape Room)",
              "Unect Jr, the university's junior enterprise",
              "Course projects published on GitHub"
            ]
          }
        }
      ]
    },
    {
      year: ["2024"],
      items: [
        {
          id: "keyscape",
          type: "extensao",
          chip: { pt: "Key Scape, projeto de extensão", en: "Key Scape, outreach project" },
          title: { pt: "Key Scape", en: "Key Scape" },
          org: { pt: "Projeto de extensão Escape Room, UTFPR", en: "Escape Room outreach project, UTFPR" },
          date: { pt: "2024/1 até hoje", en: "2024 to present" },
          desc: {
            pt: "Cuido da sala em eventos e ajudo a criar os enigmas, do planejamento lógico ao desenvolvimento técnico.",
            en: "I run the room during events and help create the puzzles, from logic design to technical development."
          },
          highlights: {
            pt: [
              "Programei em Python um dos desafios da sala",
              "Atendimento ao público de fora da universidade"
            ],
            en: [
              "Programmed one of the room's challenges in Python",
              "Hosting visitors from outside the university"
            ]
          },
          link: { href: "https://escaperoom.cp.utfpr.edu.br/", pt: "Conhecer o projeto ↗", en: "See the project ↗" }
        },
        {
          id: "unect",
          type: "experiencia",
          chip: { pt: "Product Owner, Unect Jr", en: "Product Owner, Unect Jr" },
          title: { pt: "Product Owner", en: "Product Owner" },
          org: { pt: "Unect Jr, empresa júnior da UTFPR", en: "Unect Jr, UTFPR's junior enterprise" },
          date: { pt: "nov. 2024 a dez. 2025", en: "Nov 2024 to Dec 2025" },
          desc: {
            pt: "Responsável pela ponte entre clientes e equipe, com Scrum, retorno semanal aos clientes e entrega de um projeto de grande porte para uma associação de estudantes.",
            en: "Bridged clients and the team using Scrum, with weekly client updates, and delivered a large project for a student association."
          },
          highlights: {
            pt: [
              "Liderei uma equipe de 4 pessoas",
              "Criação e acompanhamento de KPIs no Monday",
              "Organização de entregas com Monday e ClickUp"
            ],
            en: [
              "Led a team of 4 people",
              "Created and tracked KPIs in Monday",
              "Organized deliveries with Monday and ClickUp"
            ]
          },
          link: { href: "https://unect.com.br/", pt: "Conhecer a Unect Jr ↗", en: "Visit Unect Jr ↗" }
        }
      ]
    }
  ];

  /* ---------------------------------------------------------
     Skills
     --------------------------------------------------------- */
  var SKILLS = [
    {
      icon: "</>",
      name: { pt: "Linguagens de programação", en: "Programming languages" },
      branches: [
        { name: { pt: "Web", en: "Web" }, leaves: [["HTML / CSS", 3], ["JavaScript", 3]] },
        { name: { pt: "Sistemas", en: "Systems" }, leaves: [["C", 2], ["Java", 2], ["C#", 2], ["Ruby", 2]] },
        { name: { pt: "Dados", en: "Data" }, leaves: [["Python", 2], ["R", 1]] },
        { name: { pt: "Banco de dados", en: "Databases" }, leaves: [["MySQL", 3], ["PostgreSQL", 3]] }
      ]
    },
    {
      icon: "▣",
      name: { pt: "Programas", en: "Software" },
      branches: [
        { name: { pt: "Design e escritório", en: "Design and office" }, leaves: [["Figma", 3], [{ pt: "Pacote Office", en: "Microsoft Office" }, 2], ["Power BI", 1]] },
        { name: { pt: "Desenvolvimento", en: "Development" }, leaves: [["VS Code", 3], [{ pt: "Git e GitHub", en: "Git and GitHub" }, 3]] },
        { name: { pt: "Engenharia", en: "Engineering" }, leaves: [["MATLAB", 1], ["Cisco Packet Tracer", 1]] },
        { name: { pt: "Infraestrutura", en: "Infrastructure" }, leaves: [["AWS", 1], ["Docker", 1]] }
      ]
    },
    {
      icon: "Aa",
      name: { pt: "Idiomas", en: "Languages" },
      branches: [
        { name: { pt: "Inglês", en: "English" }, leaves: [[{ pt: "Intermediário", en: "Intermediate" }, 2]] },
        { name: { pt: "Espanhol", en: "Spanish" }, leaves: [[{ pt: "Básico", en: "Basic" }, 1]] },
        { name: { pt: "Libras", en: "Libras (Brazilian Sign Language)" }, leaves: [[{ pt: "Básico", en: "Basic" }, 1]] },
        { name: { pt: "Mandarim", en: "Mandarin" }, leaves: [[{ pt: "Iniciante", en: "Beginner" }, 1]] }
      ]
    },
    {
      icon: "↻",
      name: { pt: "Metodologias", en: "Methodologies" },
      compact: true,
      branches: [
        { name: { pt: "Ágil", en: "Agile" }, leaves: [["Scrum", 2], ["Kanban", 2]] },
        { name: { pt: "Produto", en: "Product" }, leaves: [[{ pt: "Gestão de backlog", en: "Backlog management" }, 2], ["Business Model Canvas", 2], ["OKR", 2]] }
      ]
    }
  ];

  /* ---------------------------------------------------------
     Projetos: descrições revisadas (PT/EN) por repositório.
     Se um repositório novo não estiver aqui, usa a descrição do GitHub.
     --------------------------------------------------------- */
  var REPO_TEXT = {
    "enigma": {
      pt: "Sala online com 3 enigmas, login e área administrativa, do projeto de extensão Escape Room.",
      en: "Online room with 3 puzzles, login and an admin area, from the Escape Room outreach project."
    },
    "letterbook-mobile": {
      pt: "Versão mobile do Letterbook para avaliar livros e suas adaptações, feita em Programação para Dispositivos Móveis.",
      en: "Mobile version of Letterbook to rate books and their adaptations, built for a Mobile Development course."
    },
    "letterbook-frontend": {
      pt: "Avaliador de livros no estilo Letterboxd, em HTML, CSS e JavaScript, feito em Programação Web Front-End.",
      en: "Letterboxd-style book rating app in HTML, CSS and JavaScript, built for a Front-End Web Development course."
    },
    "cuida": {
      pt: "App de lembrete de remédios para idosos atendidos pelo TEDI, feito em Certificadora de Competências 1.",
      en: "Medication reminder app for older adults served by TEDI, built for a university skills course."
    },
    "detranmini": {
      pt: "Sistema em Java para cadastro de multas de veículos.",
      en: "Java system for registering vehicle traffic fines."
    },
    "treinee-unect": {
      pt: "Projeto do processo de trainee da Unect Jr, empresa júnior da UTFPR.",
      en: "Project from the trainee program at Unect Jr, UTFPR's junior enterprise."
    },
    "iris-mobile": {
      pt: "TCC do técnico no IFSP: app que detecta e classifica objetos em imagens com IA da AWS. Liderei o backend em Node.js.",
      en: "IFSP technical program final project: an app that detects and classifies objects in images with AWS AI. I led the Node.js backend."
    }
  };

  // Usado só se a API do GitHub falhar (ex.: limite de 60 requisições por hora)
  var FALLBACK_REPOS = [
    { name: "Enigma", language: "JavaScript", stargazers_count: 0, forks_count: 0, pushed_at: "2026-10-30T22:00:00Z" },
    { name: "Letterbook-mobile", language: "Java", stargazers_count: 0, forks_count: 0, pushed_at: "2026-10-30T12:00:00Z" },
    { name: "letterbook-frontend", language: "JavaScript", stargazers_count: 0, forks_count: 0, pushed_at: "2026-09-10T12:00:00Z" },
    { name: "cuida", language: "TypeScript", stargazers_count: 0, forks_count: 0, pushed_at: "2026-06-10T12:00:00Z" },
    { name: "DetranMini", language: "Java", stargazers_count: 0, forks_count: 0, pushed_at: "2025-08-10T12:00:00Z" },
    { name: "treinee-unect", language: "CSS", stargazers_count: 0, forks_count: 0, pushed_at: "2024-10-13T12:00:00Z" }
  ].map(function (r) {
    r.html_url = "https://github.com/" + GITHUB_USER + "/" + r.name;
    r.description = null;
    return r;
  });

  var LANG_COLORS = {
    "JavaScript": "#f1e05a", "TypeScript": "#3178c6", "Java": "#b07219", "C#": "#178600",
    "C": "#555555", "C++": "#f34b7d", "Python": "#3572a5", "Ruby": "#701516", "HTML": "#e34c26",
    "CSS": "#663399", "R": "#198ce7", "PHP": "#4f5d95", "Kotlin": "#a97bff", "Dart": "#00b4ab",
    "Shell": "#89e051", "Go": "#00add8", "Jupyter Notebook": "#da5b0b", "Vue": "#41b883"
  };

  /* ---------------------------------------------------------
     Estado
     --------------------------------------------------------- */
  var state = {
    lang: "pt",
    activePeriod: 0,
    repos: null,
    reposOffline: false,
    filter: "all"
  };

  function storageGet(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }
  function storageSet(key, value) {
    try { window.localStorage.setItem(key, value); } catch (e) { /* sem armazenamento */ }
  }

  function t(key) {
    return (I18N[state.lang] && I18N[state.lang][key]) || I18N.pt[key] || key;
  }
  function pick(value) {
    if (value && typeof value === "object") return value[state.lang] || value.pt;
    return value;
  }
  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  /* ---------------------------------------------------------
     Idioma
     --------------------------------------------------------- */
  function applyLanguage() {
    var dict = I18N[state.lang];
    document.documentElement.lang = dict.htmlLang;
    document.title = dict.title;

    document.querySelectorAll("[data-i18n]").forEach(function (node) {
      node.textContent = t(node.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (node) {
      node.setAttribute("aria-label", t(node.getAttribute("data-i18n-aria")));
    });
    document.querySelectorAll("[data-i18n-alt]").forEach(function (node) {
      node.setAttribute("alt", t(node.getAttribute("data-i18n-alt")));
    });

    document.getElementById("lang-toggle").setAttribute("aria-label", t("langSwitch"));
    document.getElementById("timeline").setAttribute("aria-label", t("timeline.label"));
    document.getElementById("filters").setAttribute("aria-label", t("projects.filterLabel"));
    updateMenuLabel();

    renderTimeline();
    renderSkills();
    renderRepos();
  }

  function setupLanguage() {
    var saved = storageGet("lang");
    if (saved === "pt" || saved === "en") state.lang = saved;

    document.getElementById("lang-toggle").addEventListener("click", function () {
      state.lang = state.lang === "pt" ? "en" : "pt";
      storageSet("lang", state.lang);
      applyLanguage();
      observeReveals();
    });
  }

  /* ---------------------------------------------------------
     Menu mobile
     --------------------------------------------------------- */
  var nav = document.querySelector(".nav");
  var menuBtn = document.querySelector(".nav__menu");

  function updateMenuLabel() {
    var open = nav.classList.contains("is-open");
    menuBtn.setAttribute("aria-label", t(open ? "menuClose" : "menu"));
  }
  function setMenu(open) {
    nav.classList.toggle("is-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    updateMenuLabel();
  }
  function setupMenu() {
    menuBtn.addEventListener("click", function () {
      setMenu(!nav.classList.contains("is-open"));
    });
    document.querySelectorAll(".nav__link").forEach(function (link) {
      link.addEventListener("click", function () { setMenu(false); });
    });
    document.addEventListener("click", function (e) {
      if (!nav.contains(e.target)) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenu(false);
    });
  }

  /* ---------------------------------------------------------
     Linha do tempo
     --------------------------------------------------------- */
  function renderTimeline() {
    var root = document.getElementById("timeline");
    root.innerHTML = "";

    TIMELINE.forEach(function (period, pi) {
      var active = pi === state.activePeriod;
      var col = el("div", "period" + (active ? " is-active" : ""));
      col.dataset.period = pi;

      // O ano é o botão que mostra as atividades daquele período
      var year = el("button", "period__year" + (period.year.length > 1 ? " period__year--double" : ""));
      year.type = "button";
      year.id = "year-" + pi;
      year.dataset.period = pi;
      year.setAttribute("role", "tab");
      year.setAttribute("aria-controls", "timeline-detail");
      year.setAttribute("aria-selected", String(active));
      year.setAttribute("aria-label", t("timeline.yearLabel").replace("{year}", period.year.join("/")));
      year.tabIndex = active ? 0 : -1;
      year.innerHTML = period.year.join("<br>");
      col.appendChild(year);

      var list = el("ul", "period__items");
      period.items.forEach(function (item) {
        var chip = el("li", "chip" + (active ? " is-active" : ""));
        chip.appendChild(el("span", "type-dot type-dot--" + item.type));
        chip.appendChild(el("span", null, pick(item.chip)));
        list.appendChild(chip);
      });
      col.appendChild(list);
      root.appendChild(col);
    });

    renderDetail();
  }

  function detailCard(item) {
    var card = el("article", "detail glass");

    var summary = el("div", "detail__summary");
    summary.appendChild(el("span", "badge badge--" + item.type, t("type." + item.type)));
    summary.appendChild(el("h3", "detail__title", pick(item.title)));
    summary.appendChild(el("p", "detail__org", pick(item.org)));
    summary.appendChild(el("p", "detail__date", pick(item.date)));

    var body = el("div", "detail__body");
    body.appendChild(el("p", "detail__desc", pick(item.desc)));
    var ul = el("ul", "detail__list");
    pick(item.highlights).forEach(function (h) { ul.appendChild(el("li", null, h)); });
    body.appendChild(ul);
    if (item.link) {
      var a = el("a", "detail__link", item.link[state.lang]);
      a.href = item.link.href;
      a.target = "_blank";
      a.rel = "noopener";
      body.appendChild(a);
    }

    card.appendChild(summary);
    card.appendChild(body);
    return card;
  }

  // Mostra todas as atividades do ano escolhido (uma ou duas)
  function renderDetail() {
    var period = TIMELINE[state.activePeriod];
    var wrap = document.getElementById("timeline-detail");
    wrap.setAttribute("aria-labelledby", "year-" + state.activePeriod);
    wrap.classList.toggle("details--double", period.items.length > 1);
    wrap.innerHTML = "";
    period.items.forEach(function (item, i) {
      var card = detailCard(item);
      card.style.animationDelay = i * 0.1 + "s";
      wrap.appendChild(card);
    });
  }

  // Atualiza só as classes da linha do tempo (sem recriar), para as transições do CSS rodarem
  function updateTimelineState() {
    document.querySelectorAll("#timeline .period").forEach(function (col) {
      var active = Number(col.dataset.period) === state.activePeriod;
      col.classList.toggle("is-active", active);
      var btn = col.querySelector(".period__year");
      btn.setAttribute("aria-selected", String(active));
      btn.tabIndex = active ? 0 : -1;
      col.querySelectorAll(".chip").forEach(function (chip) {
        chip.classList.toggle("is-active", active);
      });
    });
  }

  // Troca animada dos cards: os atuais saem, a altura se ajusta e os novos entram
  var swapTimer = null;
  function swapDetail(direction) {
    var wrap = document.getElementById("timeline-detail");
    var dirClass = direction < 0 ? "is-back" : "is-forward";
    wrap.classList.remove("is-back", "is-forward");
    wrap.classList.add(dirClass);

    if (reduceMotion || !wrap.children.length) {
      renderDetail();
      return;
    }

    clearTimeout(swapTimer);
    var startHeight = wrap.offsetHeight;
    wrap.style.height = startHeight + "px";
    wrap.classList.add("is-leaving");

    swapTimer = setTimeout(function () {
      renderDetail();
      wrap.classList.remove("is-leaving");
      wrap.style.height = "auto";
      var endHeight = wrap.offsetHeight;
      wrap.style.height = startHeight + "px";
      void wrap.offsetHeight; // força o navegador a aplicar a altura inicial
      wrap.style.height = endHeight + "px";
      swapTimer = setTimeout(function () { wrap.style.height = ""; }, 500);
    }, 260);
  }

  function selectPeriod(index, opts) {
    opts = opts || {};
    if (index === state.activePeriod) return;
    var n = TIMELINE.length;
    var forward = (index - state.activePeriod + n) % n <= n / 2;
    state.activePeriod = index;
    updateTimelineState();
    swapDetail(forward ? 1 : -1);
    if (opts.focus) {
      var btn = document.getElementById("year-" + index);
      if (btn) btn.focus({ preventScroll: true });
    }
  }

  /* Troca automática de ano a cada 10 s.
     Se a pessoa escolher um ano, para e só volta depois de 2 min sem cliques.
     Também espera enquanto a seção não está na tela ou a aba está escondida. */
  var AUTOPLAY_MS = 10000;
  var RESUME_MS = 120000;
  var TICK_MS = 100;
  var autoplay = {
    enabled: true,
    elapsed: 0,
    visible: false,
    resumeTimer: null
  };

  function setAutoplayEnabled(on) {
    autoplay.enabled = on;
    autoplay.elapsed = 0;
    var root = document.getElementById("timeline");
    root.classList.toggle("is-autoplay", on);
    root.style.setProperty("--t", 0);
  }

  function pauseAutoplayByUser() {
    setAutoplayEnabled(false);
    clearTimeout(autoplay.resumeTimer);
    autoplay.resumeTimer = setTimeout(function () { setAutoplayEnabled(true); }, RESUME_MS);
  }

  function setupAutoplay() {
    var section = document.getElementById("trajetoria");
    var root = document.getElementById("timeline");

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        autoplay.visible = entries[0].isIntersecting;
      }, { threshold: 0.25 }).observe(root);
    } else {
      autoplay.visible = true;
    }

    setAutoplayEnabled(true);
    setInterval(function () {
      if (!autoplay.enabled || !autoplay.visible || document.hidden) return;
      autoplay.elapsed += TICK_MS;
      root.style.setProperty("--t", Math.min(autoplay.elapsed / AUTOPLAY_MS, 1).toFixed(3));
      if (autoplay.elapsed >= AUTOPLAY_MS) {
        autoplay.elapsed = 0;
        root.style.setProperty("--t", 0);
        selectPeriod((state.activePeriod + 1) % TIMELINE.length);
      }
    }, TICK_MS);
  }

  function setupTimeline() {
    var root = document.getElementById("timeline");
    root.addEventListener("click", function (e) {
      var year = e.target.closest(".period__year");
      if (!year) return;
      pauseAutoplayByUser();
      selectPeriod(Number(year.dataset.period), { focus: true });
    });
    // Setas do teclado navegam entre os anos
    root.addEventListener("keydown", function (e) {
      var keys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"];
      if (keys.indexOf(e.key) === -1 || !e.target.closest(".period__year")) return;
      var n = TIMELINE.length;
      var idx = state.activePeriod;
      if (e.key === "Home") idx = 0;
      else if (e.key === "End") idx = n - 1;
      else if (e.key === "ArrowRight" || e.key === "ArrowDown") idx = (idx + 1) % n;
      else idx = (idx - 1 + n) % n;
      e.preventDefault();
      pauseAutoplayByUser();
      selectPeriod(idx, { focus: true });
    });
    setupAutoplay();
  }

  /* ---------------------------------------------------------
     Projetos (API do GitHub)
     --------------------------------------------------------- */
  function timeAgo(dateStr) {
    var diff = (new Date(dateStr).getTime() - Date.now()) / 1000;
    var units = [
      ["year", 31536000], ["month", 2592000], ["week", 604800],
      ["day", 86400], ["hour", 3600], ["minute", 60]
    ];
    var locale = state.lang === "pt" ? "pt-BR" : "en";
    try {
      var rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
      for (var i = 0; i < units.length; i++) {
        if (Math.abs(diff) >= units[i][1]) return rtf.format(Math.round(diff / units[i][1]), units[i][0]);
      }
      return rtf.format(0, "minute");
    } catch (e) {
      return new Date(dateStr).toLocaleDateString(locale);
    }
  }

  function repoDescription(repo) {
    var custom = REPO_TEXT[repo.name.toLowerCase()];
    if (custom) return custom[state.lang];
    return repo.description || t("projects.noDesc");
  }

  function renderSkeletons() {
    var grid = document.getElementById("repos");
    grid.innerHTML = "";
    for (var i = 0; i < MAX_REPOS; i++) grid.appendChild(el("div", "repo repo--skeleton"));
  }

  function renderFilters() {
    var bar = document.getElementById("filters");
    bar.innerHTML = "";
    if (!state.repos) return;

    var langs = [];
    state.repos.forEach(function (r) {
      if (r.language && langs.indexOf(r.language) === -1) langs.push(r.language);
    });
    if (state.filter !== "all" && langs.indexOf(state.filter) === -1) state.filter = "all";

    [["all", t("projects.allFilter")]].concat(langs.map(function (l) { return [l, l]; }))
      .forEach(function (entry) {
        var b = el("button", "filter", entry[1]);
        b.type = "button";
        b.dataset.filter = entry[0];
        b.setAttribute("aria-pressed", String(state.filter === entry[0]));
        bar.appendChild(b);
      });
  }

  function renderRepos() {
    if (!state.repos) return;
    renderFilters();

    var grid = document.getElementById("repos");
    grid.innerHTML = "";

    state.repos.forEach(function (repo, i) {
      var card = el("a", "repo reveal" + (i === 0 ? " repo--featured" : ""));
      card.href = repo.html_url;
      card.target = "_blank";
      card.rel = "noopener";
      card.dataset.lang = repo.language || "";
      card.style.setProperty("--delay", (i % 3) * 0.08 + "s");
      card.setAttribute("aria-label", t("projects.open").replace("{name}", repo.name));
      if (state.filter !== "all" && repo.language !== state.filter) card.classList.add("is-hidden");

      var top = el("div", "repo__top");
      top.appendChild(el("h3", "repo__name", repo.name));
      var arrow = el("span", "arrow", "↗");
      arrow.setAttribute("aria-hidden", "true");
      top.appendChild(arrow);

      var meta = el("div", "repo__meta");
      if (repo.language) {
        var lang = el("span", "repo__lang");
        var dot = el("i");
        dot.style.setProperty("--lang", LANG_COLORS[repo.language] || "#8b8b8b");
        lang.appendChild(dot);
        lang.appendChild(document.createTextNode(repo.language));
        meta.appendChild(lang);
      }
      var stars = el("span", null, "★ " + repo.stargazers_count);
      stars.title = repo.stargazers_count + " " + t("projects.stars");
      var forks = el("span", null, "⑂ " + repo.forks_count);
      forks.title = repo.forks_count + " " + t("projects.forks");
      meta.appendChild(stars);
      meta.appendChild(forks);
      meta.appendChild(el("span", "repo__date", timeAgo(repo.pushed_at || repo.updated_at)));

      card.appendChild(top);
      card.appendChild(el("p", "repo__desc", repoDescription(repo)));
      card.appendChild(meta);
      grid.appendChild(card);
    });

    if (state.reposOffline) grid.appendChild(el("p", "repos__note", t("projects.offline")));
    observeReveals();
  }

  function setupFilters() {
    document.getElementById("filters").addEventListener("click", function (e) {
      var b = e.target.closest(".filter");
      if (!b) return;
      state.filter = b.dataset.filter;
      document.querySelectorAll(".filter").forEach(function (f) {
        f.setAttribute("aria-pressed", String(f.dataset.filter === state.filter));
      });
      document.querySelectorAll(".repo").forEach(function (card) {
        var show = state.filter === "all" || card.dataset.lang === state.filter;
        card.classList.toggle("is-hidden", !show);
      });
    });
  }

  function loadRepos() {
    renderSkeletons();

    // Cache de 1 hora para não gastar o limite da API a cada visita
    var CACHE_KEY = "gh-repos-v1";
    try {
      var cached = JSON.parse(window.sessionStorage.getItem(CACHE_KEY) || "null");
      if (cached && Date.now() - cached.time < 3600000) {
        state.repos = cached.repos;
        renderRepos();
        return;
      }
    } catch (e) { /* ignora */ }

    var url = "https://api.github.com/users/" + GITHUB_USER + "/repos?per_page=100&sort=pushed&direction=desc&type=owner";
    fetch(url, { headers: { Accept: "application/vnd.github+json" } })
      .then(function (res) {
        if (!res.ok) throw new Error("GitHub " + res.status);
        return res.json();
      })
      .then(function (data) {
        var repos = data
          .filter(function (r) {
            return !r.fork && !r.private && !r.archived && EXCLUDE_REPOS.indexOf(r.name.toLowerCase()) === -1;
          })
          .sort(function (a, b) { return new Date(b.pushed_at) - new Date(a.pushed_at); })
          .slice(0, MAX_REPOS)
          .map(function (r) {
            return {
              name: r.name,
              description: r.description,
              language: r.language,
              stargazers_count: r.stargazers_count,
              forks_count: r.forks_count,
              pushed_at: r.pushed_at,
              html_url: r.html_url
            };
          });
        if (!repos.length) throw new Error("vazio");
        state.repos = repos;
        try {
          window.sessionStorage.setItem(CACHE_KEY, JSON.stringify({ time: Date.now(), repos: repos }));
        } catch (e) { /* ignora */ }
        renderRepos();
      })
      .catch(function () {
        state.repos = FALLBACK_REPOS;
        state.reposOffline = true;
        renderRepos();
      });
  }

  /* ---------------------------------------------------------
     Skills
     --------------------------------------------------------- */
  function renderSkills() {
    var wrap = document.getElementById("trees");
    wrap.innerHTML = "";

    SKILLS.forEach(function (tree, ti) {
      var card = el("article", "tree glass reveal" + (tree.compact ? " tree--compact" : ""));
      card.style.setProperty("--delay", "0s");

      var rootWrap = el("div", "tree__root");
      var root = el("h3", "root");
      var icon = el("span", "root__icon", tree.icon);
      icon.setAttribute("aria-hidden", "true");
      root.appendChild(icon);
      root.appendChild(el("span", null, pick(tree.name)));
      rootWrap.appendChild(root);
      card.appendChild(rootWrap);

      var branches = el("ul", "tree__branches");
      branches.style.setProperty("--cols", tree.branches.length);
      tree.branches.forEach(function (branch) {
        var li = el("li", "branch");
        li.appendChild(el("span", "branch__name", pick(branch.name)));
        var leaves = el("ul", "leaves");
        branch.leaves.forEach(function (leaf) {
          var lv = leaf[1];
          var item = el("li", "leaf");
          item.appendChild(el("span", null, pick(leaf[0])));
          var dots = el("span", "level level--" + lv);
          dots.setAttribute("role", "img");
          dots.setAttribute("aria-label", t("level." + lv));
          dots.innerHTML = "<i></i><i></i><i></i>";
          item.appendChild(dots);
          leaves.appendChild(item);
        });
        li.appendChild(leaves);
        branches.appendChild(li);
      });
      card.appendChild(branches);
      wrap.appendChild(card);
    });
  }

  /* ---------------------------------------------------------
     Rolagem: revelar elementos, paginação e efeito de seção
     --------------------------------------------------------- */
  var revealObserver = null;

  function observeReveals() {
    var nodes = document.querySelectorAll(".reveal:not(.is-visible)");
    if (!("IntersectionObserver" in window)) {
      nodes.forEach(function (n) { n.classList.add("is-visible"); });
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      }, { rootMargin: "0px 0px -10% 0px", threshold: 0.08 });
    }
    nodes.forEach(function (n) { revealObserver.observe(n); });
  }

  // Atraso em cascata para os elementos de cada seção
  function setStagger() {
    document.querySelectorAll(".page").forEach(function (section) {
      section.querySelectorAll(".reveal").forEach(function (node, i) {
        if (!node.style.getPropertyValue("--delay")) {
          node.style.setProperty("--delay", Math.min(i, 6) * 0.08 + "s");
        }
      });
    });
  }

  function setupScroll() {
    var pages = Array.prototype.slice.call(document.querySelectorAll(".page"));
    var inners = pages.map(function (p) { return p.querySelector(".page__inner"); });
    var navLinks = document.querySelectorAll(".nav__link");
    var dots = document.querySelectorAll(".pager__dot");
    var progress = document.querySelector(".progress__bar");
    var ticking = false;
    var current = "";

    function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }

    function update() {
      ticking = false;
      var vh = window.innerHeight;
      var docH = document.documentElement.scrollHeight - vh;
      progress.style.setProperty("--scroll", docH > 0 ? clamp(window.scrollY / docH) : 0);

      var activeId = pages[0].id;
      pages.forEach(function (page, i) {
        var rect = page.getBoundingClientRect();

        // Seção ativa: a que cruza a linha a 40% da tela
        if (rect.top <= vh * 0.4) activeId = page.id;

        // Entrada: a seção sobe e cresce enquanto o topo entra na tela
        var p = i === 0 ? 1 : clamp((vh - rect.top) / (vh * 0.55));
        // Saída: só quando o fim da seção já passou da metade da tela
        var q = clamp((vh * 0.35 - rect.bottom) / (vh * 0.35));
        inners[i].style.setProperty("--p", p.toFixed(3));
        inners[i].style.setProperty("--q", q.toFixed(3));
      });

      // No fim da página, a última seção fica ativa
      if (window.scrollY + vh >= document.documentElement.scrollHeight - 4) {
        activeId = pages[pages.length - 1].id;
      }

      if (activeId !== current) {
        current = activeId;
        navLinks.forEach(function (a) {
          var on = a.getAttribute("href") === "#" + activeId;
          a.classList.toggle("is-active", on);
          if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
        });
        dots.forEach(function (d) {
          var on = d.getAttribute("href") === "#" + activeId;
          d.classList.toggle("is-active", on);
          if (on) d.setAttribute("aria-current", "true"); else d.removeAttribute("aria-current");
        });
      }
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
  }

  /* ---------------------------------------------------------
     Início
     --------------------------------------------------------- */
  setupLanguage();
  setupMenu();
  setupTimeline();
  setupFilters();
  applyLanguage();
  loadRepos();
  setStagger();
  setupScroll();
  observeReveals();
})();
