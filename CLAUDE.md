# Nukki Tech — site institucional

Briefing do site da Nukki Tech. Leia antes de qualquer tarefa neste projeto.
Tudo aqui já foi decidido com o Gustavo. Se algo precisar mudar, pergunte antes.
Quando um pedido deixar uma escolha de design/UX em aberto (o que aparece no celular, o que some, efeitos colaterais), **pergunte antes de decidir**.

## Sobre a empresa

- **Nukki Tech**: empresa de tecnologia de uma pessoa só (Gustavo Moreira).
- Faz: automações, extração de dados, relatórios e painéis, sistemas e apps sob medida, sites.
- Público: escritórios, comércios e empresas de serviço. Atendimento remoto para todo o Brasil.
- Nome vem de *Tanuki*. Mascote: o Nukki, um tanuki com uma folha na cabeça, saindo de dentro de um círculo azul escuro até o torso. O desenho é do Gustavo e provavelmente vai virar o logo.
- **Slogan: "Soluções além do código."**
- Domínio: **nukkitech.com.br**

## Objetivo do site

A pessoa tem que bater o olho e pensar "nossa, eles fazem isso".
Realista, transparente e direto. **Pouco texto.** Uma ideia por seção.
Ação principal: **chamar no WhatsApp**.

## Stack

- **Astro** (site estático, uma página)
- **GSAP + ScrollTrigger** para animações (gratuito, inclusive plugins e uso comercial)
- **Lenis** para rolagem suave
- CSS próprio com variáveis (sem Tailwind, a menos que o Gustavo peça)
- Deploy: Vercel ou Cloudflare Pages (a definir)

Requisitos:
- Mobile first: a maior parte do tráfego vem de links no WhatsApp e Instagram.
- Leve: Lighthouse 90+ em performance no celular. Imagens em WebP/AVIF com tamanhos responsivos.
- Acessível: contraste AA, navegação por teclado, `alt` em imagens, HTML semântico.
- SEO básico: title, meta description, Open Graph, `lang="pt-BR"`.

## Tom de voz

- Frases curtas. Títulos com até ~10 palavras.
- Fala de **problemas e resultados**, nunca de tecnologia. Nada de "ETL", "API", "stack", "solução robusta", "alavancar".
- A marca fala como "a gente". A seção "Quem faz" fala em primeira pessoa ("eu").
- Nunca prometer o que uma operação de uma pessoa não sustenta (nada de "24h", "entrega em 48h").

## Estrutura da página (ordem fixa)

Os textos abaixo são a versão atual. Os marcados com `[PLACEHOLDER]` são genéricos e serão trocados depois: deixe-os visualmente marcados no código (comentário `TODO`) para fácil localização.

### Topo fixo
- Logo Nukki Tech à esquerda.
- No centro, âncoras com nomes curtos: **Soluções · Casos · Processo · Sobre · Contato**. "Casos" some junto com a seção.
- À direita: botão de modo claro/escuro e o botão **"Chamar no WhatsApp"**.
- **No celular:** só o logo e o botão de modo claro/escuro (sem âncoras e sem WhatsApp no topo).
- A barra fecha das laterais para o centro **acompanhando a rolagem** no trecho final do hero; quando o próximo bloco chega ao topo, some. Subindo, reabre do mesmo jeito.

### 1. Hero — "O que é isso?"
- Mascote Nukki (ver seção Animações).
- Título: **"Soluções além do código."** (o slogan).
- Subtítulo: "A gente cria [automações / sistemas / apps / relatórios / sites]", com a palavra alternando sozinha.
- Botão: **"Chamar no WhatsApp"**
- Microtexto abaixo do botão: "Resposta em até 1 dia útil."

### 2. O que nós resolvemos — "Serve pra mim?"
Título no site: **"O que nós resolvemos"** (pedido do Gustavo; exceção ao "a gente").
Quatro cartões no formato **antes → depois**, numa **pilha em cascata**: um na frente, os outros atrás; a cada 5 s o da frente vai pro fim da fila. Setas dos lados (no celular, embaixo), arrastar para o lado e botão de pausar.

| Frente | Antes | Depois |
|---|---|---|
| Automação | PDFs lidos um por um e digitados na planilha | Dados extraídos e organizados sozinhos |
| Relatórios | Uma tarde inteira montando relatório | Relatório pronto em minutos, com os números que importam |
| Sistemas e apps | Controle em planilha, caderno e WhatsApp | Um sistema feito pro seu jeito de trabalhar |
| Sites | O cliente procura e não encontra você | Um site rápido que leva direto pro seu WhatsApp |

### 3. Na prática — "Eles já fizeram isso?"
2 a 3 casos em formato de ficha: **setor · antes · depois · resultado**. Por enquanto, todos `[PLACEHOLDER]`:

> **[PLACEHOLDER] Escritório de serviços**
> Antes: documentos analisados manualmente, página por página.
> Depois: informações extraídas e organizadas automaticamente.
> Resultado: [X horas → Y minutos]

Regras desta seção:
- **Nunca** inventar depoimentos, números ou logos de clientes.
- Casos sem nome de cliente; prints sempre com dados fictícios.
- Se não houver casos reais no lançamento, a seção pode ficar oculta (deixar fácil de ligar/desligar).
- Rodapé pode trazer: "Este site foi feito pela Nukki."

### 4. Como funciona — "Como é trabalhar com eles?"
1. **Entendemos o seu negócio.** Antes de falar de tecnologia, entendemos sua rotina e onde está o problema.
2. **Montamos o projeto.** O que vai ser feito, em que ordem, e o que fica de fora.
3. **Proposta com preço e prazo.** Tudo definido por etapa, antes de começar.
4. **Entregas por etapa.** Você vê funcionando e aprova antes da próxima.

No site aparecem só os títulos curtos dos passos (pouco texto).

Fechamento: *"Se o seu problema não se resolve com tecnologia, a gente te fala."*

Não mencionar "conversa gratuita".

### 5. Quem faz — "Dá pra confiar?"
- Foto do Gustavo `[PLACEHOLDER]`.
- Texto: "**Gustavo Moreira.** A Nukki é tocada por mim, do diagnóstico à entrega. Desde 2022 desenvolvendo automações e sistemas para empresas. Você fala direto com quem faz." `[PLACEHOLDER: revisar com o Gustavo]`

### 6. Contato
- Título: **"Conta pra gente o que está dando trabalho."**
- Botão grande: "Chamar no WhatsApp" (link `https://wa.me/55XXXXXXXXXXX` `[PLACEHOLDER]` com mensagem pré-preenchida).
- Abaixo, menores: e-mail `[PLACEHOLDER]` e ícones de redes `[PLACEHOLDER: quais redes]`.
- Rodapé: Nukki Tech · CNPJ `[PLACEHOLDER]` · nukkitech.com.br

### Fora do site (não adicionar)
Missão/visão/valores, lista de tecnologias, blog, contadores tipo "+100 projetos", depoimentos, logos de clientes, pop-ups, chat flutuante.

## Animações

Princípio: **tecnológico e inovador nos detalhes, sem enfeite**. Histórico: a 1ª versão ficou minimalista demais, a 2ª (formas coloridas, folhas, estrelas) ficou infantilizada. Desde 22/10/2026: visual técnico, pouca informação, microinterações caprichadas. Mesma duração e curva em tudo. **Nada trava o scroll** (sem `pin`).

- **Lenis** no site inteiro (rolagem suave). Integrar com ScrollTrigger (`lenis.on('scroll', ScrollTrigger.update)` + `gsap.ticker`).
- **Um padrão de entrada único** para todos os elementos: fade + leve subida, mesma duração e mesma curva em todo o site (definir como constantes compartilhadas, ex.: `DURATION`, `EASE`).
- **Parallax leve** só no brilho e no mascote do hero (`data-depth`). **Sem formas decorativas** (círculos, blobs, folhas soltas, estrelas).
- **Momentos especiais:**
  0. **Slogan:** caracteres trocando que aos poucos formam "Soluções além do código."; as palavras do subtítulo alternam com o mesmo efeito (GSAP ScrambleText).
  1. **Hero:** Nukki sai de dentro do círculo (sobe, mascarado pela parte de baixo do círculo), a folha balança, depois joinha + piscadela.
  2. **Pilha antes → depois:** cada cartão que chega na frente embaralha o texto do antes até virar o depois.
  3. **Como funciona:** um trilho se preenche conforme o scroll e acende cada passo quando chega nele (sem prender a seção).
  4. Todo o resto: padrão de entrada.
- **Botões:** fundo da superfície com borda na cor do texto, mais grossa embaixo (no claro: branco com borda preta; no escuro, invertido). No hover o botão abaixa e a borda de baixo diminui, como se fosse apertado.
- **Microinterações de hover:** cantos de "mira" nas células, fichas que deslizam, linha de scanner na foto, sublinhado que cresce nos links.
- **`prefers-reduced-motion`:** desligar Lenis e animações, mostrar tudo no estado final.

### Mascote: status dos assets
- O desenho final do Nukki **ainda não existe em vetor**. Usar um placeholder simples (círculo azul escuro + silhueta) com a mesma estrutura de peças, para trocar depois sem refazer a animação.
- Plano final:
  - Corpo do Nukki como **SVG em camadas nomeadas** (`corpo`, `cabeca`, `folha`, `braco`, `olho-esq`, `olho-dir`), animado por peças com GSAP.
  - Joinha + piscadela: possivelmente desenhados quadro a quadro (Procreate/Krita, 8 a 12 frames, PNG com fundo transparente, 2x o tamanho de exibição) e montados em **sprite sheet**, disparado pelo GSAP quando o Nukki termina de subir.
- Componentizar o mascote de forma que a troca placeholder → SVG → sprite seja isolada.

## Identidade visual

- Cor confirmada: **azul escuro** do círculo do mascote.
- **Modo claro e modo escuro** (segue o sistema; botão no topo para trocar).
- Modo escuro em azul-acinzentado (não quase preto: o Gustavo achou escuro demais).
- Títulos de seção sem numeração nem rótulos tipo "01 · Serve pra mim?" (as perguntas entre aspas no briefing são só a intenção de cada seção).
- Acento: **violeta**. Visual técnico: grade fina de fundo, linhas de 1px, rótulos em fonte mono, brilho violeta suave.
- Tipografia: Geist (texto e títulos) + Geist Mono (rótulos, números). Centralizar tudo em variáveis CSS (`--color-*`, `--font-*`).

## Referência de estilo

Portfólio de Cristopher Martins (cristophermartins.com): estudar a fluidez (escala, opacidade, sombras e timing consistente). **Não copiar** código, layout ou componentes: o repositório não tem licença.

## Pendências (perguntar ao Gustavo quando chegar a hora)

- Casos reais para a seção "Na prática" (setor, antes, depois, resultado).
- Número de WhatsApp, e-mail e quais redes sociais.
- CNPJ (se já aberto).
- Foto e texto final da seção "Quem faz".
- Tons finais da paleta e tipografia.
- Desenho final do Nukki (SVG em camadas + frames do joinha/piscadela) e versão como logo.
