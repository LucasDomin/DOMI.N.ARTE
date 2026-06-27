import type { Project } from "@/db/schema";

export type Still = { url: string; type: string; order: number };

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
};

export const DEFAULT_PROJECTS: Project[] = [
  {
    id: 1,
    slug: "nordic-brew",
    title: "Nordic Brew Co.",
    subtitle: "Identidade visual autoral e sistema de embalagens",
    category: "identidade",
    client: "Nordic Brew Co.",
    year: "2025",
    location: "Copenhague",
    duration: "12 semanas",
    format: "Brand Identity · Packaging · Manual",
    coverImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1600&q=85",
    color: "#C9A56C",
    description: "Identidade visual autoral para cervejaria artesanal de ultra-luxo nórdica.",
    context:
      "Uma cervejaria artesanal nórdica prestes a entrar no mercado ultra-premium de restaurantes Michelin na Europa. A categoria estava dominada por estéticas austeras e frias.",
    concept:
      "O tempo silencioso da fermentação traduzido em forma. Resgatar o calor humano escandinavo através de texturas táteis, tipografia serifada neo-clássica e vidro âmbar de farmacopeia.",
    direction:
      "Direção de arte contemplativa com predomínio absoluto de preto fosco, carimbo em relevo seco no papel algodão e contrastes acentuados de luz lateral.",
    result:
      "Listagem imediata em 14 restaurantes com estrela Michelin. Aumento de 280% no valor percebido por garrafa no primeiro semestre pós-lançamento.",
    isDraft: false,
    featured: true,
    stills: [],
    credits: [
      { role: "Direção Criativa & Arte", name: "DOMI.N.ARTE" },
      { role: "Tipografia", name: "Type Atelier" },
    ],
    awards: ["Brand New 2025 · Notable", "Dieline Awards · Finalist"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    slug: "vertex-ai",
    title: "Vertex Generative",
    subtitle: "Direção cinematográfica e experiência web",
    category: "web",
    client: "Vertex Technologies",
    year: "2025",
    location: "São Paulo",
    duration: "6 semanas",
    format: "Experiência Web · Next.js · Motion",
    coverImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1600&q=85",
    color: "#C9A56C",
    description: "Experiência digital imersiva para plataforma generativa enterprise.",
    context:
      "Uma empresa de inteligência artificial de ponta precisando se desvencilhar do visual padrão corporativo de SaaS (ilustrações genéricas em tons roxos e azuis).",
    concept:
      "A máquina como um prisma óptico. Interfaces monocromáticas profundas onde a inteligência emerge através de feixes de luz concentrados e tipografia editorial expressiva.",
    direction:
      "Abandono total de componentes de UI padrão. Navegação fluida orientada a scroll cinematográfico com transições suaves e tipografia em proporções gigantescas.",
    result:
      "Permanência média no site aumentou de 22s para 3min45s. Demos qualificadas enterprise cresceram 340% nos primeiros 60 dias.",
    isDraft: false,
    featured: true,
    stills: [],
    credits: [
      { role: "Direção Criativa & Web Dev", name: "DOMI.N.ARTE" },
      { role: "Copywriting", name: "Ana Ferraz" },
    ],
    awards: ["Awwwards · Honorable Mention", "CSS Design Awards"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    slug: "flux-analytics",
    title: "Flux Systems",
    subtitle: "Linguagem visual e sistema de produto",
    category: "saas",
    client: "Flux Inc.",
    year: "2024",
    location: "Berlim",
    duration: "16 semanas",
    format: "Produto Digital · Design System · React",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=85",
    color: "#C9A56C",
    description: "Design de produto e linguagem visual para plataforma de inteligência de dados.",
    context:
      "Plataforma alemã de inteligência de negócios lidando com volumes colossais de informação financeira e enfrentando altíssima taxa de churn nas primeiras horas.",
    concept:
      "Arquitetura do silêncio. Reduzir a densidade cognitiva eliminando bordas supérfluas, cores decorativas e ruído visual, mantendo apenas o sinal de dados vital.",
    direction:
      "Interface escura de precisão cirúrgica. Hierarquia tipográfica severa, micro-interações táteis e paleta estritamente monocromática com acentos pontuais em ouro velho.",
    result:
      "Retenção D30 subiu de 38% para 71%. NPS dobrou de 32 para 64. Tempo médio para criação da primeira análise reduziu em 60%.",
    isDraft: false,
    featured: true,
    stills: [],
    credits: [
      { role: "Product Design & Direção", name: "DOMI.N.ARTE" },
      { role: "Design System", name: "Rafael Torres" },
    ],
    awards: ["Product Hunt #2 Product of the Day"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    slug: "aurum-jewelry",
    title: "Aurum Joalheria",
    subtitle: "Experiência de e-commerce de alto luxo",
    category: "web",
    client: "Aurum",
    year: "2024",
    location: "Milão",
    duration: "10 semanas",
    format: "E-commerce · Headless · Three.js",
    coverImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1600&q=85",
    color: "#C9A56C",
    description: "E-commerce headless de joalheria de luxo com experiência editorial.",
    context:
      "Joalheria tradicional milanesa buscando expandir suas vendas digitais sem deteriorar a sensação física de exclusividade, intimidade e tato.",
    concept:
      "A joia sob a lente macro. Proporcionar ao visitante o escrutínio tátil de cada engaste através de transições de câmera lentas e foco seletivo.",
    direction:
      "Composição editorial inspirada na Vogue Itália dos anos 80. Fundo preto absoluto, tipografia display serifada em alto contraste e checkout invisível em 3 passos.",
    result:
      "Vendas digitais aumentaram 215% no primeiro trimestre. O ticket médio online igualou pela primeira vez ao da flagship de Milão.",
    isDraft: false,
    featured: false,
    stills: [],
    credits: [
      { role: "Direção de Arte & Web", name: "DOMI.N.ARTE" },
      { role: "Three.js", name: "Studio Volume" },
    ],
    awards: ["Shopify Design Awards · Finalist"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    slug: "pulse-health",
    title: "Pulse Longevity",
    subtitle: "Linguagem visual para ecossistema de saúde",
    category: "saas",
    client: "Pulse Health Tech",
    year: "2024",
    location: "São Paulo",
    duration: "20 semanas",
    format: "Mobile App & Ecosystem",
    coverImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=85",
    color: "#C9A56C",
    description: "Linguagem visual e produto digital para ecossistema de longevidade.",
    context:
      "Aplicativo de saúde preventiva voltado para executivos de alto nível (35-55 anos) cansados de aplicativos de bem-estar repletos de gamificação infantil e badges coloridas.",
    concept:
      "Sobriedade biológica. Tratar a longevidade com respeito clínico, oferecendo relatórios biológicos de precisão com visual de galeria minimalista.",
    direction:
      "Eliminação de elementos infantis de retenção. Gráficos de linhas finas em tons acinzentados, tipografia monoespaçada de laboratório e fluidez absoluta nas transições.",
    result:
      "50.000 executivos ativos no primeiro mês com retenção D7 de 78%. Selecionado como App do Dia na Apple App Store.",
    isDraft: false,
    featured: false,
    stills: [],
    credits: [
      { role: "Product Design & Direção", name: "DOMI.N.ARTE" },
      { role: "Mobile Eng", name: "Bruno Santos" },
    ],
    awards: ["App Store · App of the Day"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 6,
    slug: "terroir-wines",
    title: "Terroir Mendoza",
    subtitle: "Rebranding autoral e ecossistema digital",
    category: "identidade",
    client: "Vinícola Terroir",
    year: "2024",
    location: "Mendoza",
    duration: "14 semanas",
    format: "Rebranding · Packaging · Web",
    coverImage: "https://images.unsplash.com/photo-1474722883778-792e7990302f?auto=format&fit=crop&w=1600&q=85",
    color: "#C9A56C",
    description: "Rebranding completo para vinícola familiar histórica na Argentina.",
    context:
      "Vinícola boutique com 60 anos de história precisando ingressar no mercado de colecionadores europeus sem sacrificar sua herança tradicional de família.",
    concept:
      "A geologia da cordilheira. Traduzir as camadas rochosas de Mendoza em relevos de papel, paleta de solos vulcânicos e tipografia monumental.",
    direction:
      "Rótulos numerados à mão com bordas rasgadas artesanalmente, livro de marca encadernado em linho e experiência web imersiva multilíngue.",
    result:
      "Entrada consolidada em 7 países europeus em 8 meses. Valorização de 180% na precificação da safra de reserva especial.",
    isDraft: false,
    featured: false,
    stills: [],
    credits: [
      { role: "Direção Criativa & Arte", name: "DOMI.N.ARTE" },
      { role: "Fotografia Still", name: "Martín López" },
    ],
    awards: ["Pentawards · Bronze"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "A DOMI.N.ARTE não entregou apenas um design. Eles cristalizaram a alma criativa da Vertex. A percepção de valor corporativo mudou no dia em que lançamos a nova experiência.",
    author: "Carolina Mendes",
    role: "Founder & CEO",
    company: "Vertex Technologies",
  },
  {
    quote:
      "Direção criativa com rigor de engenharia. É extremamente raro encontrar alguém que domine a estética sensorial do cinema e a arquitetura técnica de um produto digital.",
    author: "Lukas Schmidt",
    role: "Head of Product",
    company: "Flux Inc.",
  },
  {
    quote:
      "Existe o design comercial genérico e existe a assinatura autoral. A coerência entre a nossa identidade física de Milão e a presença digital criada aqui é impecável.",
    author: "Isabella Romano",
    role: "Brand Director",
    company: "Aurum Joalheria",
  },
];

export const BRANDS = [
  "Vertex Generative",
  "Flux Systems",
  "Aurum Milano",
  "Nordic Brew Co.",
  "Pulse Longevity",
  "Terroir Mendoza",
  "Atelier Beira",
  "Studio Volume",
  "Maison Vétiver",
  "Saint Cyr",
];

export const STATS = [
  { value: "60+", label: "Obras entregues" },
  { value: "12", label: "Países de atuação" },
  { value: "8", label: "Prêmios internacionais" },
  { value: "98%", label: "Retenção de clientes" },
];
