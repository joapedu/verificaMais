export interface Jogo2Card {
  id: number
  imageId: string
  isFake: boolean
  headline: string
  source: string
  sourceIsLegit: boolean
  excerpt: string
  publishDate: string
  redFlags?: string[]
  explanation: string
  category: string
}

export const jogo2Cards: Jogo2Card[] = [
  // ── FAKE NEWS (imagens 21–30) ──────────────────────────────────────────────
  {
    id: 21,
    imageId: 'image-21',
    isFake: true,
    category: 'Saúde',
    headline: 'Chá de canela com limão CURA diabetes em 7 dias, afirmam médicos cubanos',
    source: 'saude-natural-br.blog',
    sourceIsLegit: false,
    excerpt:
      'Uma pesquisa "revolucionária" divulgada por médicos de Cuba teria comprovado que a mistura de canela com limão, tomada em jejum, elimina completamente a diabetes tipo 2 em apenas uma semana. A notícia se espalhou pelas redes sociais com milhões de compartilhamentos.',
    publishDate: '12 de março de 2025',
    redFlags: [
      'Site desconhecido e sem credibilidade científica',
      'Nenhum estudo real comprova cura de diabetes por chás',
      'Linguagem exagerada ("CURA", "revolucionária")',
      'Não há nome de médicos, universidades ou publicações científicas citadas',
    ],
    explanation:
      'Fake news de saúde. Diabetes é uma doença crônica gerenciada com medicamentos e dieta — não existe cura por chás. Esta notícia é perigosa pois pode levar pessoas a abandonar o tratamento médico.',
  },
  {
    id: 22,
    imageId: 'image-22',
    isFake: true,
    category: 'Tecnologia',
    headline: 'VÍDEO CHOCANTE: Antenas 5G causam doenças em famílias inteiras; OMS investiga',
    source: 'verdade-escondida.net',
    sourceIsLegit: false,
    excerpt:
      'Um vídeo viral mostra moradores de um bairro paulistano relatando sintomas após a instalação de uma torre 5G. Segundo o site, a OMS já teria iniciado investigação secreta, mas os governos estariam escondendo os dados da população.',
    publishDate: '5 de maio de 2025',
    redFlags: [
      'A OMS não oculta dados — publicações são abertas ao público',
      'Teoria de "informação escondida" é sinal clássico de fake news',
      'Ondas de rádio 5G são estudadas e aprovadas por agências regulatórias mundiais',
      'Site "verdade-escondida.net" não é fonte científica confiável',
    ],
    explanation:
      'Desinformação sobre 5G. Estudos científicos internacionais revisados por pares não encontraram evidências de que o 5G cause doenças. Teorias conspiratórias sobre tecnologia são muito comuns na internet.',
  },
  {
    id: 23,
    imageId: 'image-23',
    isFake: true,
    category: 'Saúde',
    headline: 'URGENTE: Novo vírus mais mortal que COVID-19 já circula no Brasil; vacinas não funcionam',
    source: 'noticiasdahora24.blogspot.com',
    sourceIsLegit: false,
    excerpt:
      'Segundo fontes "anônimas" da Fiocruz, um novo vírus mutante teria chegado ao Brasil com mortalidade 10 vezes superior à COVID-19. A notícia afirma ainda que as vacinas existentes seriam totalmente ineficazes contra a nova cepa.',
    publishDate: '18 de janeiro de 2025',
    redFlags: [
      '"Fontes anônimas" sem identificação são inventadas',
      'A Fiocruz divulga alertas apenas em seus canais oficiais (fiocruz.br)',
      'Blog sem credibilidade jornalística ou científica',
      'Linguagem alarmista criada para gerar medo e compartilhamentos',
    ],
    explanation:
      'Notícia falsa de saúde criada para causar pânico. Antes de compartilhar qualquer alerta de saúde, verifique no site oficial do Ministério da Saúde (saude.gov.br) ou Fiocruz (fiocruz.br).',
  },
  {
    id: 24,
    imageId: 'image-24',
    isFake: true,
    category: 'Política',
    headline: 'Governo libera SAQUE IMEDIATO de R$ 5.000 do FGTS para todos com mais de 60 anos',
    source: 'politica-hoje.info',
    sourceIsLegit: false,
    excerpt:
      'Uma medida provisória aprovada em sessão secreta do Congresso teria liberado saque extraordinário de R$ 5.000 do FGTS para trabalhadores com mais de 60 anos. Para resgatar, seria necessário cadastrar-se em um site específico com dados bancários.',
    publishDate: '3 de fevereiro de 2025',
    redFlags: [
      '"Sessão secreta" — o Congresso não aprova medidas em segredo',
      'Pedido de dados bancários em site desconhecido é golpe',
      'FGTS: saques são divulgados oficialmente pelo Governo Federal (gov.br)',
      'Notícia falsa que combina benefício atrativo com golpe de dados',
    ],
    explanation:
      'Fake news combinada com golpe. Além de ser uma notícia falsa, o link leva a um site que rouba dados bancários. Informações sobre FGTS devem ser buscadas APENAS no gov.br ou app da Caixa.',
  },
  {
    id: 25,
    imageId: 'image-25',
    isFake: true,
    category: 'Saúde',
    headline: 'Médico revela: água com bicarbonato em jejum previne e reverte o Alzheimer',
    source: 'dr.saude-natural.com.br',
    sourceIsLegit: false,
    excerpt:
      'Um médico identificado apenas como "Dr. M." teria publicado uma pesquisa mostrando que a ingestão diária de água com bicarbonato de sódio em jejum seria capaz de prevenir e até reverter o Alzheimer em estágios iniciais.',
    publishDate: '20 de abril de 2025',
    redFlags: [
      'Médico identificado apenas como "Dr. M." sem credenciais verificáveis',
      'Alzheimer não tem cura ou reversão comprovada por qualquer remédio caseiro',
      'Linguagem de "segredo revelado" é típica de fake news de saúde',
      'Não há referência a nenhuma publicação científica real',
    ],
    explanation:
      'Desinformação médica perigosa. O Alzheimer é uma doença séria sem cura conhecida atualmente. Notícias como esta podem levar pessoas a abandonar tratamentos médicos com consequências graves.',
  },
  {
    id: 26,
    imageId: 'image-26',
    isFake: true,
    category: 'Finanças',
    headline: 'ALERTA: Novo golpe do Pix esvazia conta bancária só de RECEBER transferência',
    source: 'alertas-financeiros.site',
    sourceIsLegit: false,
    excerpt:
      'Uma nova modalidade de golpe estaria permitindo que criminosos esvaziassem contas bancárias apenas com o envio de um PIX. A notícia, amplamente compartilhada, orienta que pessoas cancelem suas chaves PIX imediatamente.',
    publishDate: '14 de junho de 2025',
    redFlags: [
      'Tecnicamente impossível: receber PIX não dá acesso à conta',
      'Notícia cria pânico para que pessoas cancelem suas chaves PIX (o que beneficia golpistas)',
      'Site sem credibilidade jornalística',
      'Banco Central nunca confirmou tal vulnerabilidade',
    ],
    explanation:
      'Fake news tecnológica. O sistema PIX é seguro — simplesmente receber uma transferência não compromete sua conta. Esta notícia falsa visa fazer as pessoas cancelarem suas chaves, criando confusão.',
  },
  {
    id: 27,
    imageId: 'image-27',
    isFake: true,
    category: 'Saúde',
    headline: 'Tomar vitamina D em megadose reverte perdas de memória e cura depressão sênior',
    source: 'vitaminas-saude.net',
    sourceIsLegit: false,
    excerpt:
      'Segundo um "estudo revolucionário" de pesquisadores australianos, doses 50 vezes acima do recomendado de vitamina D teriam revertido quadros de perda de memória e curado depressão em 87% dos idosos testados.',
    publishDate: '9 de julho de 2025',
    redFlags: [
      'Megadoses de vitamina D são PERIGOSAS e podem causar intoxicação',
      'Nenhum estudo sério indica reversão de memória com vitaminas',
      '"87% dos casos" sem metodologia científica descrita é número inventado',
      'Referência vaga a "pesquisadores australianos" sem nomes ou instituição',
    ],
    explanation:
      'Fake news de saúde extremamente perigosa. Megadoses de vitamina D causam hipercalcemia (excesso de cálcio no sangue), que pode ser fatal. Jamais tome medicamentos em doses altas sem prescrição médica.',
  },
  {
    id: 28,
    imageId: 'image-28',
    isFake: true,
    category: 'Segurança',
    headline: 'URGENTE: Assassino em série foge de presídio em SP; moradores devem não sair de casa',
    source: 'sp-noticias-urgentes.com',
    sourceIsLegit: false,
    excerpt:
      'Segundo o site, um criminoso condenado por múltiplos assassinatos teria escapado de um presídio em São Paulo na madrugada de ontem. A Secretaria de Segurança Pública estaria "ocultando" o caso da mídia.',
    publishDate: '1 de agosto de 2025',
    redFlags: [
      'Fuga de presídio seria notícia em todos os grandes veículos — verifique Globo, UOL, Folha',
      '"Secretaria ocultando" é conspiração típica de fake news',
      'Site sem credibilidade e com URL genérico',
      'Notícias alarmistas de segurança são frequentemente falsas para gerar pânico',
    ],
    explanation:
      'Notícia falsa criada para causar medo. Antes de se preocupar com alertas de segurança, verifique se a mesma notícia aparece em portais confiáveis como G1, UOL ou no site da Secretaria de Segurança Pública.',
  },
  {
    id: 29,
    imageId: 'image-29',
    isFake: true,
    category: 'Política',
    headline: 'APROVADO: Nova lei cancela aposentadoria de quem tem imóvel no nome',
    source: 'politicabrasil.blog',
    sourceIsLegit: false,
    excerpt:
      'Uma postagem viral afirma que o Congresso teria aprovado uma emenda constitucional cancelando o direito à aposentadoria de pessoas que possuem imóvel próprio registrado no seu nome, independente do valor do bem.',
    publishDate: '22 de maio de 2025',
    redFlags: [
      'Alteração na previdência seria notícia de grande repercussão nacional',
      'O Congresso não aprova leis desta magnitude sem meses de debate público',
      'Verifique sempre no Diário Oficial da União (in.gov.br) ou no site do Senado',
      'Blog sem credibilidade jornalística',
    ],
    explanation:
      'Fake news política. Leis que afetam a aposentadoria passam por longos processos legislativos e são amplamente divulgadas. Antes de acreditar, consulte o site do Senado Federal (senado.leg.br).',
  },
  {
    id: 30,
    imageId: 'image-30',
    isFake: true,
    category: 'Tecnologia',
    headline: 'WhatsApp confirma: serviço passará a cobrar R$ 3,50 por semana a partir de outubro',
    source: 'techbrasil-agora.blogspot.com',
    sourceIsLegit: false,
    excerpt:
      'Segundo o site, o CEO do WhatsApp teria anunciado em entrevista que o aplicativo deixará de ser gratuito em outubro, cobrando uma taxa semanal de R$ 3,50. A notícia orienta usuários a se cadastrarem em um link para "isenção de cobrança".',
    publishDate: '10 de setembro de 2025',
    redFlags: [
      'O WhatsApp é gratuito e de propriedade da Meta — não há planos de cobrar',
      'Link para "isenção" é golpe de coleta de dados',
      'Anúncio oficial do WhatsApp aparece no site oficial e na imprensa séria',
      'Esta mesma fake news circula desde 2014 com datas diferentes',
    ],
    explanation:
      'Fake news recorrente sobre cobrança do WhatsApp. Esta boataria circula desde 2014! O WhatsApp é e continuará sendo gratuito. Nunca clique em links de "isenção de cobrança" — é golpe.',
  },

  // ── NOTÍCIAS REAIS (imagens 31–40) ────────────────────────────────────────
  {
    id: 31,
    imageId: 'image-31',
    isFake: false,
    category: 'Previdência',
    headline: 'INSS anuncia reajuste de 4,1% para aposentadorias acima do salário mínimo em 2025',
    source: 'Agência Brasil (agenciabrasil.ebc.com.br)',
    sourceIsLegit: true,
    excerpt:
      'O Instituto Nacional do Seguro Social confirmou o reajuste de 4,1% para benefícios acima do piso nacional, de acordo com o índice INPC do ano anterior. O novo valor começa a ser pago na competência de fevereiro.',
    publishDate: '14 de janeiro de 2025',
    explanation:
      'Notícia verdadeira e verificável. O reajuste anual do INSS segue regras previstas em lei e é divulgado pela Agência Brasil (agência pública oficial) e pelo site do INSS (inss.gov.br).',
  },
  {
    id: 32,
    imageId: 'image-32',
    isFake: false,
    category: 'Saúde',
    headline: 'Ministério da Saúde expande vacinação gratuita contra gripe para toda a população',
    source: 'Ministério da Saúde (saude.gov.br)',
    sourceIsLegit: true,
    excerpt:
      'O Ministério da Saúde anunciou a expansão da campanha de vacinação contra influenza para toda a população brasileira, sem restrição de faixa etária. Idosos e crianças continuam como grupos prioritários com atendimento preferencial.',
    publishDate: '7 de abril de 2025',
    explanation:
      'Notícia verdadeira divulgada pelo Ministério da Saúde. Informações sobre campanhas de vacinação devem ser buscadas sempre no site saude.gov.br ou nas UBSs (Unidades Básicas de Saúde) do seu município.',
  },
  {
    id: 33,
    imageId: 'image-33',
    isFake: false,
    category: 'Segurança',
    headline: 'Banco Central lança ferramenta gratuita para verificar chaves PIX suspeitas',
    source: 'Banco Central do Brasil (bcb.gov.br)',
    sourceIsLegit: true,
    excerpt:
      'O Banco Central do Brasil lançou uma ferramenta de consulta pública que permite verificar se uma chave PIX está associada a golpes ou fraudes antes de realizar uma transferência. O serviço é gratuito e acessível pelo site oficial.',
    publishDate: '20 de março de 2025',
    explanation:
      'Informação verdadeira e útil. O Banco Central disponibiliza ferramentas de proteção para consumidores. Acesse sempre pelo site oficial bcb.gov.br e desconfie de sites que imitam o endereço oficial.',
  },
  {
    id: 34,
    imageId: 'image-34',
    isFake: false,
    category: 'Educação',
    headline: 'Prefeitura abre inscrições para curso gratuito de celular e internet para idosos',
    source: 'Prefeitura de São Paulo (prefeitura.sp.gov.br)',
    sourceIsLegit: true,
    excerpt:
      'A Prefeitura de São Paulo abriu inscrições para o programa "SP Idoso Digital", que oferece cursos gratuitos de uso de smartphone, aplicativos e segurança na internet para pessoas acima de 60 anos. As aulas ocorrem nos CIs (Centros de Inclusão Digital).',
    publishDate: '2 de junho de 2025',
    explanation:
      'Notícia verdadeira sobre programa público de inclusão digital. Prefeituras frequentemente oferecem este tipo de curso — verifique no site da sua prefeitura ou nos CRASs (Centros de Referência de Assistência Social).',
  },
  {
    id: 35,
    imageId: 'image-35',
    isFake: false,
    category: 'Saúde',
    headline: 'Telemedicina pelo SUS: como agendar consulta médica online gratuitamente',
    source: 'Ministério da Saúde (saude.gov.br)',
    sourceIsLegit: true,
    excerpt:
      'O Ministério da Saúde expandiu o serviço de telemedicina no SUS, permitindo que pacientes com doenças crônicas como diabetes e hipertensão façam consultas de acompanhamento por videochamada, sem precisar se deslocar até a unidade de saúde.',
    publishDate: '15 de agosto de 2025',
    explanation:
      'Notícia verdadeira sobre serviço público de saúde. A telemedicina pelo SUS é real e gratuita para usuários. Informações de como acessar estão disponíveis nas UBSs e no aplicativo Meu SUS Digital.',
  },
  {
    id: 36,
    imageId: 'image-36',
    isFake: false,
    category: 'Proteção ao Consumidor',
    headline: 'Procon-SP divulga lista dos 10 golpes mais aplicados contra idosos em 2024',
    source: 'Procon-SP (procon.sp.gov.br)',
    sourceIsLegit: true,
    excerpt:
      'O Procon de São Paulo divulgou um relatório com os golpes digitais mais comuns aplicados contra a terceira idade. O golpe do "falso parente em apuros" liderou o ranking pelo terceiro ano consecutivo, seguido pelo falso banco e pelo PIX fraudulento.',
    publishDate: '3 de fevereiro de 2025',
    explanation:
      'Relatório verdadeiro do Procon-SP. Órgãos de defesa do consumidor publicam este tipo de pesquisa regularmente para alertar a população. Consulte sempre o site oficial procon.sp.gov.br para informações confiáveis.',
  },
  {
    id: 37,
    imageId: 'image-37',
    isFake: false,
    category: 'Saúde',
    headline: 'Anvisa aprova nova vacina contra RSV para adultos com mais de 60 anos',
    source: 'Anvisa (anvisa.gov.br)',
    sourceIsLegit: true,
    excerpt:
      'A Agência Nacional de Vigilância Sanitária aprovou o registro da vacina contra o Vírus Sincicial Respiratório (RSV) para adultos acima de 60 anos. A doença é uma das principais causas de hospitalização nessa faixa etária durante o inverno.',
    publishDate: '28 de maio de 2025',
    explanation:
      'Aprovação real da Anvisa. Informações sobre aprovação de vacinas e medicamentos estão disponíveis no site oficial da Anvisa (anvisa.gov.br). A Anvisa é o órgão regulatório oficial de medicamentos no Brasil.',
  },
  {
    id: 38,
    imageId: 'image-38',
    isFake: false,
    category: 'Legislação',
    headline: 'Senado aprova aumento do BPC para R$ 1.412; beneficiários recebem em até 90 dias',
    source: 'Senado Federal (senado.leg.br)',
    sourceIsLegit: true,
    excerpt:
      'O Senado Federal aprovou o aumento do Benefício de Prestação Continuada (BPC) para R$ 1.412, alinhando o valor ao novo salário mínimo. O BPC é pago a idosos acima de 65 anos e pessoas com deficiência em situação de vulnerabilidade.',
    publishDate: '11 de março de 2025',
    explanation:
      'Notícia verdadeira sobre legislação aprovada pelo Senado. Para consultar votações e leis aprovadas, acesse o site oficial do Senado (senado.leg.br) ou da Câmara dos Deputados (camara.leg.br).',
  },
  {
    id: 39,
    imageId: 'image-39',
    isFake: false,
    category: 'Direitos',
    headline: 'Estatuto do Idoso: conheça os 15 principais direitos garantidos pela lei',
    source: 'Ministério dos Direitos Humanos (gov.br/mdh)',
    sourceIsLegit: true,
    excerpt:
      'O Ministério dos Direitos Humanos publicou um guia resumido com os principais direitos garantidos pelo Estatuto do Idoso (Lei 10.741/2003), incluindo prioridade em filas e atendimentos, desconto em eventos culturais, transporte público gratuito e proteção contra abandono.',
    publishDate: '1 de outubro de 2024',
    explanation:
      'Informação verdadeira e importante. O Estatuto do Idoso (Lei 10.741/2003) garante uma série de direitos. Consulte o guia completo no site do Ministério dos Direitos Humanos ou no CRAS (Centro de Referência de Assistência Social) mais próximo.',
  },
  {
    id: 40,
    imageId: 'image-40',
    isFake: false,
    category: 'Imposto de Renda',
    headline: 'IR 2025: aposentados com mais de 65 anos têm isenção automática até R$ 2.824 mensais',
    source: 'Receita Federal (receita.fazenda.gov.br)',
    sourceIsLegit: true,
    excerpt:
      'A Receita Federal confirmou que aposentados e pensionistas com 65 anos ou mais têm direito à isenção automática de Imposto de Renda sobre rendimentos de aposentadoria até R$ 2.824 mensais. O benefício é garantido por lei e não precisa ser solicitado.',
    publishDate: '4 de março de 2025',
    explanation:
      'Informação verdadeira e importante da Receita Federal. Para consultas sobre Imposto de Renda, use APENAS o site oficial receita.fazenda.gov.br. Nunca forneça seus dados do IR a sites ou pessoas desconhecidas.',
  },
]
