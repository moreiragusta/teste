// Animações do site. Um padrão de entrada para tudo + momentos especiais:
// slogan que se decodifica, palavras que alternam, Nukki no hero, pilha de
// cartões e trilho do "Como funciona". Nada trava o scroll.
// Com prefers-reduced-motion nada aqui roda e o CSS mostra o estado final.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { registerLenis } from '../scroll-lock';
import { DURATION, EASE, DISTANCE, STAGGER, PARALLAX, SCRAMBLE_CHARS } from './constants';
import { playNukkiIntro } from '../../components/mascot/nukki';
import { initStack } from './stack';

const root = document.documentElement;

if (root.classList.contains('motion')) {
  gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);
  initLenis();
  initHero();
  initParallax();
  initStacks();
  initSteps();
  initReveal();
  root.classList.add('motion-ready');
}

function initLenis() {
  // anchors: cliques nos links do topo (#solucoes etc.) também rolam suave.
  const lenis = new Lenis({ anchors: true });
  registerLenis(lenis);
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

// Padrão de entrada único: fade + leve subida.
function initReveal() {
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 88%',
    once: true,
    onEnter: (batch) =>
      gsap.fromTo(
        batch,
        { autoAlpha: 0, y: DISTANCE },
        {
          autoAlpha: 1,
          y: 0,
          duration: DURATION,
          ease: EASE,
          stagger: STAGGER,
          overwrite: true,
          clearProps: 'transform', // devolve o transform ao CSS (hover)
        },
      ),
  });
}

// Hero: slogan se forma a partir de caracteres trocando; depois as palavras do subtítulo alternam.
function initHero() {
  const nukki = document.querySelector<HTMLElement>('[data-nukki]');
  if (nukki) playNukkiIntro(nukki);

  const title = document.querySelector<HTMLElement>('[data-scramble]');
  if (title) {
    const text = title.textContent ?? '';
    // Trava a altura final para a frase não "pular" enquanto embaralha.
    title.style.display = 'block';
    title.style.minHeight = `${title.offsetHeight}px`;
    title.textContent = '';
    gsap.set(title, { visibility: 'visible' });
    gsap.to(title, {
      duration: 1.8,
      delay: 0.15,
      ease: 'none',
      scrambleText: { text, chars: SCRAMBLE_CHARS, revealDelay: 0.5, speed: 0.5 },
    });
  }

  const word = document.querySelector<HTMLElement>('[data-words]');
  if (word) {
    const words: string[] = JSON.parse(word.dataset.words ?? '[]');
    let i = 0;
    const next = () => {
      i = (i + 1) % words.length;
      gsap.to(word, {
        duration: 0.7,
        scrambleText: { text: words[i], chars: 'lowerCase', speed: 0.6 },
        onComplete: () => gsap.delayedCall(2, next),
      });
    };
    gsap.delayedCall(3, next);
  }
}

// Parallax leve: brilho e mascote do hero andam em velocidades diferentes no scroll.
function initParallax() {
  gsap.utils.toArray<HTMLElement>('[data-depth]').forEach((el) => {
    const depth = parseFloat(el.dataset.depth ?? '0');
    gsap.to(el, {
      y: -depth * PARALLAX,
      ease: 'none',
      scrollTrigger: { trigger: el.closest('section') ?? el, start: 'top top', end: 'bottom top', scrub: true },
    });
  });
}

// "O que nós resolvemos": pilha de cartões em cascata (ver stack.ts).
function initStacks() {
  gsap.utils.toArray<HTMLElement>('[data-stack]').forEach(initStack);
}

// "Como funciona": trilho se preenche com o scroll e acende cada passo quando chega nele.
// Horizontal no desktop, vertical no celular (decidido pela posição dos números).
function initSteps() {
  const section = document.querySelector<HTMLElement>('[data-steps]');
  const track = section?.querySelector<HTMLElement>('[data-track]');
  if (!section || !track) return;
  const steps = gsap.utils.toArray<HTMLElement>('[data-step]', section);
  const nums = steps.map((s) => s.querySelector<HTMLElement>('.step__num')!);
  let horizontal = true;
  // Fração do trilho onde fica cada número.
  let stops: number[] = [];

  const measure = () => {
    const box = track.parentElement!.getBoundingClientRect();
    const centers = nums.map((n) => {
      const r = n.getBoundingClientRect();
      return { x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top };
    });
    const first = centers[0];
    const last = centers[centers.length - 1];
    horizontal = Math.abs(last.x - first.x) > Math.abs(last.y - first.y);
    const length = horizontal ? last.x - first.x : last.y - first.y;
    stops = centers.map((c) => (horizontal ? c.x - first.x : c.y - first.y) / length);

    track.style.setProperty('--x', `${first.x - (horizontal ? 0 : 1)}px`);
    track.style.setProperty('--y', `${first.y - (horizontal ? 1 : 0)}px`);
    track.style.setProperty('--w', horizontal ? `${length}px` : '2px');
    track.style.setProperty('--h', horizontal ? '2px' : `${length}px`);
  };

  const update = (progress: number) => {
    track.style.setProperty('--sx', horizontal ? String(progress) : '1');
    track.style.setProperty('--sy', horizontal ? '1' : String(progress));
    steps.forEach((step, i) => step.classList.toggle('is-lit', progress > 0 && progress >= stops[i] - 0.001));
  };

  ScrollTrigger.create({
    trigger: track.parentElement,
    start: 'top 75%',
    end: 'bottom 55%',
    scrub: 0.6,
    onRefresh: (self) => {
      measure();
      update(self.progress);
    },
    onUpdate: (self) => update(self.progress),
  });
}
