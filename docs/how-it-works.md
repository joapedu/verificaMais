# 🔎 Como o VerificaMais Funciona — Documentação Técnica e Pedagógica

> Este documento explica o funcionamento detalhado de cada jogo, a lógica de pontuação, o fluxo de navegação e as decisões de design para o público idoso.

---

## 🧭 Fluxo Geral de Navegação

```
Início (/)
    │
    ├─► Jogo 1 — Escolha o Golpe (/jogo1)
    │       └─► 10 rodadas → Tela de Resultado
    │
    ├─► Jogo 2 — Deslize a Notícia (/jogo2)
    │       └─► 20 cards → Tela de Resultado
    │
    └─► Jogo 3 — Jogo das Pistas (/jogo3)
            └─► 20 rodadas → Tela de Resultado
```

A pontuação é **persistida no dispositivo** (localStorage via Zustand Persist) e acumulada entre os três jogos. O usuário pode zerar a pontuação na tela inicial.

---

## 🎯 Jogo 1 — Escolha o Golpe

### Objetivo Pedagógico
Treinar o reconhecimento de padrões típicos de golpe em conversas de WhatsApp, comparando-os com mensagens legítimas do cotidiano.

### Mecânica

1. **Apresentação:** Duas conversas de WhatsApp são exibidas simultaneamente (lado a lado em desktop, empilhadas em mobile).
2. **Seleção:** O usuário toca no botão "🎯 Este é o Golpe!" abaixo da conversa que considerar suspeita.
3. **Feedback imediato:** Um overlay aparece com:
   - ✅ CORRETO (verde) ou ❌ ERRADO (vermelho)
   - Explicação educativa sobre o tipo de golpe
   - Lista dos "sinais de alerta" presentes na conversa falsa, destacados em vermelho
4. **Próxima rodada:** O usuário avança ao tocar "Próxima Rodada"

### Aleatoriedade
- As 10 rodadas são apresentadas em **ordem aleatória** a cada novo jogo
- O lado (esquerda/direita) onde o golpe aparece é **randomizado** em cada rodada

### Pontuação
| Resultado | Pontos |
|-----------|--------|
| Acerto | +10 pontos |
| Erro | 0 pontos |
| Máximo por jogo | 100 pontos |

### Imagens Utilizadas
- `image-01` a `image-10`: capas visuais dos golpes
- `image-11` a `image-20`: capas visuais das mensagens legítimas

### Os 10 Cenários de Golpe

| # | Golpe | Mensagem Legítima |
|---|-------|------------------|
| 1 | Falso Banco Itaú com link bit.ly | Filha avisando que chegou bem |
| 2 | INSS falso com "benefícios não resgatados" | Clínica confirmando consulta médica |
| 3 | SERASA falso com ameaça de dívida | Farmácia notificando medicamento disponível |
| 4 | "WhatsApp vai cobrar" | Neto enviando parabéns |
| 5 | PIX falso pedindo "liberação" | Academia lembrando mensalidade |
| 6 | ANATEL falsa ameaçando cancelar linha | Veterinária com atualização do pet |
| 7 | Amazon Prime falso pedindo dados do cartão | Sobrinha agradecendo aluguel |
| 8 | Receita Federal falsa com débito | Supermercado avisando sobre encomenda |
| 9 | "Neto em apuros" (golpe do falso parente) | Plano de saúde confirmando consulta |
| 10 | Caixa Econômica falsa com FGTS | Vizinha informando sobre gato encontrado |

---

## 📰 Jogo 2 — Deslize a Notícia

### Objetivo Pedagógico
Desenvolver pensamento crítico sobre fontes de notícias, identificando características de fake news (linguagem alarmista, fontes não confiáveis, ausência de referências) versus notícias reais de órgãos oficiais.

### Mecânica

1. **Apresentação:** Um card de notícia aparece com:
   - Imagem (aspect ratio 16:9)
   - Categoria (Saúde, Tecnologia, Política, etc.)
   - Título em destaque
   - Trecho do "artigo"
   - Fonte e data de publicação
2. **Decisão:** O usuário pode:
   - **Arrastar** o card para a esquerda (fake news) ou direita (real)
   - **Ou** tocar nos botões grandes "← FALSA" e "REAL →"
3. **Indicadores visuais:** Ao arrastar, etiquetas "FALSA" (vermelha) e "REAL" (verde) aparecem nas laterais com intensidade proporcional à distância do arraste
4. **Feedback:** Overlay com resultado, explicação e sinais de alerta (para fake news)

### Pontuação
| Resultado | Pontos |
|-----------|--------|
| Acerto | +5 pontos |
| Erro | 0 pontos |
| Máximo por jogo | 100 pontos |

### Imagens Utilizadas
- `image-21` a `image-30`: capas das fake news
- `image-31` a `image-40`: capas das notícias reais

### As 20 Notícias

#### Fake News (image-21 a image-30)
| # | Manchete | Tipo |
|---|---------|------|
| 21 | Chá de canela com limão cura diabetes em 7 dias | Saúde |
| 22 | 5G causa doenças; OMS investiga em segredo | Tecnologia |
| 23 | Novo vírus mais mortal que COVID circula no Brasil | Saúde |
| 24 | Governo libera saque de R$5.000 do FGTS para +60 | Finanças |
| 25 | Médico: bicarbonato reverte Alzheimer | Saúde |
| 26 | PIX esvazia conta só de receber transferência | Finanças |
| 27 | Vitamina D em megadose cura depressão | Saúde |
| 28 | Assassino foge de presídio em SP | Segurança |
| 29 | Lei cancela aposentadoria de quem tem imóvel | Política |
| 30 | WhatsApp vai cobrar R$3,50 por semana | Tecnologia |

#### Notícias Reais (image-31 a image-40)
| # | Manchete | Fonte |
|---|---------|-------|
| 31 | INSS anuncia reajuste de 4,1% | Agência Brasil |
| 32 | Vacinação contra gripe expandida | Ministério da Saúde |
| 33 | Banco Central lança ferramenta PIX | Banco Central |
| 34 | Curso gratuito de celular para idosos | Prefeitura SP |
| 35 | Telemedicina pelo SUS | Ministério da Saúde |
| 36 | Procon lista golpes contra idosos | Procon-SP |
| 37 | Anvisa aprova vacina contra RSV | Anvisa |
| 38 | Senado aprova aumento do BPC | Senado Federal |
| 39 | Guia do Estatuto do Idoso | Min. Direitos Humanos |
| 40 | Isenção de IR para aposentados +65 | Receita Federal |

---

## 🔍 Jogo 3 — Jogo das Pistas

### Objetivo Pedagógico
Desenvolver a capacidade analítica de identificar situações suspeitas com base em evidências graduais, incentivando o usuário a **pensar antes de agir** — prática fundamental para evitar golpes e fake news.

### Mecânica

1. **Apresentação:** Um card com imagem, categoria e título da situação
2. **Pistas progressivas:** Três botões "Revelar Pista" ficam disponíveis
   - Cada pista revelada reduz 1 ponto do prêmio máximo
   - Pistas revelam detalhes crescentemente suspeitos (ou confiáveis)
3. **Resposta:** A qualquer momento, o usuário escolhe entre:
   - 🚨 **Golpe!** — tentativa de roubo/fraude
   - 📰 **Fake News!** — notícia falsa
   - ✅ **Verdadeiro!** — informação legítima
4. **Feedback:** Resultado com explicação detalhada

### Sistema de Pontuação com Pistas
| Pistas Reveladas | Pontos se Correto |
|-----------------|------------------|
| 0 pistas | 3 pontos |
| 1 pista | 2 pontos |
| 2 pistas | 1 ponto |
| 3 pistas | 0 pontos |
| Resposta errada | 0 pontos |
| Máximo por jogo | 60 pontos |

### As 20 Situações do Jogo 3

| # | Situação | Resposta | Imagem |
|---|---------|---------|--------|
| 1 | Mensagem sobre PIX bloqueado | GOLPE | image-05 |
| 2 | Post sobre bicarbonato cura Alzheimer | FAKE NEWS | image-25 |
| 3 | Ferramenta do Banco Central para PIX | VERDADEIRO | image-33 |
| 4 | "Neto" pedindo dinheiro em número novo | GOLPE | image-09 |
| 5 | Lei que cancela aposentadoria de imóvel | FAKE NEWS | image-29 |
| 6 | Anvisa aprova vacina contra RSV | VERDADEIRO | image-37 |
| 7 | INSS com "benefícios não resgatados" | GOLPE | image-02 |
| 8 | PIX "esvazia conta" ao receber | FAKE NEWS | image-26 |
| 9 | Curso de celular gratuito na prefeitura | VERDADEIRO | image-34 |
| 10 | Amazon Prime cobrando por WhatsApp | GOLPE | image-07 |
| 11 | Chá de canela cura diabetes | FAKE NEWS | image-21 |
| 12 | Estatuto do Idoso garante direitos | VERDADEIRO | image-39 |
| 13 | WhatsApp vai cobrar R$0,99 | GOLPE | image-04 |
| 14 | 5G causa doenças; OMS esconde | FAKE NEWS | image-22 |
| 15 | INSS confirma reajuste 4,1% | VERDADEIRO | image-31 |
| 16 | Caixa libera FGTS pelo link | GOLPE | image-10 |
| 17 | Assassino foge de presídio em SP | FAKE NEWS | image-28 |
| 18 | Procon lista golpes contra idosos | VERDADEIRO | image-36 |
| 19 | SERASA cobra dívida por WhatsApp | GOLPE | image-03 |
| 20 | Isenção de IR para aposentados +65 | VERDADEIRO | image-40 |

---

## ♿ Guia de Acessibilidade Implementado

### Escalas de Fonte
O botão flutuante de acessibilidade (canto inferior direito) permite alterar o tamanho do texto:

| Escala | Tamanho Base | Classe |
|--------|-------------|--------|
| Normal | 18px | `--font-scale: 1` |
| Grande | ~22px | `--font-scale: 1.2` |
| Muito Grande | ~26px | `--font-scale: 1.45` |

A escala é aplicada via CSS custom property `--font-scale` na tag `<html>`.

### Alto Contraste
Ativado pela classe `.hc` na tag `<html>`. Altera:
- Fundo: `#000`
- Cards: `#111`
- Textos secundários: `#bbb`
- Bordas: `#555`

### Alvos de Toque Mínimos
Todos os elementos clicáveis têm `min-height: 64px` e `min-width: 64px`, seguindo as diretrizes WCAG 2.5.5 (AA+).

### Navegação por Teclado
Todos os "botões" que usam `div`/`span` têm:
- `role="button"`
- `tabIndex={0}`
- `onKeyDown` com suporte a `Enter`

---

## 💾 Persistência de Dados

Os dados são salvos no **localStorage** do dispositivo via Zustand Persist. Nenhum dado é enviado a servidores externos.

Chave de armazenamento: `verifica-mais-v1`

Dados salvos:
```json
{
  "scores": { "jogo1": 0, "jogo2": 0, "jogo3": 0 },
  "totalScore": 0,
  "fontScale": 1,
  "highContrast": false
}
```

---

## 🎨 Sistema de Design

### Cores Principais
| Token | Hex | Uso |
|-------|-----|-----|
| Primary 700 | `#1d4ed8` | Botões primários, links |
| Primary 900 | `#1e3a8a` | Header, hero |
| Success | `#16a34a` | Acerto, notícia real, legítimo |
| Danger | `#dc2626` | Erro, fake news, golpe |
| Warning | `#d97706` | Fake news amarela |

### Tipografia
- **Família:** Inter (Google Fonts)
- **Base:** 18px (escalável via `--font-scale`)
- **Pesos usados:** 400, 500, 600, 700, 800, 900

### Animações (Framer Motion)
| Animação | Uso |
|---------|-----|
| `bounce-in` | Entrada do FeedbackOverlay |
| `slide-up` | Entrada de elementos em sequência |
| `fade-in` | Transições suaves |
| `float` | Ícone do escudo na home |
| Swipe drag | Arraste de cards no Jogo 2 |
| Spring transitions | Feedback de seleção nos jogos |

---

*Documentação gerada automaticamente junto com o projeto VerificaMais.*
