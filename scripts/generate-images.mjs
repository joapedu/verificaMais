/**
 * Generate 40 illustrative SVG images for VerificaMais (680 × 480, ratio 17:12)
 *
 * 01–10  WhatsApp scam conversations (golpes)
 * 11–20  WhatsApp legitimate conversations
 * 21–30  Fake news article cards
 * 31–40  Real news article cards
 */

import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = join(__dirname, '..', 'public', 'images')
mkdirSync(OUT, { recursive: true })

// ─── helpers ──────────────────────────────────────────────────────────────

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** Wrap text into lines, each at most maxCh chars */
function wrap(text, maxCh) {
  const words = text.split(' ')
  const lines = []
  let cur = ''
  for (const w of words) {
    const trial = cur ? cur + ' ' + w : w
    if (trial.length > maxCh && cur) { lines.push(cur); cur = w }
    else cur = trial
  }
  if (cur) lines.push(cur)
  return lines
}

// ─── WhatsApp-style screenshot (01-20) ────────────────────────────────────
// W=680, H=480  →  ratio 17:12
// Large fonts so text is readable at small display sizes.
// BODY_FONT=18px, LINE_H=26px
// At game display ~380px wide: scale≈0.56 → 18px→10px (min readable for elderly w/ large buttons)

const BODY_FONT = 19
const LINE_H    = 28
const BPAD      = 12   // bubble inner padding (top/bottom)
const HPAD      = 14   // bubble left/right padding

function renderBubbles(messages, startY, maxY) {
  let cy = startY
  const parts = []

  for (const m of messages) {
    if (cy >= maxY - 50) break
    const lines = wrap(m.text, 38)
    const bh = lines.length * LINE_H + BPAD * 2
    const charMax = lines.reduce((mx, l) => Math.max(mx, l.length), 0)
    const bw = Math.min(590, Math.max(180, charMax * 9.5 + HPAD * 2 + 6))

    parts.push(`<rect x="18" y="${cy}" width="${bw}" height="${bh}" rx="14" fill="white" filter="url(#bs)"/>`)
    parts.push(`<polygon points="18,${cy + 14} 4,${cy + 24} 18,${cy + 32}" fill="white"/>`)

    lines.forEach((l, i) => {
      parts.push(`<text x="${18 + HPAD}" y="${cy + BPAD + BODY_FONT + i * LINE_H}" font-family="Arial,sans-serif" font-size="${BODY_FONT}" fill="#111">${esc(l)}</text>`)
    })

    if (m.time) {
      parts.push(`<text x="${18 + bw - 6}" y="${cy + bh - 5}" text-anchor="end" font-family="Arial,sans-serif" font-size="11" fill="#999">${esc(m.time)}</text>`)
    }

    cy += bh + 12
  }
  return parts.join('\n    ')
}

function makeWhatsApp({ contactName, contactInitial, headerColor, badge, messages }) {
  const W = 680, H = 480
  const bubbles = renderBubbles(messages, 112, H - 10)

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="bs" x="-4%" y="-4%" width="110%" height="115%">
      <feDropShadow dx="0" dy="1" stdDeviation="2" flood-color="rgba(0,0,0,0.12)"/>
    </filter>
    <clipPath id="fr"><rect width="${W}" height="${H}" rx="10"/></clipPath>
  </defs>
  <g clip-path="url(#fr)">
    <!-- WhatsApp wallpaper background -->
    <rect width="${W}" height="${H}" fill="#dfe7ed"/>
    <!-- Status bar -->
    <rect width="${W}" height="26" fill="${headerColor}"/>
    <text x="14" y="18" font-family="Arial,sans-serif" font-size="12" fill="white" font-weight="bold">9:41</text>
    <text x="${W - 14}" y="18" font-family="Arial,sans-serif" font-size="11" fill="white" text-anchor="end">&#9646;&#9646; &#9646;</text>
    <!-- Header bar -->
    <rect y="26" width="${W}" height="62" fill="${headerColor}"/>
    <!-- Back arrow -->
    <text x="14" y="66" font-family="Arial,sans-serif" font-size="28" fill="white" font-weight="bold">&#8249;</text>
    <!-- Avatar -->
    <circle cx="60" cy="57" r="25" fill="${badge || '#25D366'}"/>
    <text x="60" y="65" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" fill="white" font-weight="bold">${esc(contactInitial)}</text>
    <!-- Contact name -->
    <text x="96" y="50" font-family="Arial,sans-serif" font-size="17" fill="white" font-weight="bold">${esc(contactName)}</text>
    <text x="96" y="72" font-family="Arial,sans-serif" font-size="12" fill="rgba(255,255,255,0.75)">Online agora</text>
    <!-- Date separator -->
    <rect x="270" y="92" width="140" height="22" rx="11" fill="rgba(0,0,0,0.1)"/>
    <text x="340" y="107" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" fill="#555">Hoje</text>
    <!-- Message bubbles -->
    ${bubbles}
  </g>
</svg>`
}

// ─── News article card (21-40) ─────────────────────────────────────────────
// W=680, H=480
// Top zone  (y 0–200): gradient background + large icon
// Bottom zone (y 200–480): WHITE background for readable text
//   y=200-232: source band (coloured)
//   y=242:     date (small)
//   y=258:     badge
//   y=290:     headline (30px, up to 3 lines, 30px line-height)
//   y=385:     excerpt (17px, up to 2 lines, 22px line-height)
// No element overlaps another.

function makeNewsCard({ isFake, headline, source, excerpt, date, badgeText, badgeColor, bgGradient, icon, sourceColor }) {
  const W = 680, H = 480
  const SPLIT = 200

  // Headline: 28 chars/line at 30px font
  const hLines = wrap(headline, 28).slice(0, 3)
  const eLines = wrap(excerpt, 56).slice(0, 2)

  const hStart  = 295
  const hLineH  = 34
  const eStart  = hStart + hLines.length * hLineH + 10
  const eLineH  = 22

  // Top/bottom alert accent for fake news
  const accentTop    = isFake ? `<rect width="${W}" height="9" fill="#DC2626"/>` : `<rect width="${W}" height="9" fill="#1565C0"/>`
  const accentBottom = isFake ? `<rect y="${H - 9}" width="${W}" height="9" fill="#DC2626"/>` : ''

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      ${bgGradient}
    </linearGradient>
    <clipPath id="fr"><rect width="${W}" height="${H}"/></clipPath>
  </defs>
  <g clip-path="url(#fr)">
    <!-- ── TOP ILLUSTRATION ZONE (y 0–200) ── -->
    <rect width="${W}" height="${SPLIT}" fill="url(#bg)"/>
    <rect width="${W}" height="${SPLIT}" fill="rgba(0,0,0,0.18)"/>
    <!-- Big icon centred vertically in top zone -->
    <text x="${W / 2}" y="138" text-anchor="middle" font-family="Arial,sans-serif"
          font-size="104" fill="rgba(255,255,255,0.88)">${icon}</text>

    <!-- ── BOTTOM TEXT ZONE (y 200–480, white) ── -->
    <rect y="${SPLIT}" width="${W}" height="${H - SPLIT}" fill="white"/>

    <!-- Source band -->
    <rect y="${SPLIT}" width="${W}" height="34" fill="${sourceColor}"/>
    <text x="16" y="${SPLIT + 23}" font-family="Arial,sans-serif" font-size="16"
          font-weight="bold" fill="white">${esc(source)}</text>
    <text x="${W - 16}" y="${SPLIT + 23}" text-anchor="end" font-family="Arial,sans-serif"
          font-size="13" fill="rgba(255,255,255,0.82)">${esc(date)}</text>

    <!-- Badge -->
    <rect x="16" y="248" width="${Math.max(70, badgeText.length * 8 + 20)}" height="24" rx="12" fill="${badgeColor}"/>
    <text x="26" y="264" font-family="Arial,sans-serif" font-size="12" font-weight="bold" fill="white">${esc(badgeText)}</text>

    <!-- Headline (large, dark) -->
    ${hLines.map((l, i) =>
      `<text x="16" y="${hStart + i * hLineH}" font-family="Arial,sans-serif"
             font-size="30" font-weight="900" fill="#111">${esc(l)}</text>`
    ).join('\n    ')}

    <!-- Excerpt (smaller, grey) -->
    ${eLines.map((l, i) =>
      `<text x="16" y="${eStart + i * eLineH}" font-family="Arial,sans-serif"
             font-size="17" fill="#444">${esc(l)}</text>`
    ).join('\n    ')}

    <!-- Accent bands -->
    ${accentTop}
    ${accentBottom}
  </g>
</svg>`
}

// ─── Image definitions ─────────────────────────────────────────────────────

const images = [
  // ── GOLPES 01–10 ──
  {
    num: 1, type: 'whatsapp',
    contactName: 'Banco Itau Seguranca', contactInitial: '!',
    headerColor: '#B71C1C', badge: '#EF5350',
    messages: [
      { text: 'ALERTA DE SEGURANCA URGENTE', time: '10:23' },
      { text: 'Detectamos acesso SUSPEITO na sua conta.', time: '10:23' },
      { text: 'Conta sera BLOQUEADA em 24 horas!', time: '10:23' },
      { text: 'Clique AGORA: bit.ly/itau-seguro99', time: '10:24' },
    ]
  },
  {
    num: 2, type: 'whatsapp',
    contactName: 'INSS Digital Oficial', contactInitial: 'I',
    headerColor: '#0D47A1', badge: '#1976D2',
    messages: [
      { text: 'Prezado beneficiario do INSS:', time: '09:15' },
      { text: 'R$3.487,20 em BENEFICIOS NAO RESGATADOS!', time: '09:15' },
      { text: 'PRAZO FINAL: 72 horas.', time: '09:16' },
      { text: 'Acesse: inss-beneficios.com/resgatar', time: '09:16' },
    ]
  },
  {
    num: 3, type: 'whatsapp',
    contactName: 'SERASA Consultas', contactInitial: 'S',
    headerColor: '#BF360C', badge: '#FF5722',
    messages: [
      { text: 'URGENTE: Seu CPF esta NEGATIVADO', time: '11:02' },
      { text: 'Divida: R$4.320,00 registrada em seu nome.', time: '11:02' },
      { text: '80% DE DESCONTO! serasa-limpa.online', time: '11:03' },
      { text: 'Oferta expira em 48h. Regularize agora!', time: '11:03' },
    ]
  },
  {
    num: 4, type: 'whatsapp',
    contactName: 'WhatsApp Premium', contactInitial: 'W',
    headerColor: '#1B5E20', badge: '#43A047',
    messages: [
      { text: 'A partir de amanha o WhatsApp sera PAGO.', time: '14:30' },
      { text: 'Pague apenas R$0,99/mes para continuar.', time: '14:30' },
      { text: 'Acesse: whatsapp-premium.com/ativar', time: '14:31' },
      { text: 'Sem pagamento: conta desativada em 24h.', time: '14:31' },
    ]
  },
  {
    num: 5, type: 'whatsapp',
    contactName: 'Suporte PIX Banco Central', contactInitial: 'P',
    headerColor: '#1B5E20', badge: '#2E7D32',
    messages: [
      { text: 'ATENCAO: PIX de R$5.000,00 BLOQUEADO!', time: '08:45' },
      { text: 'Suspeita de fraude detectada no sistema.', time: '08:45' },
      { text: 'Confirme em: pix-liberacao.com/confirmar', time: '08:46' },
      { text: 'Informe CPF e senha. Prazo: 2 horas.', time: '08:46' },
    ]
  },
  {
    num: 6, type: 'whatsapp',
    contactName: 'ANATEL Telecomunicacoes', contactInitial: 'A',
    headerColor: '#0D47A1', badge: '#1565C0',
    messages: [
      { text: 'Notificacao: Sua linha sera CANCELADA', time: '15:20' },
      { text: 'em 48 horas por cadastro desatualizado.', time: '15:20' },
      { text: 'Regularize: anatel-cadastro.gov-br.com', time: '15:21' },
      { text: 'Informe RG, CPF e foto de documento.', time: '15:21' },
    ]
  },
  {
    num: 7, type: 'whatsapp',
    contactName: 'Amazon Prime Suporte', contactInitial: '@',
    headerColor: '#E65100', badge: '#FF6D00',
    messages: [
      { text: 'Sua assinatura Amazon Prime foi renovada.', time: '07:30' },
      { text: 'Cobranca de R$39,90 realizada hoje.', time: '07:30' },
      { text: 'Para CANCELAR acesse: amazon-br.com', time: '07:31' },
      { text: '/cancelar-prime - informe login e senha.', time: '07:31' },
    ]
  },
  {
    num: 8, type: 'whatsapp',
    contactName: 'Receita Federal Brasil', contactInitial: 'R',
    headerColor: '#1B5E20', badge: '#388E3C',
    messages: [
      { text: 'INTIMACAO FISCAL - Codigo 4521-B', time: '13:10' },
      { text: 'Debito tributario de R$3.200,00 no CPF!', time: '13:10' },
      { text: 'Risco de processo criminal. Regularize:', time: '13:11' },
      { text: 'receitafederal.gov.br-divida.com', time: '13:11' },
    ]
  },
  {
    num: 9, type: 'whatsapp',
    contactName: 'Neto Rodrigo (novo numero)', contactInitial: 'R',
    headerColor: '#37474F', badge: '#607D8B',
    messages: [
      { text: 'Vovo! Sou o Rodrigo, troquei de celular!', time: '16:45' },
      { text: 'Estou em apuros e preciso de R$2.500!', time: '16:45' },
      { text: 'Manda PIX: 123.456.789-00 (amigo meu).', time: '16:46' },
      { text: 'Nao conta pro papai. Te pago semana que vem!', time: '16:46' },
    ]
  },
  {
    num: 10, type: 'whatsapp',
    contactName: 'CAIXA FGTS Digital', contactInitial: 'C',
    headerColor: '#0D47A1', badge: '#1976D2',
    messages: [
      { text: 'Trabalhador, seu FGTS foi LIBERADO!', time: '10:00' },
      { text: 'Valor disponivel: R$8.435,00', time: '10:00' },
      { text: 'Saque em: caixa-fgts.com/sacar', time: '10:01' },
      { text: 'ATENCAO: Prazo de 24h! Nao perca!', time: '10:01' },
    ]
  },

  // ── LEGITIMO 11–20 ──
  {
    num: 11, type: 'whatsapp',
    contactName: 'Ana (Filha)', contactInitial: 'A',
    headerColor: '#00695C', badge: '#26A69A',
    messages: [
      { text: 'Mae! Ja cheguei bem em Sao Paulo!', time: '18:32' },
      { text: 'Voo otimo, sem turbulencia. Hotel bom.', time: '18:33' },
      { text: 'Amanha reuniao as 9h. Te ligo depois!', time: '18:33' },
      { text: 'Amo voce! Boa noite e beijo grande', time: '18:34' },
    ]
  },
  {
    num: 12, type: 'whatsapp',
    contactName: 'Clinica Sao Lucas', contactInitial: 'C',
    headerColor: '#00695C', badge: '#00897B',
    messages: [
      { text: 'Ola! Confirmamos sua consulta:', time: '08:00' },
      { text: 'Dr. Carlos Mendes - Cardiologia', time: '08:00' },
      { text: 'Quinta-feira, 26/06 as 14h30', time: '08:01' },
      { text: 'Traga documento. Tel: (11) 3456-7890', time: '08:01' },
    ]
  },
  {
    num: 13, type: 'whatsapp',
    contactName: 'Farmacia Saude Total', contactInitial: 'F',
    headerColor: '#0D47A1', badge: '#1565C0',
    messages: [
      { text: 'Bom dia! Seu pedido esta pronto.', time: '09:15' },
      { text: 'Medicamento: Losartana 50mg (3 caixas)', time: '09:15' },
      { text: 'Valor: R$38,50 com desconto convenio.', time: '09:16' },
      { text: 'Seg a Sab, 8h as 20h. (11) 4567-8901', time: '09:16' },
    ]
  },
  {
    num: 14, type: 'whatsapp',
    contactName: 'Neto Lucas', contactInitial: 'L',
    headerColor: '#4A148C', badge: '#7B1FA2',
    messages: [
      { text: 'Feliz aniversario, vovo!!!', time: '07:01' },
      { text: 'Que Deus te abencoe com saude!', time: '07:01' },
      { text: 'Vamos la jantar com voce a noite, ta?', time: '07:02' },
      { text: 'Te amo muito! Beijos da familia', time: '07:02' },
    ]
  },
  {
    num: 15, type: 'whatsapp',
    contactName: 'Academia Viver Bem', contactInitial: 'V',
    headerColor: '#E65100', badge: '#F57C00',
    messages: [
      { text: 'Ola! Lembrete de mensalidade:', time: '10:30' },
      { text: 'Vencimento: 05/07 - Valor: R$89,00', time: '10:30' },
      { text: 'PIX: academia@vivrbem.com.br', time: '10:31' },
      { text: 'Duvidas: (11) 3456-7890. Bons treinos!', time: '10:31' },
    ]
  },
  {
    num: 16, type: 'whatsapp',
    contactName: 'Vet Amigo Fiel', contactInitial: 'V',
    headerColor: '#2E7D32', badge: '#43A047',
    messages: [
      { text: 'Ola! O Tobias passou bem na cirurgia!', time: '14:00' },
      { text: 'Esta acordando da anestesia, tranquilo.', time: '14:01' },
      { text: 'Pode buscar amanha a partir das 9h.', time: '14:01' },
      { text: 'Retorno em 10 dias para tirar pontos.', time: '14:02' },
    ]
  },
  {
    num: 17, type: 'whatsapp',
    contactName: 'Sobrinha Mariana', contactInitial: 'M',
    headerColor: '#880E4F', badge: '#AD1457',
    messages: [
      { text: 'Tia Sonia! Obrigada pelo presente!', time: '19:45' },
      { text: 'Adorei o livro de receitas!', time: '19:46' },
      { text: 'No sabado eu apareco la em casa, ta?', time: '19:46' },
      { text: 'Beijo grande! Saudade de voce!', time: '19:47' },
    ]
  },
  {
    num: 18, type: 'whatsapp',
    contactName: 'Supermercado Extra', contactInitial: 'E',
    headerColor: '#1A237E', badge: '#283593',
    messages: [
      { text: 'Ola! Seu pedido #4521 esta pronto.', time: '11:00' },
      { text: 'Itens: Arroz, Feijao, Azeite e mais.', time: '11:01' },
      { text: 'Total: R$156,80. Retire ate as 18h.', time: '11:01' },
      { text: 'Duvidas: (11) 4000-1234', time: '11:02' },
    ]
  },
  {
    num: 19, type: 'whatsapp',
    contactName: 'Unimed Saude', contactInitial: 'U',
    headerColor: '#01579B', badge: '#0288D1',
    messages: [
      { text: 'Ola! Consulta confirmada:', time: '16:00' },
      { text: 'Oftalmologia - Dra. Fernanda Luz', time: '16:00' },
      { text: 'Segunda-feira, 30/06 as 10h.', time: '16:01' },
      { text: 'Cancelamentos: 0800-722-4848', time: '16:01' },
    ]
  },
  {
    num: 20, type: 'whatsapp',
    contactName: 'Dona Ivone (Vizinha)', contactInitial: 'I',
    headerColor: '#33691E', badge: '#558B2F',
    messages: [
      { text: 'Oi Conceicao! Boa noticia:', time: '08:20' },
      { text: 'Achei o Mingau aqui no meu quintal!', time: '08:20' },
      { text: 'Ele esta bem, so com fome.', time: '08:21' },
      { text: 'Pode vir buscar. Estou ate o meio-dia.', time: '08:21' },
    ]
  },

  // ── FAKE NEWS 21–30 ──
  {
    num: 21, type: 'news', isFake: true,
    headline: 'Cha de canela CURA diabetes em 7 dias',
    source: 'SaudeNaturalBrasil.com.br', sourceColor: '#B71C1C',
    excerpt: 'Medicos estariam escondendo este remedio milagroso da populacao.',
    date: 'Hoje as 08:12',
    bgGradient: '<stop offset="0%" stop-color="#7F0000"/><stop offset="100%" stop-color="#D50000"/>',
    badgeText: 'EXCLUSIVO', badgeColor: '#FF6600', icon: '&#9749;'
  },
  {
    num: 22, type: 'news', isFake: true,
    headline: 'Torres 5G causam doencas! OMS investiga em SEGREDO',
    source: 'VerdadeOculta.net', sourceColor: '#4A148C',
    excerpt: 'Governo proibe noticia. Moradores relatam sintomas misteriosos.',
    date: '20/06/2025',
    bgGradient: '<stop offset="0%" stop-color="#1A0030"/><stop offset="100%" stop-color="#6A1B9A"/>',
    badgeText: 'CENSURADO', badgeColor: '#D50000', icon: '&#128225;'
  },
  {
    num: 23, type: 'news', isFake: true,
    headline: 'NOVO VIRUS mais mortal que COVID no Brasil',
    source: 'AlertaViral24h.com', sourceColor: '#B71C1C',
    excerpt: 'Ministerio da Saude estaria escondendo dados. Milhares mortos.',
    date: 'URGENTE - agora',
    bgGradient: '<stop offset="0%" stop-color="#3D0000"/><stop offset="100%" stop-color="#B71C1C"/>',
    badgeText: 'URGENTE', badgeColor: '#FF1744', icon: '&#128737;'
  },
  {
    num: 24, type: 'news', isFake: true,
    headline: 'Governo libera R$5.000 do FGTS para +60 anos',
    source: 'BrasilNoticiasHoje.blogspot.com', sourceColor: '#0D47A1',
    excerpt: 'Beneficio nao divulgado na TV. Cadastre-se: fgts-saque60.com',
    date: '19/06/2025',
    bgGradient: '<stop offset="0%" stop-color="#003380"/><stop offset="100%" stop-color="#1565C0"/>',
    badgeText: 'VAGAS LIMITADAS', badgeColor: '#FF6600', icon: '&#128176;'
  },
  {
    num: 25, type: 'news', isFake: true,
    headline: 'Bicarbonato pode REVERTER Alzheimer, diz medico',
    source: 'MedicinaNaturalTV.com', sourceColor: '#1B5E20',
    excerpt: 'Industria farmaceutica tenta suprimir a descoberta milagrosa.',
    date: '15/06/2025',
    bgGradient: '<stop offset="0%" stop-color="#1A3A00"/><stop offset="100%" stop-color="#388E3C"/>',
    badgeText: 'BOMBOU!', badgeColor: '#FF6600', icon: '&#129504;'
  },
  {
    num: 26, type: 'news', isFake: true,
    headline: 'PIX de desconhecido ESVAZIA sua conta automaticamente',
    source: 'SeguriPix.com.br', sourceColor: '#F57F17',
    excerpt: 'Novo golpe usa PIX reverso para drenar contas bancarias.',
    date: '18/06/2025',
    bgGradient: '<stop offset="0%" stop-color="#4A3800"/><stop offset="100%" stop-color="#F9A825"/>',
    badgeText: 'PERIGO', badgeColor: '#D50000', icon: '&#128242;'
  },
  {
    num: 27, type: 'news', isFake: true,
    headline: 'Vitamina D em megadose CURA depressao em 3 semanas',
    source: 'BemEstarTotal.org', sourceColor: '#E65100',
    excerpt: 'Psiquiatras nao querem que voce saiba deste segredo natural.',
    date: '12/06/2025',
    bgGradient: '<stop offset="0%" stop-color="#5C3D00"/><stop offset="100%" stop-color="#E65100"/>',
    badgeText: 'REVELACAO', badgeColor: '#B71C1C', icon: '&#9728;'
  },
  {
    num: 28, type: 'news', isFake: true,
    headline: 'Assassino em serie foge de presidio de SP',
    source: 'CrimesBrasil24h.net', sourceColor: '#212121',
    excerpt: 'Autoridades omitiram fuga ha 3 dias. Imagem do foragido.',
    date: '21/06/2025',
    bgGradient: '<stop offset="0%" stop-color="#0A0A0A"/><stop offset="100%" stop-color="#37474F"/>',
    badgeText: 'PROCURADO', badgeColor: '#D50000', icon: '&#128680;'
  },
  {
    num: 29, type: 'news', isFake: true,
    headline: 'Nova lei CANCELA aposentadoria de quem tem imovel',
    source: 'PrevidenciaAlerta.wordpress.com', sourceColor: '#880E4F',
    excerpt: 'Reforma aprovada em sigilo. Aposentados com casa perdem beneficio.',
    date: '17/06/2025',
    bgGradient: '<stop offset="0%" stop-color="#3B0000"/><stop offset="100%" stop-color="#880E4F"/>',
    badgeText: 'URGENTE', badgeColor: '#FF1744', icon: '&#9888;'
  },
  {
    num: 30, type: 'news', isFake: true,
    headline: 'WhatsApp vai cobrar R$3,50 por semana em julho',
    source: 'TechInformacoesBR.com', sourceColor: '#00695C',
    excerpt: 'Meta confirma cobranca. Quem nao pagar tera conta desativada.',
    date: '22/06/2025',
    bgGradient: '<stop offset="0%" stop-color="#003D29"/><stop offset="100%" stop-color="#00695C"/>',
    badgeText: 'CONFIRMADO', badgeColor: '#D50000', icon: '&#128172;'
  },

  // ── NOTICIA REAL 31–40 ──
  {
    num: 31, type: 'news', isFake: false,
    headline: 'INSS reajusta beneficios em 4,1% a partir de maio',
    source: 'gov.br / Previdencia Social', sourceColor: '#0D47A1',
    excerpt: 'Beneficio minimo sobe de R$1.412 para R$1.470 pelo INPC.',
    date: '01/05/2025',
    bgGradient: '<stop offset="0%" stop-color="#002244"/><stop offset="100%" stop-color="#1565C0"/>',
    badgeText: 'OFICIAL', badgeColor: '#1565C0', icon: '&#128203;'
  },
  {
    num: 32, type: 'news', isFake: false,
    headline: 'Ministerio da Saude expande vacinacao para adultos',
    source: 'Ministerio da Saude - saude.gov.br', sourceColor: '#00695C',
    excerpt: 'Gripe, pneumococo e herpes-zoster gratis para maiores de 60.',
    date: '10/06/2025',
    bgGradient: '<stop offset="0%" stop-color="#004D40"/><stop offset="100%" stop-color="#00897B"/>',
    badgeText: 'SAUDE PUBLICA', badgeColor: '#00695C', icon: '&#128137;'
  },
  {
    num: 33, type: 'news', isFake: false,
    headline: 'Banco Central lanca guia de seguranca para o PIX',
    source: 'Banco Central - bcb.gov.br', sourceColor: '#0D47A1',
    excerpt: 'Novo guia orienta como evitar golpes com PIX. Material gratuito.',
    date: '15/06/2025',
    bgGradient: '<stop offset="0%" stop-color="#001A33"/><stop offset="100%" stop-color="#0D47A1"/>',
    badgeText: 'EDUCATIVO', badgeColor: '#0D47A1', icon: '&#127974;'
  },
  {
    num: 34, type: 'news', isFake: false,
    headline: 'Prefeituras dao cursos de celular gratuitos para idosos',
    source: 'Agencia Brasil - agenciabrasil.ebc.com.br', sourceColor: '#01579B',
    excerpt: 'Programa DigitalMente atende +60 em mais de 200 cidades.',
    date: '08/06/2025',
    bgGradient: '<stop offset="0%" stop-color="#003366"/><stop offset="100%" stop-color="#0288D1"/>',
    badgeText: 'GRATUITO', badgeColor: '#2E7D32', icon: '&#128241;'
  },
  {
    num: 35, type: 'news', isFake: false,
    headline: 'SUS oferece telemedicina para doencas cronicas no Brasil',
    source: 'Portal SUS - sus.gov.br', sourceColor: '#006699',
    excerpt: 'Consultas por video para hipertensao e diabetes via app Meu SUS.',
    date: '05/06/2025',
    bgGradient: '<stop offset="0%" stop-color="#003D4D"/><stop offset="100%" stop-color="#0288D1"/>',
    badgeText: 'SUS', badgeColor: '#006699', icon: '&#129658;'
  },
  {
    num: 36, type: 'news', isFake: false,
    headline: 'Procon lista 10 golpes digitais mais comuns contra idosos',
    source: 'Procon-SP - procon.sp.gov.br', sourceColor: '#B71C1C',
    excerpt: 'Falso neto e PIX falso lideram ranking. Veja como se proteger.',
    date: '12/06/2025',
    bgGradient: '<stop offset="0%" stop-color="#5C0000"/><stop offset="100%" stop-color="#C62828"/>',
    badgeText: 'PROTECAO', badgeColor: '#B71C1C', icon: '&#128737;'
  },
  {
    num: 37, type: 'news', isFake: false,
    headline: 'Anvisa aprova vacina contra RSV para maiores de 60 anos',
    source: 'Anvisa - gov.br/anvisa', sourceColor: '#0D47A1',
    excerpt: 'Virus sincicial respiratorio causa internacoes graves em idosos.',
    date: '03/06/2025',
    bgGradient: '<stop offset="0%" stop-color="#003366"/><stop offset="100%" stop-color="#1565C0"/>',
    badgeText: 'APROVADO', badgeColor: '#2E7D32', icon: '&#9989;'
  },
  {
    num: 38, type: 'news', isFake: false,
    headline: 'Senado aprova reajuste do BPC para R$1.412',
    source: 'Senado Federal - senado.leg.br', sourceColor: '#1B5E20',
    excerpt: 'Beneficio assegura renda a idosos e deficientes de baixa renda.',
    date: '20/05/2025',
    bgGradient: '<stop offset="0%" stop-color="#003300"/><stop offset="100%" stop-color="#2E7D32"/>',
    badgeText: 'APROVADO', badgeColor: '#1B5E20', icon: '&#127963;'
  },
  {
    num: 39, type: 'news', isFake: false,
    headline: 'Estatuto do Idoso garante transporte e atendimento prioritario',
    source: 'Secretaria dos Direitos Humanos', sourceColor: '#4A148C',
    excerpt: 'Lei 10.741 completa 22 anos garantindo direitos a maiores de 60.',
    date: '01/10/2025',
    bgGradient: '<stop offset="0%" stop-color="#2D0060"/><stop offset="100%" stop-color="#6A1B9A"/>',
    badgeText: 'SEUS DIREITOS', badgeColor: '#4A148C', icon: '&#9878;'
  },
  {
    num: 40, type: 'news', isFake: false,
    headline: 'Aposentados +65 anos tem isencao ampliada no IR 2025',
    source: 'Receita Federal - receita.fazenda.gov.br', sourceColor: '#1B5E20',
    excerpt: 'Rendimentos ate R$2.824 por mes sao isentos de Imposto de Renda.',
    date: '14/03/2025',
    bgGradient: '<stop offset="0%" stop-color="#0F3300"/><stop offset="100%" stop-color="#2E7D32"/>',
    badgeText: 'RECEITA FEDERAL', badgeColor: '#1B5E20', icon: '&#128196;'
  },
]

// ─── Generate ──────────────────────────────────────────────────────────────

let count = 0
for (const img of images) {
  const filename = `image-${String(img.num).padStart(2, '0')}.svg`
  const filepath = join(OUT, filename)

  let svg
  if (img.type === 'whatsapp') {
    svg = makeWhatsApp(img)
  } else {
    svg = makeNewsCard(img)
  }

  writeFileSync(filepath, svg, 'utf-8')
  count++
  console.log(`  ${filename}`)
}

console.log(`\nGeradas ${count} imagens em public/images/`)
