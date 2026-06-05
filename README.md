# Landing Page — Izabella · Psicanálise &amp; Mentoria

Landing page institucional, **estática, responsiva e acessível**, para divulgar o trabalho da
Izabella — psicoterapeuta psicanalítica que atende mulheres em 9 países e oferece mentoria de
carreira e finanças para psicólogas.

Construída com **HTML semântico + CSS modular + JavaScript puro** (sem frameworks, sem build).

---

## ✨ Destaques

- **Sem dependências / sem build** — abra o `index.html` e funciona.
- **Responsiva** (mobile-first) com tipografia e espaçamentos fluidos (`clamp()`).
- **Acessível** — HTML semântico, navegação por teclado, `skip-link`, `aria-*`, foco visível e respeito a `prefers-reduced-motion`.
- **Performance** — imagens com `lazy-load`, `fetchpriority` no hero, CSS enxuto e JS leve com `IntersectionObserver`.
- **Identidade visual "Psi Planner"** — paleta vinho/bordô + pastéis e tipografia *Prata* (serifada) + *Inter* (sans).

---

## 📁 Estrutura de pastas

```
izabellapsi/
├── index.html                 # Página única (todas as seções)
├── README.md
├── CONTEUDO-A-SUBSTITUIR.md   # Lista de dados fictícios → reais (LEIA!)
│
├── assets/
│   ├── css/
│   │   ├── main.css           # Ponto de entrada (@import dos módulos)
│   │   ├── variables.css      # Design tokens (cores, fontes, espaços)
│   │   ├── base.css           # Reset + estilos base + acessibilidade
│   │   ├── layout.css         # Container, grids, seções
│   │   ├── components.css     # Botões, cards, pílulas, FAQ, depoimentos…
│   │   └── sections.css       # Header, hero, footer, animações de reveal
│   │
│   ├── js/
│   │   └── main.js            # Header, menu mobile, scroll-spy, reveal, FAQ
│   │
│   └── images/                # Fotos otimizadas, com nomes semânticos
│       └── izabella-hero.jpg
│
├── imgs/                      # Fotos originais (fonte) — local, fora do git
├── references/                # Identidade visual de referência (id.jpeg)
└── souce/                     # Material de origem (info.txt)
```

### Convenções (naming)

- **Arquivos / imagens:** `kebab-case`, com nome descritivo (`izabella-hero.jpg`).
- **CSS:** metodologia **BLOCK** inspirada em BEM — `.bloco__elemento--modificador`
  (ex.: `.card__icon--rose`, `.nav__link.is-active`).
- **Estados:** prefixo `is-` / `has-` (`.is-open`, `.is-scrolled`, `.is-visible`).
- **Design tokens:** todas as cores, fontes e espaçamentos vivem em `variables.css` (custom properties).

---

## 🚀 Como rodar

Por ser um site **estático**, basta um servidor de arquivos local (recomendado para que os
`@import` do CSS e o `fetch` de fontes funcionem sem bloqueios de CORS).

**Opção 1 — abrir direto:** dê duplo-clique em `index.html`.

**Opção 2 — servidor local (recomendado):**

```bash
# Python 3
python -m http.server 5500

# ou Node (npx)
npx serve .

# ou a extensão "Live Server" do VS Code
```

Depois acesse `http://localhost:5500`.

---

## 🎨 Identidade visual

| Token              | Valor      | Uso                              |
|--------------------|------------|----------------------------------|
| `--color-bg`       | `#faf7f5`  | Fundo claro (creme/off-white)    |
| `--color-wine`     | `#6a1f2b`  | Cor da marca / CTAs / seções de respiro |
| `--color-wine-800` | `#3a1419`  | "Night wine" / rodapé            |
| `--color-rose`     | `#f4d9dd`  | Pastel de apoio                  |
| `--color-green`    | `#dceada`  | Pastel de apoio                  |
| `--color-sand`     | `#f6efd4`  | Pastel de apoio                  |
| Fonte serifada     | **Prata**  | Títulos                          |
| Fonte sans         | **Inter**  | Texto corrido / interface        |

> Decisão de design: base **clara predominante** com **seções de respiro em vinho**
> (números, depoimentos e CTA final) para criar ritmo, contraste e sofisticação.

---

## 🧩 Seções da página

1. **Header** fixo com navegação e CTA
2. **Hero** — chamada principal + foto + prova social
3. **Sobre a Izabella**
4. **Frentes de atuação** — terapia (mulheres) × mentoria (psicólogas), peso igual
5. **Abordagem / temas** clínicos
6. **Faixa de números** (9 países, etc.)
7. **Para quem atende** — público-alvo
8. **Depoimentos**
9. **FAQ**
10. **CTA final + contato**
11. **Footer**

---

## ⚠️ Conteúdo fictício (placeholder)

O arquivo de origem `souce/info.txt` estava **vazio**, então textos, números, depoimentos e
contatos foram preenchidos com **placeholders de qualidade**. Tudo o que precisa ser trocado por
dados reais está catalogado em **[`CONTEUDO-A-SUBSTITUIR.md`](./CONTEUDO-A-SUBSTITUIR.md)** e
marcado no código com comentários `<!-- PLACEHOLDER: ... -->`. Números ilustrativos aparecem com `*`.

---

## ♿ Acessibilidade & Performance — checklist

- [x] Estrutura semântica (`header`, `main`, `section`, `nav`, `footer`, headings em ordem)
- [x] `skip-link` e foco visível
- [x] `alt` descritivo em todas as imagens
- [x] FAQ e menu operáveis por teclado, com `aria-expanded`/`aria-controls`
- [x] `prefers-reduced-motion` respeitado
- [x] Imagens com `width`/`height` (evita layout shift) e `loading="lazy"`
- [ ] Otimizar imagens (gerar `.webp`) antes de publicar — ver seção abaixo

### Otimização de imagens (sugestão)

```bash
# Exemplo com cwebp (gera versões .webp menores)
cwebp -q 78 assets/images/izabella-hero.jpg -o assets/images/izabella-hero.webp
```

Depois é possível servir via `<picture>` com fallback para `.jpg`.

---

## 📄 Licença / uso

Material de uso exclusivo da Izabella. Imagens e identidade visual pertencem à profissional.
