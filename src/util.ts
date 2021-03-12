import * as cg from './types';

export const invRanks: readonly cg.Rank[] = [...cg.ranks].reverse();

export const NRanks: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export const invNRanks: number[] = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

const files3 = cg.files.slice(0, 3);
const files5 = cg.files.slice(0, 5);
const files7 = cg.files.slice(0, 7);
const files8 = cg.files.slice(0, 8);
const files9 = cg.files.slice(0, 9);
const files10 = cg.files.slice(0, 10);

const ranks4 = cg.ranks.slice(0, 4);
const ranks5 = cg.ranks.slice(0, 5);
const ranks6 = cg.ranks.slice(0, 6);
const ranks7 = cg.ranks.slice(0, 7);
const ranks8 = cg.ranks.slice(0, 8);
const ranks9 = cg.ranks.slice(0, 9);
const ranks10 = cg.ranks.slice(0, 10);

const allKeys3x4: readonly cg.Key[] = Array.prototype.concat(...files3.map(c => ranks4.map(r => c+r)));
const allKeys5x5: readonly cg.Key[] = Array.prototype.concat(...files5.map(c => ranks5.map(r => c+r)));
const allKeys5x6: readonly cg.Key[] = Array.prototype.concat(...files5.map(c => ranks6.map(r => c+r)));
const allKeys7x7: readonly cg.Key[] = Array.prototype.concat(...files7.map(c => ranks7.map(r => c+r)));
const allKeys8x8: readonly cg.Key[] = Array.prototype.concat(...files8.map(c => ranks8.map(r => c+r)));
const allKeys9x9: readonly cg.Key[] = Array.prototype.concat(...files9.map(c => ranks9.map(r => c+r)));
const allKeys10x8: readonly cg.Key[] = Array.prototype.concat(...files10.map(c => ranks8.map(r => c+r)));
const allKeys9x10: readonly cg.Key[] = Array.prototype.concat(...files9.map(c => ranks10.map(r => c+r)));
const allKeys10x10: readonly cg.Key[] = Array.prototype.concat(...files10.map(c => ranks10.map(r => c+r)));

export const allKeys = [allKeys8x8, allKeys9x9, allKeys10x8, allKeys9x10, allKeys10x10, allKeys5x5, allKeys7x7, allKeys3x4, allKeys5x6];

export function pos2key(pos: cg.Pos): cg.Key {
    return (cg.files[pos[0]] + cg.ranks[pos[1]]) as cg.Key;
}

export function key2pos(k: cg.Key): cg.Pos {
  const file = k.charCodeAt(0) - 97;
  const rank = k.charCodeAt(1) === 48 ? 9 : k.charCodeAt(1) - 49;
  return [file, rank] as cg.Pos;
}

export const allPos = allKeys.map(ak => ak.map(key2pos));

export function memo<A>(f: () => A): cg.Memo<A> {
  let v: A | undefined;
  const ret = (): A => {
    if (v === undefined) v = f();
    return v;
  };
  ret.clear = () => {
    v = undefined;
  };
  return ret;
}

export const timer = (): cg.Timer => {
  let startAt: number | undefined;
  return {
    start() {
      startAt = performance.now();
    },
    cancel() {
      startAt = undefined;
    },
    stop() {
      if (!startAt) return 0;
      const time = performance.now() - startAt;
      startAt = undefined;
      return time;
    },
  };
};

export const opposite = (c: cg.Color): cg.Color => (c === 'white' ? 'black' : 'white');

export const distanceSq = (pos1: cg.Pos, pos2: cg.Pos): number => {
  const dx = pos1[0] - pos2[0],
    dy = pos1[1] - pos2[1];
  return dx * dx + dy * dy;
};

export const samePiece = (p1: cg.Piece, p2: cg.Piece): boolean => p1.role === p2.role && p1.color === p2.color;

const posToTranslateBase: (pos: cg.Pos, asWhite: boolean, xFactor: number, yFactor: number, bt: cg.BoardDimensions) => cg.NumberPair =
(pos, asWhite, xFactor, yFactor, bt) => [
  (asWhite ? pos[0] : bt.width - 1 - pos[0]) * xFactor,
  (asWhite ? bt.height - 1 - pos[1] : pos[1]) * yFactor
];

export const posToTranslateAbs = (bounds: ClientRect, bt: cg.BoardDimensions): ((pos: cg.Pos, asWhite: boolean) => cg.NumberPair) => {
  const xFactor = bounds.width / bt.width,
    yFactor = bounds.height / bt.height;
  return (pos: cg.Pos, asWhite: boolean) => posToTranslateBase(pos, asWhite, xFactor, yFactor, bt);
};

export const posToTranslateRel = (pos: cg.Pos, asWhite: boolean, bt: cg.BoardDimensions): cg.NumberPair =>
  posToTranslateBase(pos, asWhite, 100 / bt.width, 100 / bt.height, bt);

export const translateAbs = (el: HTMLElement, pos: cg.NumberPair): void => {
  el.style.transform = `translate(${pos[0]}px,${pos[1]}px)`;
};

export const translateRel = (el: HTMLElement, percents: cg.NumberPair): void => {
  el.style.transform = `translate(${percents[0]}%,${percents[1]}%)`;
};

export const setVisible = (el: HTMLElement, v: boolean): void => {
  el.style.visibility = v ? 'visible' : 'hidden';
};

export const eventPosition = (e: cg.MouchEvent): cg.NumberPair | undefined => {
  if (e.clientX || e.clientX === 0) return [e.clientX, e.clientY!];
  if (e.targetTouches?.[0]) return [e.targetTouches[0].clientX, e.targetTouches[0].clientY];
  return; // touchend has no position!
};

export const isRightButton = (e: cg.MouchEvent): boolean => e.buttons === 2 || e.button === 2;

export const createEl = (tagName: string, className?: string): HTMLElement => {
  const el = document.createElement(tagName);
  if (className) el.className = className;
  return el;
};

export function computeSquareCenter(key: cg.Key, asWhite: boolean, bounds: ClientRect, bd: cg.BoardDimensions): cg.NumberPair {
  const pos = key2pos(key);
  if (!asWhite) {
    pos[0] = bd.width - 1 - pos[0];
    pos[1] = bd.height - 1 - pos[1];
  }
  return [
    bounds.left + ((bounds.width * pos[0]) / bd.width) + (bounds.width / (2 * bd.width)),
    bounds.top + ((bounds.height * (bd.height - 1 - pos[1])) / bd.height) + (bounds.height / (2 * bd.height)),
  ];
}
