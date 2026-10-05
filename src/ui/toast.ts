let el: HTMLDivElement | null = null;
let timer: number | undefined;

export function toast(msg: string, ms = 2200) {
  if (!el) {
    el = document.createElement('div');
    el.className = 'toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add('show');
  window.clearTimeout(timer);
  timer = window.setTimeout(() => el?.classList.remove('show'), ms);
}
