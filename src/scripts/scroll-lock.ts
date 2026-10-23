// Trava/destrava a rolagem da página (ex.: painel de detalhes aberto).
// Funciona com ou sem o Lenis (sem ele = movimento reduzido).
import type Lenis from 'lenis';

let lenis: Lenis | null = null;

export function registerLenis(instance: Lenis) {
  lenis = instance;
}

export function lockScroll(lock: boolean) {
  if (lock) lenis?.stop();
  else lenis?.start();
  document.documentElement.style.overflow = lock ? 'hidden' : '';
}
