# 🛡️ Verifica+

> **Sistema educativo gamificado de conscientização sobre golpes digitais e fake news, desenvolvido especialmente para a terceira idade.**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-ff6b6b)](https://framer.com/motion)

---

## 📖 Sobre o Projeto

O **VerificaMais** é uma plataforma educativa que ensina pessoas idosas a identificar golpes digitais e notícias falsas (fake news) através de jogos interativos e dinâmicos. O sistema foi projetado com **acessibilidade como prioridade**, seguindo as diretrizes WCAG AAA para garantir uma experiência inclusiva.

### 🎯 Público-Alvo

- Pessoas acima de 60 anos
- Usuários com pouca familiaridade com tecnologia
- Qualquer pessoa que queira aprender a se proteger online

### 🏆 Por que gamificar?

A gamificação aumenta o engajamento e a retenção de informação. Ao errar em um jogo, o usuário recebe explicações claras sobre o porquê da resposta correta transformando cada erro em aprendizado, sem julgamentos.

---

## 🎮 Os Três Jogos

### 1. 🎯 Escolha o Golpe
Duas conversas de WhatsApp são exibidas lado a lado. Uma é uma tentativa real de golpe; a outra é uma conversa legítima. O usuário deve identificar qual é a ameaça.

**Aprende:** Reconhecer padrões de golpe em mensagens do WhatsApp.

### 2. 📰 Deslize a Notícia
Estilo "Tinder": cards de notícias aparecem um por um. O usuário arrasta para a **esquerda** (notícia falsa) ou para a **direita** (notícia real). Funciona com toque na tela ou botões grandes.

**Aprende:** Identificar características de fake news e fontes confiáveis.

### 3. 🔍 Jogo das Pistas
Ao estilo "Quem quer ser um milionário?": o usuário vê uma situação e pode revelar até 3 pistas progressivas. Quanto mais pistas usar, menos pontos ganha. Por fim, decide: **Golpe**, **Fake News** ou **Verdadeiro**.

**Aprende:** Raciocínio crítico e análise de evidências antes de tomar uma decisão.

---

## ♿ Acessibilidade

| Recurso | Implementação |
|---------|---------------|
| Fonte grande | Base em 18px, ajustável para 22px ou 26px via botão |
| Alto contraste | Modo alternativo com fundo preto e texto branco |
| Alvos de toque | Mínimo de 64×64px em todos os botões |
| Linguagem simples | PT-BR sem jargão técnico |
| Sem limite de tempo | O usuário lê e responde no próprio ritmo |
| Feedback sonoro | Sons de acerto/erro gerados por Web Audio API |
| ARIA completo | `role`, `aria-label`, `aria-live` em todos os elementos interativos |
| Responsivo | Funciona em smartphones, tablets e desktops |

---

## 🗂️ Estrutura das Imagens

As 40 imagens ficam em `public/images/` com o padrão `image-NN.svg` (ou `.jpg`):

| Faixa | Tipo | Usado em |
|-------|------|----------|
| `image-01` a `image-10` | Golpes / scam | Jogo 1 |
| `image-11` a `image-20` | Mensagens legítimas | Jogo 1 |
| `image-21` a `image-30` | Fake news | Jogo 2 + Jogo 3 |
| `image-31` a `image-40` | Notícias reais | Jogo 2 + Jogo 3 |

> **Para substituir os placeholders:** coloque suas imagens reais com os mesmos nomes (`image-01.jpg`, etc.). Atualize a extensão no respectivo arquivo `src/data/jogo*.ts` se necessário.

---

## 🚀 Instalação e Uso

### Pré-requisitos
- Node.js 18 ou superior
- npm 9 ou superior

### Passo a passo

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/verificamais.git
cd verificamais

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

### Gerar imagens placeholder

```bash
npm run generate-images
```

---

## 🛠️ Stack Tecnológica

| Tecnologia | Versão | Função |
|-----------|--------|--------|
| [Next.js](https://nextjs.org) | 14 | Framework React com App Router |
| [TypeScript](https://typescriptlang.org) | 5 | Tipagem estática |
| [Tailwind CSS](https://tailwindcss.com) | 3 | Estilização utilitária |
| [Framer Motion](https://framer.com/motion) | 11 | Animações e gestos de swipe |
| [Zustand](https://zustand-demo.pmnd.rs) | 4 | Gerenciamento de estado global |
| [Lucide React](https://lucide.dev) | 0.400 | Ícones SVG |

---

## 📁 Estrutura do Projeto

```
verifica+/
├── public/
│   └── images/              # 40 imagens (01–40)
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Layout raiz
│   │   ├── page.tsx         # Página inicial (seleção de jogos)
│   │   ├── jogo1/page.tsx   # Escolha o Golpe
│   │   ├── jogo2/page.tsx   # Deslize a Notícia
│   │   └── jogo3/page.tsx   # Jogo das Pistas
│   ├── components/          # Componentes reutilizáveis
│   ├── data/                # Conteúdo dos jogos (PT-BR)
│   ├── hooks/               # useSound
│   ├── lib/                 # Utilitários (cn, shuffle)
│   └── store/               # Estado global (Zustand)
├── docs/                    # Esta documentação
└── scripts/                 # Geração de imagens placeholder
```

---

## ➕ Adicionando Novos Cenários

### Novo par no Jogo 1

Edite `src/data/jogo1.ts` e adicione ao array `jogo1Rounds`:

```typescript
{
  id: 11,
  scam: {
    id: 'r11-scam',
    imageId: 'image-01', // reutilize ou adicione nova imagem
    contactName: 'Nome do Contato Falso',
    contactEmoji: '💳',
    messages: [
      { id: 'm1', text: 'Mensagem suspeita aqui', isFromContact: true, isRedFlag: true },
    ],
    redFlags: ['Motivo 1 pelo qual é suspeito', 'Motivo 2'],
    explanation: 'Explicação educativa sobre este golpe.',
  },
  legit: {
    id: 'r11-legit',
    imageId: 'image-11',
    contactName: 'Nome Legítimo',
    contactEmoji: '👤',
    messages: [
      { id: 'm4', text: 'Mensagem normal aqui', isFromContact: true },
    ],
    redFlags: [],
    explanation: 'Por que esta mensagem é legítima.',
  },
}
```

---

## 📄 Licença

MIT License — consulte o arquivo `LICENSE` para detalhes.

---

## 🤝 Contribuições

Pull requests são bem-vindos! Para mudanças maiores, abra uma Issue primeiro para discutir o que você gostaria de alterar.

---

*Feito com ❤️ para proteger a terceira idade no mundo digital.*
