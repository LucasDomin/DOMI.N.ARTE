import type { Project, SiteConfig } from "@/db/schema";

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
    mainVideo: "",
    headline: "Nordic Brew Co. — Escandinávia",
    subheadline: "O tempo silencioso da fermentação em garrafas premium",
    description: "Identidade visual autoral para cervejaria artesanal de ultra-luxo nórdica.",
    context:
      "Uma cervejaria artesanal nórdica prestes a entrar no mercado ultra-premium de restaurantes de alta gastronomia na Europa. A categoria estava dominada por estéticas frias e industriais.",
    concept:
      "O tempo silencioso da fermentação traduzido em forma. Resgatar o calor humano através de texturas táteis, tipografia serifada neo-clássica e vidro de farmacopeia.",
    direction:
      "Direção de arte contemplativa com predomínio absoluto de preto fosco, carimbo em relevo seco no papel de algodão e contrastes acentuados de luz.",
    challenge:
      "Vencer a barreira da desconfiança em relação a marcas novas no circuito tradicional europeu, mantendo a autenticidade.",
    solution:
      "Sistema visual baseado em tipografia customizada com referências de meados do século. Paleta restrita de três cores quentes, embalagens serigrafadas e manual de marca rigoroso.",
    result:
      "Aumento de 280% no ticket médio e listagem imediata em 14 restaurantes com estrela Michelin.",
    isDraft: false,
    featured: true,
    stills: [],
    credits: [
      { role: "Direção Criativa & Arte", name: "DOMI.N.ARTE" },
      { role: "Tipografia", name: "Type Atelier" },
    ],
    awards: ["Brand New 2025 · Notable", "Dieline Awards · Finalist"],
    tags: ["branding", "photography"],
    seoTitle: "Nordic Brew Co. — Identidade Visual Autoral",
    seoDescription: "Case study completo do rebranding e manual de marca para Nordic Brew Co.",
    seoOgImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1600&q=85",
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
    mainVideo: "",
    headline: "Vertex Generative — Inteligência Prismática",
    subheadline: "Interfaces de luz e foco que transcendem o comum",
    description: "Experiência digital imersiva para plataforma generativa enterprise.",
    context:
      "Uma empresa de inteligência artificial de ponta precisando se desvencilhar do visual padrão corporativo de SaaS que domina o mercado internacional.",
    concept:
      "A máquina como um prisma óptico. Interfaces monocromáticas profundas onde a inteligência emerge através de feixes de luz concentrados.",
    direction:
      "Abandono total de componentes de UI padrão. Navegação fluida orientada a scroll cinematográfico com transições suaves e tipografia monumental.",
    challenge:
      "Tornar tangível a tecnologia generativa empresarial de maneira séria e de altíssimo valor de mercado.",
    solution:
      "Arquitetura editorial em Next.js com animações Framer Motion, hero cinematográfico e CTAs contextuais sem fricção cognitiva.",
    result:
      "Taxa de conversão para solicitação de demos enterprise aumentou em 340% nos primeiros dois meses.",
    isDraft: false,
    featured: true,
    stills: [],
    credits: [
      { role: "Direção Criativa & Web Dev", name: "DOMI.N.ARTE" },
      { role: "Copywriting", name: "Ana Ferraz" },
    ],
    awards: ["Awwwards · Honorable Mention", "CSS Design Awards"],
    tags: ["web", "motion"],
    seoTitle: "Vertex Generative — Experiência Web Imersiva",
    seoDescription: "Estudo de caso de design de interface e desenvolvimento Next.js para Vertex AI.",
    seoOgImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1600&q=85",
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
    mainVideo: "",
    headline: "Flux Systems — A Arquitetura do Silêncio",
    subheadline: "Sinal sobre ruído em painéis financeiros de alta complexidade",
    description: "Design de produto e linguagem visual para plataforma de inteligência de dados.",
    context:
      "Plataforma alemã de inteligência de negócios lidando com volumes colossais de dados financeiros enfrentando alta barreira de onboarding.",
    concept:
      "Arquitetura do silêncio. Reduzir a densidade cognitiva eliminando decorações e mantendo o sinal vital dos números em primeiro plano.",
    direction:
      "Interface escura com precisão cirúrgica, micro-interações táteis e hierarquia tipográfica de altíssima severidade.",
    challenge:
      "Simplificar relatórios densos mantendo o poder analítico inalterado.",
    solution:
      "Design system modular de 120+ componentes e fluxo de onboarding estruturado em 3 níveis contextuais simples.",
    result:
      "Retenção D30 subiu de 38% para 71% e o tempo médio para primeira visualização diminuiu em 60%.",
    isDraft: false,
    featured: true,
    stills: [],
    credits: [
      { role: "Product Design & Direção", name: "DOMI.N.ARTE" },
      { role: "Design System", name: "Rafael Torres" },
    ],
    awards: ["Product Hunt #2 Product of the Day"],
    tags: ["saas"],
    seoTitle: "Flux Systems — Design de Produto & SaaS",
    seoDescription: "Redesign completo do produto e documentação de design system para Flux Inc.",
    seoOgImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=85",
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
    mainVideo: "",
    headline: "Aurum Milano — O Escrutínio do Detalhe",
    subheadline: "Traduzindo a experiência sensorial física para o pixel",
    description: "E-commerce headless de joalheria de luxo com experiência editorial.",
    context:
      "Joalheria tradicional milanesa buscando expandir suas vendas digitais sem deteriorar a sensação física de exclusividade e intimidade.",
    concept:
      "A joia sob a lente macro. Proporcionar ao visitante o escrutínio tátil de cada engaste através de transições de câmera lentas e foco seletivo.",
    direction:
      "Composição editorial inspirada na Vogue Itália. Fundo preto absoluto, tipografia display serifada em alto contraste e checkout invisível.",
    challenge:
      "Manter o sentimento de requinte e alta-costura em dispositivos portáteis comuns.",
    solution:
      "Arquitetura headless de Next.js conectada a Shopify Plus, com renderização webGL para renderização de joias em tempo real.",
    result:
      "Vendas digitais aumentaram em 215% no primeiro trimestre e o ticket médio online igualou-se ao da boutique física.",
    isDraft: false,
    featured: false,
    stills: [],
    credits: [
      { role: "Direção de Arte & Web", name: "DOMI.N.ARTE" },
      { role: "Three.js", name: "Studio Volume" },
    ],
    awards: ["Shopify Design Awards · Finalist"],
    tags: ["web", "branding"],
    seoTitle: "Aurum Joalheria — E-commerce Headless",
    seoDescription: "Design e engenharia de e-commerce para Aurum Milão.",
    seoOgImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1600&q=85",
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
    mainVideo: "",
    headline: "Pulse Longevity — Sobriedade Biológica",
    subheadline: "Métricas preventivas sem condescendência ou distrações",
    description: "Linguagem visual e produto digital para ecossistema de longevidade.",
    context:
      "Aplicativo de saúde preventiva voltado para executivos de alto nível cansados de aplicativos de bem-estar repletos de gamificação infantil.",
    concept:
      "Sobriedade biológica. Tratar a longevidade com respeito clínico, oferecendo relatórios biológicos de precisão com visual de galeria minimalista.",
    direction:
      "Gráficos de linhas finas em tons acinzentados, tipografia monoespaçada de laboratório e fluidez absoluta nas transições.",
    challenge:
      "Gerar engajamento diário de longo prazo sem utilizar táticas invasivas ou estressantes de retenção.",
    solution:
      "Layout contextualizado e integrado com wearables, proporcionando feedback biológico calmo e com leitura editorial.",
    result:
      "50.000 usuários ativos e destaque imediato como 'App do Dia' da Apple App Store global.",
    isDraft: false,
    featured: false,
    stills: [],
    credits: [
      { role: "Product Design & Direção", name: "DOMI.N.ARTE" },
      { role: "Mobile Eng", name: "Bruno Santos" },
    ],
    awards: ["App Store · App of the Day"],
    tags: ["saas"],
    seoTitle: "Pulse Longevity — App de Saúde Preventiva",
    seoDescription: "Case completo de UI/UX e linguagem de produto para Pulse Health.",
    seoOgImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=85",
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
    mainVideo: "",
    headline: "Terroir Mendoza — A Geologia do Vinho",
    subheadline: "A rocha, a altitude e as safra histórica no papel",
    description: "Rebranding completo para vinícola familiar histórica na Argentina.",
    context:
      "Vinícola histórica precisando de reposicionamento de marca para conquistar mercados exigentes na Europa e Ásia.",
    concept:
      "A geologia da cordilheira. Traduzir as camadas rochosas em relevos de papel, paleta vulcânica e tipografia monumental.",
    direction:
      "Rótulos numerados à mão com bordas rasgadas, livro de marca encadernado em linho e site multilíngue de alta performance.",
    challenge:
      "Equilibrar os 60 anos de herança familiar com uma identidade contemporânea e altamente sofisticada.",
    solution:
      "Logotipo neo-clássico com ligaturas refinadas, sessão fotográfica autoral com iluminação lateral de alto contraste e transições Next.js.",
    result:
      "Entrada em 7 novos mercados de colecionadores e valorização imediata de 180% na safra especial.",
    isDraft: false,
    featured: false,
    stills: [],
    credits: [
      { role: "Direção Criativa & Arte", name: "DOMI.N.ARTE" },
      { role: "Fotografia Still", name: "Martín López" },
    ],
    awards: ["Pentawards · Bronze"],
    tags: ["branding", "photography"],
    seoTitle: "Terroir Mendoza — Rebranding Autoral",
    seoDescription: "Identidade visual e design de embalagens para Vinícola Terroir.",
    seoOgImage: "https://images.unsplash.com/photo-1474722883778-792e7990302f?auto=format&fit=crop&w=1600&q=85",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  id: "default",
  manifestoTitle: "O Manifesto da Imagem",
  manifestoText1: "Imagem não é decoração. Imagem constrói percepção.",
  manifestoText2: "Movimento não é detalhe. Movimento cria presença.",
  manifestoText3: "Estética sem intenção é ruído. Direção transforma ruído em identidade.",
  aboutTitle: "Assinatura Criativa",
  aboutText1: "DOMI.N.ARTE é uma assinatura criativa autoral atuando na interseção exata de direção de arte, branding, motion e desenvolvimento web.",
  aboutText2: "Trabalhamos com marcas que buscam soberania de mercado através de uma narrativa proprietária, rigor estético impecável e presença inesquecível.",
  contactEmail: "contato@dominiarte.com",
  contactPhone: "+55 (11) 98888-7777",
  contactAvailability: "Disponível para 2 projetos · Q1 2026",
  socialInstagram: "https://instagram.com/dominarte",
  socialBehance: "https://behance.net/dominarte",
  socialLinkedin: "https://linkedin.com/company/dominarte",
  updatedAt: new Date(),
};

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
