export type Jogo3Answer = 'golpe' | 'fakenews' | 'verdadeiro'

export interface Clue {
  id: number
  text: string
}

export interface Jogo3Round {
  id: number
  imageId: string
  title: string
  category: string
  clues: [Clue, Clue, Clue]
  correctAnswer: Jogo3Answer
  explanation: string
}

export const jogo3Rounds: Jogo3Round[] = [
  {
    id: 1,
    imageId: 'image-05',
    title: 'Mensagem sobre PIX bloqueado',
    category: 'Mensagem recebida no celular',
    clues: [
      { id: 1, text: 'A mensagem diz que você recebeu R$ 8.000,00 de PIX, mas que o valor está "bloqueado".' },
      { id: 2, text: 'Para liberar o dinheiro, pede que você acesse um link e confirme seus dados bancários.' },
      { id: 3, text: 'O link leva a um site chamado "pix-libera-agora.net" — não é site de nenhum banco oficial.' },
    ],
    correctAnswer: 'golpe',
    explanation:
      'É um GOLPE! O PIX é instantâneo e não precisa de liberação. Bancos reais não pedem confirmação de dados por link. Se receber mensagem assim, delete imediatamente e não clique em nada.',
  },
  {
    id: 2,
    imageId: 'image-25',
    title: 'Post sobre cura do Alzheimer com bicarbonato',
    category: 'Publicação nas redes sociais',
    clues: [
      { id: 1, text: 'O post afirma que água com bicarbonato de sódio em jejum "reverte o Alzheimer".' },
      { id: 2, text: 'Cita um "Dr. M." sem sobrenome, CRM ou universidade associada.' },
      { id: 3, text: 'O post pede para "compartilhar urgentemente para salvar vidas de idosos".' },
    ],
    correctAnswer: 'fakenews',
    explanation:
      'É FAKE NEWS! O Alzheimer não tem cura por bicarbonato — isso é impossível cientificamente. Megadoses de bicarbonato podem ser perigosas. Médicos verdadeiros são identificados com nome completo e CRM.',
  },
  {
    id: 3,
    imageId: 'image-33',
    title: 'Ferramenta do Banco Central para verificar PIX',
    category: 'Notícia em portal de jornalismo',
    clues: [
      { id: 1, text: 'A notícia informa que o Banco Central lançou um serviço para verificar chaves PIX suspeitas.' },
      { id: 2, text: 'A fonte citada é o site oficial bcb.gov.br, com link para a ferramenta.' },
      { id: 3, text: 'A notícia aparece no G1, Folha de São Paulo e no site do próprio Banco Central.' },
    ],
    correctAnswer: 'verdadeiro',
    explanation:
      'É VERDADEIRO! O Banco Central disponibilizou uma ferramenta para consultar chaves PIX suspeitas. Quando a mesma notícia aparece em vários veículos confiáveis e no site oficial do órgão, é uma boa indicação de que é real.',
  },
  {
    id: 4,
    imageId: 'image-09',
    title: '"Neto" pedindo dinheiro urgente em número novo',
    category: 'Mensagem recebida no WhatsApp',
    clues: [
      { id: 1, text: 'A mensagem começa com "Vovô! Sou eu, o Rafael. Troquei de celular, esse é meu número novo."' },
      { id: 2, text: 'Logo depois pede R$ 2.000,00 URGENTE por causa de um acidente de carro.' },
      { id: 3, text: 'Pede sigilo: "Por favor não fala pra minha mãe ainda."' },
    ],
    correctAnswer: 'golpe',
    explanation:
      'É o clássico GOLPE do "falso neto"! O pedido de sigilo existe exatamente para impedir que você confirme com a família. SEMPRE ligue diretamente para o neto antes de transferir qualquer valor.',
  },
  {
    id: 5,
    imageId: 'image-29',
    title: 'Lei que cancela aposentadoria de quem tem imóvel',
    category: 'Postagem viral no Facebook',
    clues: [
      { id: 1, text: 'A postagem afirma que o Congresso aprovou lei cancelando aposentadoria de quem tem imóvel.' },
      { id: 2, text: 'Não há link para o Diário Oficial, site do Senado ou qualquer fonte verificável.' },
      { id: 3, text: 'Pesquisando no G1 e no site do Senado (senado.leg.br), não existe nenhuma notícia sobre isso.' },
    ],
    correctAnswer: 'fakenews',
    explanation:
      'É FAKE NEWS! Uma lei que cancelasse aposentadorias seria notícia em todos os jornais. O Senado Federal publica todas as votações em senado.leg.br — sempre verifique antes de acreditar e compartilhar.',
  },
  {
    id: 6,
    imageId: 'image-37',
    title: 'Anvisa aprova vacina contra RSV para idosos',
    category: 'Notícia em site de saúde',
    clues: [
      { id: 1, text: 'A notícia informa aprovação de vacina contra o Vírus Sincicial Respiratório (RSV) para maiores de 60 anos.' },
      { id: 2, text: 'A fonte é o site oficial da Anvisa: anvisa.gov.br, com número de resolução.' },
      { id: 3, text: 'A notícia também aparece em portais como Veja Saúde, G1 e UOL.' },
    ],
    correctAnswer: 'verdadeiro',
    explanation:
      'É VERDADEIRO! A Anvisa (Agência Nacional de Vigilância Sanitária) é o órgão oficial que aprova medicamentos e vacinas no Brasil. Qualquer aprovação é publicada no site anvisa.gov.br.',
  },
  {
    id: 7,
    imageId: 'image-02',
    title: 'INSS oferece R$ 3.487 em benefícios não resgatados',
    category: 'Mensagem recebida no WhatsApp',
    clues: [
      { id: 1, text: 'Mensagem do "INSS Digital" diz que você tem R$ 3.487,20 em benefícios a resgatar.' },
      { id: 2, text: 'O prazo dado é de 72 horas, após as quais o valor seria cancelado.' },
      { id: 3, text: 'Pede que você acesse um site e informe CPF e senha para resgatar o valor.' },
    ],
    correctAnswer: 'golpe',
    explanation:
      'É um GOLPE! O INSS não entra em contato por WhatsApp. O único canal para verificar benefícios é o site meu.inss.gov.br ou o telefone 135. Nunca forneça sua senha a ninguém.',
  },
  {
    id: 8,
    imageId: 'image-26',
    title: 'PIX "esvazia conta" só de receber transferência',
    category: 'Notícia compartilhada no WhatsApp',
    clues: [
      { id: 1, text: 'A mensagem alerta que receber um PIX poderia dar acesso total à sua conta bancária.' },
      { id: 2, text: 'Pede que você cancele todas as suas chaves PIX "por segurança".' },
      { id: 3, text: 'Não há fonte oficial, nenhum banco ou o Banco Central confirmou isso.' },
    ],
    correctAnswer: 'fakenews',
    explanation:
      'É FAKE NEWS! Tecnicamente é impossível: receber um PIX não dá acesso à sua conta. Esta fake news tenta fazer você cancelar suas chaves PIX, o que apenas prejudica você. O PIX é um sistema seguro.',
  },
  {
    id: 9,
    imageId: 'image-34',
    title: 'Curso gratuito de celular para idosos na Prefeitura',
    category: 'Notícia no site da Prefeitura',
    clues: [
      { id: 1, text: 'O site da prefeitura anuncia programa gratuito de informática para pessoas com mais de 60 anos.' },
      { id: 2, text: 'As aulas são presenciais, em locais físicos da prefeitura, sem necessidade de pagar nada.' },
      { id: 3, text: 'O anúncio está publicado no site oficial da prefeitura com endereço e telefone para inscrição.' },
    ],
    correctAnswer: 'verdadeiro',
    explanation:
      'É VERDADEIRO! Prefeituras em todo o Brasil oferecem programas gratuitos de inclusão digital para idosos. Verifique na prefeitura da sua cidade ou no CRAS mais próximo se há cursos disponíveis.',
  },
  {
    id: 10,
    imageId: 'image-07',
    title: 'Amazon Prime cobrou R$ 39,90 indevidamente',
    category: 'Mensagem recebida no WhatsApp',
    clues: [
      { id: 1, text: 'Mensagem diz que sua "assinatura Amazon Prime foi renovada por R$ 39,90".' },
      { id: 2, text: 'Oferece cancelamento e reembolso, pedindo que você acesse "amazon-br-cancelar.com".' },
      { id: 3, text: 'Para o "estorno", pede número do cartão de crédito e senha de 4 dígitos.' },
    ],
    correctAnswer: 'golpe',
    explanation:
      'É um GOLPE! O site "amazon-br-cancelar.com" não é a Amazon real. A Amazon oficial é amazon.com.br. Qualquer pedido de número de cartão e senha via WhatsApp é golpe de roubo de dados bancários.',
  },
  {
    id: 11,
    imageId: 'image-21',
    title: 'Chá de canela cura diabetes em 7 dias',
    category: 'Postagem compartilhada no Facebook',
    clues: [
      { id: 1, text: 'A postagem afirma que misturar canela com limão e tomar em jejum "cura" a diabetes em uma semana.' },
      { id: 2, text: 'A fonte é um blog chamado "saude-natural-br.blog" sem informações de autoria.' },
      { id: 3, text: 'Pesquisando nos sites do Ministério da Saúde e da Sociedade Brasileira de Diabetes, não há qualquer menção.' },
    ],
    correctAnswer: 'fakenews',
    explanation:
      'É FAKE NEWS! Diabetes não tem cura por chás — é uma doença crônica que requer acompanhamento médico contínuo. Acreditar nesta mentira e abandonar o tratamento pode levar a complicações graves como cegueira e amputações.',
  },
  {
    id: 12,
    imageId: 'image-39',
    title: 'Estatuto do Idoso garante direitos em filas e transportes',
    category: 'Publicação no site governamental',
    clues: [
      { id: 1, text: 'O Ministério dos Direitos Humanos publicou um guia com os direitos garantidos pelo Estatuto do Idoso.' },
      { id: 2, text: 'Inclui prioridade em filas, transporte público gratuito e proteção contra abandono.' },
      { id: 3, text: 'A informação está publicada no site gov.br/mdh com referência à Lei 10.741/2003.' },
    ],
    correctAnswer: 'verdadeiro',
    explanation:
      'É VERDADEIRO! O Estatuto do Idoso (Lei 10.741/2003) garante uma série de direitos importantíssimos. Qualquer pessoa ou estabelecimento que não respeitar esses direitos pode ser denunciado.',
  },
  {
    id: 13,
    imageId: 'image-04',
    title: 'WhatsApp vai cobrar R$ 0,99 para continuar usando',
    category: 'Mensagem recebida de amigos no WhatsApp',
    clues: [
      { id: 1, text: 'Mensagem alerta que a conta WhatsApp "expira hoje" e precisaria pagar R$ 0,99 para continuar.' },
      { id: 2, text: 'Pede que você acesse um link chamado "paywhats-renovar.com/conta".' },
      { id: 3, text: 'O próprio WhatsApp nunca envia mensagens pelo aplicativo sobre pagamentos.' },
    ],
    correctAnswer: 'golpe',
    explanation:
      'É um GOLPE antigo e muito comum! O WhatsApp é 100% gratuito desde 2016. Esta mesma mensagem circula há anos com datas diferentes. O WhatsApp nunca cobra pelo uso — delete e ignore.',
  },
  {
    id: 14,
    imageId: 'image-22',
    title: '5G causa doenças e OMS investiga em segredo',
    category: 'Vídeo viral no YouTube',
    clues: [
      { id: 1, text: 'O vídeo mostra moradores com sintomas e diz que a OMS estaria "ocultando" os dados.' },
      { id: 2, text: 'Não há cientistas identificados, publicações em revistas científicas ou estudos citados com autoria.' },
      { id: 3, text: 'A OMS e a Anatel publicam seus relatórios sobre 5G publicamente — nada está "escondido".' },
    ],
    correctAnswer: 'fakenews',
    explanation:
      'É FAKE NEWS! A teoria de "informação escondida" é uma estratégia clássica de desinformação. A OMS publica todos os seus estudos de forma aberta. O 5G é regulamentado e estudado por agências em mais de 100 países.',
  },
  {
    id: 15,
    imageId: 'image-31',
    title: 'INSS confirma reajuste de 4,1% nas aposentadorias',
    category: 'Notícia em portal de jornalismo',
    clues: [
      { id: 1, text: 'A notícia da Agência Brasil informa reajuste de 4,1% para benefícios acima do mínimo.' },
      { id: 2, text: 'A fonte é a Agência Brasil (agenciabrasil.ebc.com.br), empresa pública de comunicação.' },
      { id: 3, text: 'O INSS confirmou no site inss.gov.br e a informação aparece em G1 e Folha de São Paulo.' },
    ],
    correctAnswer: 'verdadeiro',
    explanation:
      'É VERDADEIRO! Reajustes do INSS são informados pela Agência Brasil (comunicação oficial do governo) e confirmados no site do INSS. Para qualquer dúvida, ligue 135 (Central de Atendimento do INSS — gratuito).',
  },
  {
    id: 16,
    imageId: 'image-10',
    title: 'Caixa libera R$ 8.435 de FGTS pelo link',
    category: 'Mensagem recebida no celular',
    clues: [
      { id: 1, text: 'Mensagem festiva anuncia que seu FGTS de R$ 8.435,00 foi liberado para saque.' },
      { id: 2, text: 'O prazo dado é até o dia 31, "após esse período o valor será cancelado".' },
      { id: 3, text: 'O link indicado é "caixa-fgts-saque-emergencial.com" — não é o site caixa.gov.br.' },
    ],
    correctAnswer: 'golpe',
    explanation:
      'É um GOLPE! A Caixa não notifica sobre FGTS por WhatsApp. Para verificar seu saldo de FGTS, use apenas o aplicativo oficial "FGTS" (disponível nas lojas de aplicativos) ou o site caixa.gov.br.',
  },
  {
    id: 17,
    imageId: 'image-28',
    title: 'Assassino foge de presídio e moradores devem ficar em casa',
    category: 'Mensagem viral no WhatsApp',
    clues: [
      { id: 1, text: 'Mensagem urgente avisa sobre fuga de "assassino em série" de presídio paulistano.' },
      { id: 2, text: 'Afirma que a Secretaria de Segurança estaria "escondendo" o caso da imprensa.' },
      { id: 3, text: 'Pesquisando no G1, UOL e no site da Secretaria de Segurança Pública de SP, não há nenhuma notícia.' },
    ],
    correctAnswer: 'fakenews',
    explanation:
      'É FAKE NEWS! Uma fuga de presídio seria notícia em todos os portais de jornalismo. Antes de se assustar com alertas de segurança recebidos por WhatsApp, sempre pesquise em portais confiáveis como G1 ou UOL.',
  },
  {
    id: 18,
    imageId: 'image-36',
    title: 'Procon lista os 10 golpes mais comuns contra idosos',
    category: 'Notícia em portal de notícias',
    clues: [
      { id: 1, text: 'O Procon-SP publicou relatório sobre golpes aplicados contra idosos com dados de 2024.' },
      { id: 2, text: 'O relatório está no site oficial procon.sp.gov.br com metodologia e fontes claras.' },
      { id: 3, text: 'A notícia é reproduzida por veículos como G1 e Folha de São Paulo com link para o documento original.' },
    ],
    correctAnswer: 'verdadeiro',
    explanation:
      'É VERDADEIRO! O Procon publica relatórios periódicos como este para alertar a população. Conhecer os golpes mais comuns é a melhor forma de se proteger. Acesse procon.sp.gov.br para ver o relatório completo.',
  },
  {
    id: 19,
    imageId: 'image-03',
    title: 'SERASA cobra dívida por WhatsApp com 80% de desconto',
    category: 'Mensagem recebida no celular',
    clues: [
      { id: 1, text: 'Mensagem do "SERASA" avisa que seu CPF está negativado e oferece 80% de desconto.' },
      { id: 2, text: 'O link indicado é "serasa-limpa-nome.online" — não é o site serasa.com.br.' },
      { id: 3, text: 'A mensagem ameaça com "processo judicial" se não regularizar em 24 horas.' },
    ],
    correctAnswer: 'golpe',
    explanation:
      'É um GOLPE! O site oficial do Serasa é serasa.com.br. Qualquer outro domínio é falso. O Serasa real não usa WhatsApp para cobranças. Acesse sempre pelo site oficial para verificar sua situação.',
  },
  {
    id: 20,
    imageId: 'image-40',
    title: 'Isenção de IR para aposentados com mais de 65 anos',
    category: 'Publicação da Receita Federal',
    clues: [
      { id: 1, text: 'A Receita Federal confirma isenção automática de IR para aposentados com 65+ anos até R$ 2.824 mensais.' },
      { id: 2, text: 'A informação está publicada no site receita.fazenda.gov.br com base legal (Lei 9.250/1995).' },
      { id: 3, text: 'Contadores e escritórios de advocacia tributária confirmam a informação em publicações especializadas.' },
    ],
    correctAnswer: 'verdadeiro',
    explanation:
      'É VERDADEIRO! A isenção de IR para aposentados com 65 anos ou mais é garantida por lei desde 1995. Para saber exatamente como funciona, consulte o site receita.fazenda.gov.br ou um contador de sua confiança.',
  },
]
