/**
 * DEFAULT DATA — usado quando o banco não está disponível ou está vazio.
 *
 * AÇÃO NECESSÁRIA: Substitua estes dados pelos seus projetos reais.
 * Adicione projetos reais via /admin após configurar o banco de dados.
 *
 * Enquanto não tem projetos reais, a galeria ficará vazia (melhor que fake).
 */

export interface Still {
  url: string;
  type: "branding" | "motion" | "component" | "editorial";
  order: number;
}

// Intencionalmente vazio — sem projetos fictícios.
// A galeria mostra "Em breve" até projetos reais serem adicionados via /admin.
export const DEFAULT_PROJECTS: any[] = [];

export const DEFAULT_SITE_CONFIG = {
  id: "default",
  manifestoTitle: "DOMI.N.ARTE",
  manifestoText1: "Direção criativa com raízes em type design e design editorial.",
  manifestoText2: "Construímos identidades visuais que resistem ao tempo.",
  manifestoText3: "",
  aboutTitle: "Sobre o Estúdio",
  aboutText1: "Estúdio independente de direção criativa.",
  aboutText2: "",
  contactEmail: "ola@dominarte.com.br",
  contactPhone: "",
  contactAvailability: "Aceitando projetos para Q3 2026",
  socialInstagram: "https://instagram.com/dominarte",
  socialBehance: "https://behance.net/dominarte",
  socialLinkedin: "https://linkedin.com/company/dominarte",
  updatedAt: new Date(),
};
