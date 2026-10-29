// Dados de contato e chaves do site. Tudo que é PLACEHOLDER está marcado com TODO.

export const SITE = {
  name: 'Nukki Tech',
  domain: 'nukkitech.com.br',
  url: 'https://nukkitech.com.br',
  title: 'Nukki Tech · Soluções além do código',
  description:
    'Automações, sistemas, apps e sites sob medida para escritórios, comércios e empresas de serviço. Atendimento em todo o Brasil.',
};

// TODO [PLACEHOLDER]: número real do WhatsApp (só dígitos: 55 + DDD + número).
const WHATSAPP_NUMBER = '55XXXXXXXXXXX';
const WHATSAPP_MESSAGE =
  'Olá! Vim pelo site da Nukki Tech e queria conversar sobre uma coisa que está dando trabalho.';

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

// TODO [PLACEHOLDER]: e-mail real.
export const EMAIL = 'contato@nukkitech.com.br';

// TODO [PLACEHOLDER: quais redes]: confirmar redes e links com o Gustavo.
// Para tirar uma rede do site, apague a linha dela. Ícones disponíveis: instagram, linkedin.
export const SOCIALS: { name: string; url: string; icon: 'instagram' | 'linkedin' }[] = [
  { name: 'Instagram', url: '#', icon: 'instagram' },
  { name: 'LinkedIn', url: '#', icon: 'linkedin' },
];

// TODO [PLACEHOLDER]: CNPJ (deixe vazio para esconder do rodapé).
export const CNPJ = '00.000.000/0000-00';

// Seção "Na prática". Desligue (false) se não houver casos reais no lançamento.
export const SHOW_CASES = true;
