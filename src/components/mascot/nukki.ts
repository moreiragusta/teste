// Animação de entrada do Nukki (momento especial 1 do hero).
// O círculo cresce, o Nukki sobe de dentro dele com um leve pulo e depois
// tudo flutua devagar. Quando chegar o SVG em camadas, os data-part opcionais
// (folha, braco, olho-dir) ganham o balanço da folha, o joinha e a piscadela.
import { gsap } from 'gsap';
import { DURATION, EASE } from '../../scripts/motion/constants';

// Distância (em unidades do viewBox) para o Nukki começar escondido abaixo do círculo.
const RISE_FROM = 520;

// Flutuação contínua depois da entrada.
const FLOAT_Y = 8;
const FLOAT_DURATION = 2.6;

export function playNukkiIntro(root: HTMLElement) {
  const svg = root.querySelector('svg');
  const circle = root.querySelector('[data-nukki-circle]');
  const figure = root.querySelector('[data-nukki-figure]');
  const corpo = root.querySelector('[data-part="corpo"]');
  if (!svg || !circle || !figure || !corpo) return;

  gsap.set(circle, { scale: 0, transformOrigin: '50% 50%', visibility: 'visible' });
  gsap.set(corpo, { y: RISE_FROM });
  gsap.set(figure, { visibility: 'visible' });

  const tl = gsap.timeline({ delay: 0.25 });

  tl.to(circle, { scale: 1, duration: DURATION, ease: 'back.out(1.4)' })
    .to(corpo, { y: 0, duration: DURATION * 1.4, ease: 'back.out(1.3)' }, '-=0.35')
    .to(svg, { y: -FLOAT_Y, duration: FLOAT_DURATION / 2, ease: 'sine.out' })
    .add(() => {
      gsap.fromTo(svg, { y: -FLOAT_Y }, { y: FLOAT_Y, duration: FLOAT_DURATION, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    });

  // --- Peças do SVG final (ainda não existem na imagem provisória) ---
  const folha = root.querySelector('[data-part="folha"]');
  const braco = root.querySelector('[data-part="braco"]');
  const olho = root.querySelector('[data-part="olho-dir"]');
  if (folha) {
    tl.to(folha, { keyframes: { rotation: [0, 16, -12, 7, 0] }, transformOrigin: '50% 100%', duration: 1.2, ease: 'sine.inOut' }, 1);
  }
  if (braco) {
    tl.from(braco, { rotation: 150, transformOrigin: '0% 100%', duration: DURATION * 0.75, ease: EASE }, 1.2);
  }
  if (olho) {
    tl.to(olho, { scaleY: 0.1, transformOrigin: '50% 50%', duration: 0.12, ease: 'power1.in', yoyo: true, repeat: 1, repeatDelay: 0.18 }, 1.6);
  }

  return tl;
}
