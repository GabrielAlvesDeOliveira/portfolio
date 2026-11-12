# Portfólio Gabriel Alves

Site pessoal em HTML, CSS e JavaScript puro, feito a partir do protótipo "Portfólio v2" do Figma.

## Arquivos

- `index.html`: estrutura da página e a prévia do link (tags `og:` e `twitter:`)
- `style.css`: visual, responsivo e animações
- `script.js`: textos em PT e EN, linha do tempo, projetos do GitHub, árvores de skills e efeitos de rolagem
- `assets/foto.jpg`: foto do Sobre mim
- `assets/og-preview.jpg`: imagem que aparece quando o link é compartilhado
- `assets/Curriculo-GabrielAlves.pdf`: arquivo do botão "Baixar CV"

## Publicar no GitHub Pages

1. Envie todos os arquivos para a raiz de um repositório.
2. No repositório: Settings > Pages > Source: "Deploy from a branch", branch `main`, pasta `/ (root)`.
3. O site vai ficar em `https://gabrielalvesdeoliveira.github.io/portfolio/`. Se o endereço mudar, troque esse endereço nas tags `og:url`, `og:image` e `twitter:image` do `index.html` (a prévia do link só funciona com o endereço completo).

## Onde mudar cada coisa

- **Textos fixos (PT e EN):** objeto `I18N` no `script.js`
- **Trajetória:** lista `TIMELINE` no `script.js` (o ano aberto ao carregar é `activePeriod` em `state`, 0 = primeiro ano)
- **Skills:** lista `SKILLS` no `script.js` (nível 1 = básico, 2 = intermediário, 3 = avançado)
- **Projetos:** vêm sozinhos da API do GitHub (6 mais recentes, sem forks, privados ou arquivados). O mais recente ganha o card vermelho.
  - `EXCLUDE_REPOS`: repositórios que nunca aparecem (o próprio portfólio já está lá)
  - `REPO_TEXT`: descrição revisada em PT e EN por repositório. Se um repositório não estiver aqui, o site usa a descrição do GitHub.
- **Currículo:** substitua `assets/Curriculo-GabrielAlves.pdf` mantendo o mesmo nome.

## Observações

- A API do GitHub aceita 60 consultas por hora por visitante. O site guarda o resultado por 1 hora e, se a API falhar, mostra uma lista salva.
- Quem desativa animações no sistema (comum no Windows) continua vendo o fade-in, só sem deslocamento e zoom.
