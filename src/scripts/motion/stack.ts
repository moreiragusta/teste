// Pilha de cartões do "O que nós resolvemos".
// Um cartão na frente, os outros em cascata atrás. A cada STACK_INTERVAL o da frente
// sai pro lado e vai pro fim da fila. Setas, arrastar para o lado e ←/→ trocam na mão.
// Pausa sozinho com o mouse/foco em cima, fora da tela ou com a aba escondida,
// e tem um botão de pausar (exigência de acessibilidade para conteúdo que se move sozinho).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DURATION, EASE, SCRAMBLE_CHARS, STACK_INTERVAL } from './constants';

const OFFSET = 16; // px entre as camadas da cascata
const SCALE_STEP = 0.05; // quanto cada camada de trás diminui
const VISIBLE_BEHIND = 2; // quantos cartões aparecem atrás do da frente
const SWIPE = 50; // px de arrasto para trocar

export function initStack(root: HTMLElement) {
  const list = root.querySelector<HTMLElement>('[data-stack-cards]');
  const cards = gsap.utils.toArray<HTMLElement>('[data-card]', root);
  const dots = gsap.utils.toArray<HTMLElement>('[data-stack-dot] span', root);
  const pauseButton = root.querySelector<HTMLButtonElement>('[data-stack-pause]');
  const n = cards.length;
  if (!list || n < 2) return;

  root.classList.add('is-stack');

  const afters = cards.map((card) => card.querySelector<HTMLElement>('[data-after]'));
  const finals = afters.map((el) => el?.textContent ?? '');

  let current = 0;
  let pausedByUser = false;
  let hovering = false;
  let inView = false;

  // Posiciona cada cartão conforme a distância até o da frente (k = 0 é a frente).
  const place = (animate: boolean, skip?: HTMLElement) => {
    cards.forEach((card, i) => {
      const k = (i - current + n) % n;
      card.classList.toggle('is-front', k === 0);
      card.setAttribute('aria-hidden', String(k !== 0));
      gsap.set(card, { zIndex: n - k });
      if (card === skip) return;
      const vars = {
        x: 0,
        rotation: 0,
        y: -k * OFFSET,
        scale: 1 - k * SCALE_STEP,
        autoAlpha: k <= VISIBLE_BEHIND ? 1 : 0,
      };
      if (animate) gsap.to(card, { ...vars, duration: DURATION * 0.75, ease: EASE, overwrite: 'auto' });
      else gsap.set(card, vars);
    });
  };

  // O texto do cartão que chega na frente se embaralha do "antes" para o "depois".
  const transformFront = () => {
    const el = afters[current];
    if (!el) return;
    el.textContent = el.dataset.from ?? '';
    gsap.to(el, {
      duration: 1.2,
      delay: 0.15,
      ease: 'none',
      overwrite: true,
      scrambleText: { text: finals[current], chars: SCRAMBLE_CHARS, revealDelay: 0.25, speed: 0.6 },
    });
  };

  // Barra de progresso da bolinha ativa = relógio da troca automática.
  let timer: gsap.core.Tween | null = null;
  const startTimer = () => {
    timer?.kill();
    dots.forEach((dot, i) => {
      dot.parentElement?.classList.toggle('is-active', i === current);
      gsap.set(dot, { scaleX: 0 });
    });
    timer = gsap.to(dots[current], {
      scaleX: 1,
      duration: STACK_INTERVAL,
      ease: 'none',
      onComplete: () => go(1),
    });
    sync();
  };

  const sync = () => {
    const run = !pausedByUser && !hovering && inView && !document.hidden;
    if (run) timer?.resume();
    else timer?.pause();
  };

  const go = (dir: 1 | -1, manual = false) => {
    list.setAttribute('aria-live', manual ? 'polite' : 'off');

    if (dir === 1) {
      // O da frente sai pro lado e vai pro fim da fila.
      const outgoing = cards[current];
      current = (current + 1) % n;
      place(true, outgoing);
      gsap.to(outgoing, {
        x: -90,
        rotation: -6,
        autoAlpha: 0,
        duration: DURATION * 0.5,
        ease: 'power2.in',
        overwrite: 'auto',
        onComplete: () => {
          // Reaparece no fundo da cascata (se couber nas camadas visíveis).
          gsap.set(outgoing, { x: 0, rotation: 0, y: -(n - 1) * OFFSET, scale: 1 - (n - 1) * SCALE_STEP });
          if (n - 1 <= VISIBLE_BEHIND) gsap.to(outgoing, { autoAlpha: 1, duration: 0.3 });
        },
      });
    } else {
      // O último da fila entra pelo lado e assume a frente.
      current = (current - 1 + n) % n;
      gsap.set(cards[current], { x: 90, rotation: 6, y: 0, scale: 1, autoAlpha: 0 });
      place(true);
    }

    transformFront();
    startTimer();
  };

  // Controles
  root.querySelector('[data-stack-next]')?.addEventListener('click', () => go(1, true));
  root.querySelector('[data-stack-prev]')?.addEventListener('click', () => go(-1, true));

  root.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') go(1, true);
    if (event.key === 'ArrowLeft') go(-1, true);
  });

  pauseButton?.addEventListener('click', () => {
    pausedByUser = !pausedByUser;
    pauseButton.setAttribute('aria-pressed', String(pausedByUser));
    pauseButton.setAttribute('aria-label', pausedByUser ? 'Retomar troca automática' : 'Pausar troca automática');
    sync();
  });

  // Arrastar para o lado (celular e mouse).
  let startX: number | null = null;
  list.addEventListener('pointerdown', (event) => {
    startX = event.clientX;
  });
  list.addEventListener('pointerup', (event) => {
    if (startX === null) return;
    const dx = event.clientX - startX;
    startX = null;
    if (Math.abs(dx) > SWIPE) go(dx < 0 ? 1 : -1, true);
  });

  // Pausas automáticas
  root.addEventListener('pointerenter', (event) => {
    if (event.pointerType === 'mouse') {
      hovering = true;
      sync();
    }
  });
  root.addEventListener('pointerleave', () => {
    hovering = false;
    sync();
  });
  root.addEventListener('focusin', () => {
    hovering = true;
    sync();
  });
  root.addEventListener('focusout', (event) => {
    if (!root.contains(event.relatedTarget as Node)) {
      hovering = false;
      sync();
    }
  });
  document.addEventListener('visibilitychange', sync);

  let transformed = false;
  ScrollTrigger.create({
    trigger: root,
    start: 'top 80%',
    end: 'bottom top',
    onToggle: (self) => {
      inView = self.isActive;
      // A primeira transformação acontece quando a pilha aparece na tela.
      if (inView && !transformed) {
        transformed = true;
        transformFront();
      }
      sync();
    },
  });

  place(false);
  startTimer();
}
