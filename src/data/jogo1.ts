export interface ChatMessage {
  id: string
  text: string
  isFromContact: boolean
  isRedFlag?: boolean
}

export interface Jogo1Scenario {
  id: string
  imageId: string
  contactName: string
  contactEmoji: string
  messages: ChatMessage[]
  redFlags: string[]
  explanation: string
}

export interface Jogo1Round {
  id: number
  scam: Jogo1Scenario
  legit: Jogo1Scenario
}

export const jogo1Rounds: Jogo1Round[] = [
  {
    id: 1,
    scam: {
      id: 'r1-scam',
      imageId: 'image-01',
      contactName: 'Banco Itaú Segurança',
      contactEmoji: '🏦',
      messages: [
        {
          id: 'm1',
          text: '⚠️ ALERTA DE SEGURANÇA URGENTE ⚠️',
          isFromContact: true,
          isRedFlag: true,
        },
        {
          id: 'm2',
          text: 'Detectamos uma tentativa de acesso SUSPEITO em sua conta. Sua conta será BLOQUEADA em 24 horas.',
          isFromContact: true,
          isRedFlag: true,
        },
        {
          id: 'm3',
          text: 'Clique AGORA para confirmar seus dados e evitar o bloqueio: bit.ly/itau-seguro99',
          isFromContact: true,
          isRedFlag: true,
        },
      ],
      redFlags: [
        'Bancos NUNCA pedem dados pelo WhatsApp ou por links',
        'Link encurtado (bit.ly) é sinal de site falso',
        'Urgência exagerada ("AGORA", "24 horas") pressiona você a agir sem pensar',
        'O número não é o contato oficial do banco',
      ],
      explanation:
        'Este é o golpe do "Falso Banco". Criminosos se passam por instituições financeiras para roubar seus dados. Bancos verdadeiros NUNCA pedem senha, dados ou que você clique em links pelo WhatsApp.',
    },
    legit: {
      id: 'r1-legit',
      imageId: 'image-11',
      contactName: 'Ana (filha)',
      contactEmoji: '👩',
      messages: [
        {
          id: 'm4',
          text: 'Mãe, já cheguei bem em São Paulo! A viagem foi tranquila 😊',
          isFromContact: true,
        },
        {
          id: 'm5',
          text: 'Que bom filha! Estava te esperando dar notícias',
          isFromContact: false,
        },
        {
          id: 'm6',
          text: 'Amanhã te ligo para contar tudo da viagem! Beijo 💕',
          isFromContact: true,
        },
      ],
      redFlags: [],
      explanation:
        'Esta é uma conversa normal e legítima. A filha avisou que chegou bem, a mãe respondeu naturalmente. Não há pedidos de dinheiro, links ou urgência.',
    },
  },
  {
    id: 2,
    scam: {
      id: 'r2-scam',
      imageId: 'image-02',
      contactName: 'INSS Digital Oficial',
      contactEmoji: '🏛️',
      messages: [
        {
          id: 'm1',
          text: 'Prezado segurado, identificamos que você possui R$ 3.487,20 em benefícios NÃO RESGATADOS.',
          isFromContact: true,
          isRedFlag: true,
        },
        {
          id: 'm2',
          text: 'PRAZO FINAL: 72 horas para resgate. Após este prazo, o valor será CANCELADO.',
          isFromContact: true,
          isRedFlag: true,
        },
        {
          id: 'm3',
          text: 'Acesse agora e informe seu CPF e senha: inss-beneficios-resgate.app',
          isFromContact: true,
          isRedFlag: true,
        },
      ],
      redFlags: [
        'O INSS nunca entra em contato por WhatsApp para liberar benefícios',
        'Site falso imitando o governo (inss-beneficios-resgate.app)',
        'Prazo de 72 horas cria urgência falsa para você agir sem pensar',
        'Pede CPF e senha — o INSS nunca solicita sua senha por mensagem',
      ],
      explanation:
        'Golpe do "Benefício Falso do INSS". Criminosos criam urgência com valores falsos para roubar seus dados pessoais. O INSS só se comunica pelos canais oficiais: site gov.br ou telefone 135.',
    },
    legit: {
      id: 'r2-legit',
      imageId: 'image-12',
      contactName: 'Dra. Carmen — Clínica',
      contactEmoji: '🏥',
      messages: [
        {
          id: 'm4',
          text: 'Boa tarde! Aqui é a recepção da Clínica São Lucas.',
          isFromContact: true,
        },
        {
          id: 'm5',
          text: 'Sua consulta com a Dra. Carmen está confirmada para amanhã, terça-feira, às 14h.',
          isFromContact: true,
        },
        {
          id: 'm6',
          text: 'Lembre-se de trazer RG, cartão do plano e lista de medicamentos atuais.',
          isFromContact: true,
        },
        {
          id: 'm7',
          text: 'Ok! Estarei lá. Obrigada pelo lembrete.',
          isFromContact: false,
        },
      ],
      redFlags: [],
      explanation:
        'Mensagem legítima de uma clínica médica. Não há pedidos de dados sensíveis, links suspeitos ou urgência. É apenas um lembrete de consulta com informações práticas.',
    },
  },
  {
    id: 3,
    scam: {
      id: 'r3-scam',
      imageId: 'image-03',
      contactName: 'SERASA Consumidor',
      contactEmoji: '💳',
      messages: [
        {
          id: 'm1',
          text: 'ATENÇÃO: Seu CPF consta como NEGATIVADO em nosso sistema.',
          isFromContact: true,
          isRedFlag: true,
        },
        {
          id: 'm2',
          text: 'Você tem dívidas de R$ 1.230,00 que podem virar PROCESSO JUDICIAL.',
          isFromContact: true,
          isRedFlag: true,
        },
        {
          id: 'm3',
          text: 'Regularize AGORA com 80% de desconto! Clique: serasa-limpa-nome.online',
          isFromContact: true,
          isRedFlag: true,
        },
      ],
      redFlags: [
        'O SERASA real nunca envia mensagens de cobrança por WhatsApp',
        'Site falso: "serasa-limpa-nome.online" não é o site oficial',
        'Desconto exagerado de 80% para criar tentação imediata',
        'Ameaça de "processo judicial" para gerar medo e pressão',
      ],
      explanation:
        'Golpe do "Falso SERASA". Criminosos ameaçam com dívidas falsas e oferecem "soluções" para roubar seu dinheiro. O site oficial do Serasa é serasa.com.br — qualquer outro endereço é fraude.',
    },
    legit: {
      id: 'r3-legit',
      imageId: 'image-13',
      contactName: 'Farmácia Drogasil',
      contactEmoji: '💊',
      messages: [
        {
          id: 'm4',
          text: 'Olá! Aqui é a Farmácia Drogasil da Rua das Flores.',
          isFromContact: true,
        },
        {
          id: 'm5',
          text: 'Seu medicamento Losartana 50mg está disponível para retirada.',
          isFromContact: true,
        },
        {
          id: 'm6',
          text: 'Funcionamos de segunda a sábado, das 8h às 22h. Atenciosamente, Equipe Drogasil.',
          isFromContact: true,
        },
      ],
      redFlags: [],
      explanation:
        'Aviso legítimo de farmácia. A mensagem informa sobre medicamento disponível sem pedir dados, senha ou pagamentos. Simples e direta.',
    },
  },
  {
    id: 4,
    scam: {
      id: 'r4-scam',
      imageId: 'image-04',
      contactName: 'WhatsApp Oficial',
      contactEmoji: '📱',
      messages: [
        {
          id: 'm1',
          text: '📢 Aviso Importante do WhatsApp',
          isFromContact: true,
          isRedFlag: true,
        },
        {
          id: 'm2',
          text: 'Sua conta WhatsApp gratuita expira HOJE às 23h59. Para continuar usando, pague R$ 0,99.',
          isFromContact: true,
          isRedFlag: true,
        },
        {
          id: 'm3',
          text: 'Renove agora antes de perder o acesso: paywhats-renovar.com/conta',
          isFromContact: true,
          isRedFlag: true,
        },
      ],
      redFlags: [
        'O WhatsApp é gratuito e NUNCA cobra mensalidade',
        'O WhatsApp não envia avisos pelo próprio WhatsApp',
        'Site falso com nome parecido com o real',
        'Urgência de "hoje às 23h59" para apressar sua decisão',
      ],
      explanation:
        'Golpe clássico do "WhatsApp pago". O WhatsApp é 100% gratuito e não cobra nada para continuar usando. Se receber esta mensagem, delete imediatamente.',
    },
    legit: {
      id: 'r4-legit',
      imageId: 'image-14',
      contactName: 'Carlos (neto)',
      contactEmoji: '👦',
      messages: [
        {
          id: 'm4',
          text: 'Vovó!!! Feliz aniversário!! 🎂🎉',
          isFromContact: true,
        },
        {
          id: 'm5',
          text: 'Você é a melhor avó do mundo! Te amo muito!',
          isFromContact: true,
        },
        {
          id: 'm6',
          text: 'Amanhã vou te visitar e levar bolo de chocolate, que é seu favorito! 🍫',
          isFromContact: true,
        },
        {
          id: 'm7',
          text: 'Que saudade do meu netinho! Te espero aqui! Beijo!',
          isFromContact: false,
        },
      ],
      redFlags: [],
      explanation:
        'Mensagem carinhosa e legítima de aniversário. Sem pedidos de dinheiro, sem links e sem urgência. Apenas amor familiar.',
    },
  },
  {
    id: 5,
    scam: {
      id: 'r5-scam',
      imageId: 'image-05',
      contactName: 'PIX Banco Central',
      contactEmoji: '💸',
      messages: [
        {
          id: 'm1',
          text: '✅ PIX RECEBIDO COM SUCESSO',
          isFromContact: true,
          isRedFlag: true,
        },
        {
          id: 'm2',
          text: 'Você recebeu um PIX de R$ 5.000,00. Para liberar o valor em sua conta, confirme seus dados neste link.',
          isFromContact: true,
          isRedFlag: true,
        },
        {
          id: 'm3',
          text: 'Acesse: confirmar-pix-liberacao.net — Prazo: 2 horas',
          isFromContact: true,
          isRedFlag: true,
        },
      ],
      redFlags: [
        'PIX é instantâneo — não precisa de confirmação para "liberar"',
        'Nenhum banco pede confirmação de dados para receber dinheiro',
        'Site falso com nome enganoso',
        'Prazo de 2 horas para criar pânico',
      ],
      explanation:
        'Golpe do "PIX bloqueado". Quando você recebe um PIX, o dinheiro cai automaticamente na conta. Nunca é preciso clicar em link ou confirmar dados. Esta mensagem é uma armadilha.',
    },
    legit: {
      id: 'r5-legit',
      imageId: 'image-15',
      contactName: 'José — Academia Saúde+',
      contactEmoji: '🏋️',
      messages: [
        {
          id: 'm4',
          text: 'Boa tarde! Aqui é o José da Academia Saúde Mais.',
          isFromContact: true,
        },
        {
          id: 'm5',
          text: 'Passando para lembrar que sua mensalidade de agosto vence na próxima sexta-feira.',
          isFromContact: true,
        },
        {
          id: 'm6',
          text: 'Pode pagar pelo PIX: academia.saude@email.com ou pelo boleto que enviamos por e-mail.',
          isFromContact: true,
        },
      ],
      redFlags: [],
      explanation:
        'Lembrete legítimo de academia. A mensagem é direta, sem urgência excessiva e oferece formas de pagamento claras sem pedir senhas ou dados extras.',
    },
  },
  {
    id: 6,
    scam: {
      id: 'r6-scam',
      imageId: 'image-06',
      contactName: 'ANATEL Regulação',
      contactEmoji: '📡',
      messages: [
        {
          id: 'm1',
          text: '🚨 NOTIFICAÇÃO ANATEL — URGENTE 🚨',
          isFromContact: true,
          isRedFlag: true,
        },
        {
          id: 'm2',
          text: 'Sua linha telefônica será CANCELADA em 48 horas por irregularidade cadastral.',
          isFromContact: true,
          isRedFlag: true,
        },
        {
          id: 'm3',
          text: 'Regularize AGORA ou ligue *0800-anatel-regulariza.com.br',
          isFromContact: true,
          isRedFlag: true,
        },
      ],
      redFlags: [
        'A ANATEL não entra em contato por WhatsApp',
        'Endereço mistura número de telefone com site — não faz sentido',
        'Ameaça de cancelamento em 48h para criar pânico',
        'Número desconhecido se passando por órgão oficial',
      ],
      explanation:
        'Golpe da "ANATEL falsa". A ANATEL (Agência Nacional de Telecomunicações) não entra em contato por WhatsApp. Se tiver dúvida sobre sua linha, ligue diretamente para sua operadora.',
    },
    legit: {
      id: 'r6-legit',
      imageId: 'image-16',
      contactName: 'Clínica Vet PetCare',
      contactEmoji: '🐾',
      messages: [
        {
          id: 'm4',
          text: 'Bom dia! Aqui é a Clínica Veterinária PetCare.',
          isFromContact: true,
        },
        {
          id: 'm5',
          text: 'O Bolinha fez a cirurgia com sucesso e está se recuperando bem! 🐕',
          isFromContact: true,
        },
        {
          id: 'm6',
          text: 'Ele pode ser buscado a partir das 15h de hoje. Traga a carteirinha de vacinação.',
          isFromContact: true,
        },
        {
          id: 'm7',
          text: 'Que alívio! Obrigada pela notícia. Irei buscar às 16h.',
          isFromContact: false,
        },
      ],
      redFlags: [],
      explanation:
        'Atualização legítima sobre estado do pet em clínica veterinária. A mensagem é informativa, com detalhes práticos e sem solicitações suspeitas.',
    },
  },
  {
    id: 7,
    scam: {
      id: 'r7-scam',
      imageId: 'image-07',
      contactName: 'Amazon Prime BR',
      contactEmoji: '📦',
      messages: [
        {
          id: 'm1',
          text: 'Sua assinatura Amazon Prime foi renovada automaticamente por R$ 39,90.',
          isFromContact: true,
          isRedFlag: true,
        },
        {
          id: 'm2',
          text: 'Se você NÃO autorizou esta cobrança, cancele AGORA e solicite reembolso.',
          isFromContact: true,
          isRedFlag: true,
        },
        {
          id: 'm3',
          text: 'Acesse: amazon-br-cancelar.com e informe seu cartão para estorno.',
          isFromContact: true,
          isRedFlag: true,
        },
      ],
      redFlags: [
        'Site falso imitando a Amazon (amazon-br-cancelar.com não é oficial)',
        'Pede dados do cartão para "estorno" — isso é roubo de dados',
        'Usa o medo de cobrança indevida para fazer você agir rápido',
        'A Amazon nunca pede dados de cartão por WhatsApp',
      ],
      explanation:
        'Golpe da "Assinatura falsa". Criminosos inventam cobranças inexistentes para fazer você "cancelar" e, no processo, roubar seus dados bancários. A Amazon só se comunica pelo app ou site oficial.',
    },
    legit: {
      id: 'r7-legit',
      imageId: 'image-17',
      contactName: 'Marina (sobrinha)',
      contactEmoji: '👩‍🦰',
      messages: [
        {
          id: 'm4',
          text: 'Oi tia! Já fiz o depósito do aluguel. Obrigada por tudo como sempre! 😊',
          isFromContact: true,
        },
        {
          id: 'm5',
          text: 'Semana que vem, posso te levar ao médico na quarta às 9h?',
          isFromContact: true,
        },
        {
          id: 'm6',
          text: 'Claro minha linda! Fico esperando você. Beijo!',
          isFromContact: false,
        },
      ],
      redFlags: [],
      explanation:
        'Conversa familiar normal entre tia e sobrinha. Sem nenhum sinal de alerta — apenas comunicação cotidiana com oferta de ajuda.',
    },
  },
  {
    id: 8,
    scam: {
      id: 'r8-scam',
      imageId: 'image-08',
      contactName: 'Receita Federal',
      contactEmoji: '🏢',
      messages: [
        {
          id: 'm1',
          text: '⚠️ NOTIFICAÇÃO RECEITA FEDERAL — DÉBITO PENDENTE ⚠️',
          isFromContact: true,
          isRedFlag: true,
        },
        {
          id: 'm2',
          text: 'CPF com débito de R$ 3.200,00. Regularize em 72h para evitar PROCESSO CRIMINAL.',
          isFromContact: true,
          isRedFlag: true,
        },
        {
          id: 'm3',
          text: 'Clique para regularizar: receita-federal-debito.org',
          isFromContact: true,
          isRedFlag: true,
        },
      ],
      redFlags: [
        'A Receita Federal não envia cobranças por WhatsApp',
        'Site falso: ".org" não é domínio do governo brasileiro (gov.br)',
        'Ameaça de "processo criminal" para causar medo extremo',
        'A Receita envia notificações por correspondência ou pelo e-CAC oficial',
      ],
      explanation:
        'Golpe da "Receita Federal falsa". O site oficial da Receita Federal é receita.fazenda.gov.br. Qualquer outro endereço é fraude. Dívidas reais chegam por carta ou podem ser consultadas no gov.br.',
    },
    legit: {
      id: 'r8-legit',
      imageId: 'image-18',
      contactName: 'Supermercado Extra',
      contactEmoji: '🛒',
      messages: [
        {
          id: 'm4',
          text: 'Olá, Sr. Antônio! Aqui é o Supermercado Extra.',
          isFromContact: true,
        },
        {
          id: 'm5',
          text: 'Sua encomenda de cesta de Natal está pronta para retirada na loja.',
          isFromContact: true,
        },
        {
          id: 'm6',
          text: 'Atendemos de segunda a sábado, das 8h às 20h. Obrigado pela preferência!',
          isFromContact: true,
        },
      ],
      redFlags: [],
      explanation:
        'Aviso legítimo de supermercado sobre pedido disponível. Sem urgência, sem links suspeitos e sem pedidos de dados.',
    },
  },
  {
    id: 9,
    scam: {
      id: 'r9-scam',
      imageId: 'image-09',
      contactName: 'Lucas (neto) novo nº',
      contactEmoji: '👨',
      messages: [
        {
          id: 'm1',
          text: 'Vovô! Sou eu, o Lucas. Troquei de celular, esse é meu número novo.',
          isFromContact: true,
          isRedFlag: true,
        },
        {
          id: 'm2',
          text: 'Tô em apuros! Bati o carro e o seguro não cobre. Preciso de R$ 2.500,00 URGENTE.',
          isFromContact: true,
          isRedFlag: true,
        },
        {
          id: 'm3',
          text: 'Por favor não fala pra minha mãe ainda. Manda no PIX: 123.456.789-00. Te pago semana que vem!',
          isFromContact: true,
          isRedFlag: true,
        },
      ],
      redFlags: [
        '"Número novo" para justificar por que você não conhece o contato',
        'Pedido de sigilo ("não fala pra minha mãe") para evitar que você confirme com a família',
        'Urgência para que você não tenha tempo de verificar',
        'Regra de ouro: SEMPRE ligue para o neto diretamente antes de enviar qualquer valor',
      ],
      explanation:
        'Golpe do "Falso Parente em Apuros" — o mais comum contra idosos. Criminosos se passam por filhos ou netos pedindo dinheiro. SEMPRE ligue diretamente para o familiar antes de fazer qualquer PIX.',
    },
    legit: {
      id: 'r9-legit',
      imageId: 'image-19',
      contactName: 'Unimed Saúde',
      contactEmoji: '🏥',
      messages: [
        {
          id: 'm4',
          text: 'Olá! Aqui é a Central Unimed.',
          isFromContact: true,
        },
        {
          id: 'm5',
          text: 'Lembramos que sua consulta de revisão anual está agendada para 20/08 às 10h.',
          isFromContact: true,
        },
        {
          id: 'm6',
          text: 'Confirme sua presença respondendo SIM ou ligue (0800) 722-4848 para reagendar.',
          isFromContact: true,
        },
        {
          id: 'm7',
          text: 'SIM',
          isFromContact: false,
        },
        {
          id: 'm8',
          text: 'Ótimo! Consulta confirmada. Até lá! 😊',
          isFromContact: true,
        },
      ],
      redFlags: [],
      explanation:
        'Mensagem legítima de plano de saúde. A confirmação de consulta é simples, com número oficial para contato e sem pedidos de dados ou pagamentos.',
    },
  },
  {
    id: 10,
    scam: {
      id: 'r10-scam',
      imageId: 'image-10',
      contactName: 'CAIXA ECONÔMICA',
      contactEmoji: '🏦',
      messages: [
        {
          id: 'm1',
          text: '🎉 PARABÉNS! SEU FGTS FOI LIBERADO! 🎉',
          isFromContact: true,
          isRedFlag: true,
        },
        {
          id: 'm2',
          text: 'Valor disponível para saque: R$ 8.435,00. Prazo: até 31/07/2025.',
          isFromContact: true,
          isRedFlag: true,
        },
        {
          id: 'm3',
          text: 'Saque agora pelo link: caixa-fgts-saque-emergencial.com antes de expirar!',
          isFromContact: true,
          isRedFlag: true,
        },
      ],
      redFlags: [
        'A Caixa Econômica Federal nunca notifica sobre FGTS pelo WhatsApp',
        'Site falso imitando a Caixa (não é caixa.gov.br)',
        'Prazo de expiração falso para criar urgência',
        'Para consultar FGTS, use apenas o app oficial FGTS ou o site caixa.gov.br',
      ],
      explanation:
        'Golpe do "FGTS liberado". Criminosos criam expectativa de dinheiro fácil para fazê-lo clicar em links falsos. Consulte seu FGTS sempre pelo aplicativo oficial da Caixa ou agências físicas.',
    },
    legit: {
      id: 'r10-legit',
      imageId: 'image-20',
      contactName: 'Dona Rosa — Vizinha',
      contactEmoji: '👵',
      messages: [
        {
          id: 'm4',
          text: 'Boa tarde! Sou a Rosa, vizinha do apartamento 42.',
          isFromContact: true,
        },
        {
          id: 'm5',
          text: 'Encontrei o seu gato Mingau aqui no corredor. Ele está bem, só com fome.',
          isFromContact: true,
        },
        {
          id: 'm6',
          text: 'Quando puder, pode vir buscar! Estou em casa o dia todo.',
          isFromContact: true,
        },
        {
          id: 'm7',
          text: 'Meu Deus, obrigada vizinha! Que susto! Já vou aí buscar ele.',
          isFromContact: false,
        },
      ],
      redFlags: [],
      explanation:
        'Mensagem simpática de uma vizinha sobre o gato perdido. Completamente normal e sem nenhum sinal de alerta.',
    },
  },
]
