// Animação de entrada do Nukki (momento especial 1 do hero).
// Depende só dos data-part do SVG, então a troca placeholder → SVG final
// não exige mexer aqui. Quando houver sprite do joinha + piscadela, troque
// o trecho marcado por um player de sprite em [data-nukki-sprite].
import { gsap } from 'gsap';
import { DURATION, EASE } from '../../scripts/motion/constants';

// Distância (em unidades do viewBox) para o Nukki começar escondido abaixo do círculo.
const RISE_FROM = 360;

// Ponto do ombro, em unidades do viewBox: eixo da rotação do braço.
const SHOULDER = '258 300';

export function playNukkiIntro(root: HTMLElement) {
  const part = (name: string) => root.querySelector(`[data-part="${name}"]`);
  const figure = root.querySelector('[data-nukki-figure]');
  const corpo = part('corpo');
  const folha = part('folha');
  const braco = part('braco');
  const olho = part('olho-dir');
  if (!figure || !corpo || !folha || !braco || !olho) return;

  // Estado inicial: escondido abaixo do círculo, braço abaixado.
  gsap.set(corpo, { y: RISE_FROM });
  gsap.set(braco, { rotation: 150, svgOrigin: SHOULDER });
  gsap.set(figure, { visibility: 'visible' });

  const tl = gsap.timeline({ delay: 0.25 });

  tl.to(corpo, { y: 0, duration: DURATION * 1.6, ease: EASE })
    .to(folha, {
      keyframes: { rotation: [0, 16, -12, 7, 0] },
      transformOrigin: '50% 100%',
      duration: 1.2,
      ease: 'sine.inOut',
    }, '-=0.5')
    // --- Joinha + piscadela (trocar por sprite sheet quando existir) ---
    .to(braco, { rotation: 0, svgOrigin: SHOULDER, duration: DURATION * 0.75, ease: 'back.out(1.6)' }, '-=0.3')
    .to(olho, {
      scaleY: 0.1,
      transformOrigin: '50% 50%',
      duration: 0.12,
      ease: 'power1.in',
      yoyo: true,
      repeat: 1,
      repeatDelay: 0.18,
    }, '-=0.1');

  return tl;
}
