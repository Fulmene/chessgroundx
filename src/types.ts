export type Variant = 'chess' | 'makruk' | 'cambodian' | 'sittuyin' | 'shogi' | 'minishogi' | 'kyotoshogi' | 'xiangqi' | 'minixiangqi' | 'capablanca' | 'seirawan' | 'capahouse' | 'shouse' | 'grand' | 'grandhouse' | 'gothic' | 'gothhouse' | 'shako' | 'shogun' | 'janggi' | 'makpong' | 'orda' | 'synochess' | 'manchu' | 'musketeer' | undefined;
export type Color = typeof colors[number];
export type Role = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn' | 'chancellor' | 'pchancellor' | 'archbishop' | 'ferz' | 'met' | 'gold' | 'silver' | 'lance'| 'ppawn' | 'pknight' | 'pbishop' | 'prook' | 'psilver' | 'plance' | 'advisor' | 'cannon' | 'hawk' | 'elephant' | 'pferz' | 'yurt' | 'lancer' | 'banner' | 'unicorn' | 'dragon';
export type File = typeof files[number];
export type Rank = typeof ranks[number];
export type Key = 'z0' | `${File}${Rank}`;
export type FEN = string;
export type Pos = [number, number];
export interface Piece {
  role: Role;
  color: Color;
  promoted?: boolean;
}
export interface Drop {
  role: Role;
  key: Key;
}
export type Pieces = Map<Key, Piece>;
export type PiecesDiff = Map<Key, Piece | undefined>;

export type KeyPair = [Key, Key];

export type NumberPair = [number, number];

export type NumberQuad = [number, number, number, number];

export interface Rect {
  left: number;
  top: number;
  width: number;
  height: number;
}

export type Dests = Map<Key, Key[]>;

export interface Elements {
  board: HTMLElement;
  container: HTMLElement;
  ghost?: HTMLElement;
  svg?: SVGElement;
  customSvg?: SVGElement;
}
export interface Dom {
  elements: Elements;
  bounds: Memo<ClientRect>;
  redraw: () => void;
  redrawNow: (skipSvg?: boolean) => void;
  unbind?: Unbind;
  destroyed?: boolean;
  relative?: boolean; // don't compute bounds, use relative % to place pieces
}
export interface Exploding {
  stage: number;
  keys: readonly Key[];
}

export interface MoveMetadata {
  premove: boolean;
  ctrlKey?: boolean;
  holdTime?: number;
  captured?: Piece;
  predrop?: boolean;
}
export interface SetPremoveMetadata {
  ctrlKey?: boolean;
}

export type MouchEvent = Event & Partial<MouseEvent & TouchEvent>;

export interface KeyedNode extends HTMLElement {
  cgKey: Key;
}
export interface PieceNode extends KeyedNode {
  tagName: 'PIECE';
  cgPiece: string;
  cgAnimating?: boolean;
  cgFading?: boolean;
  cgDragging?: boolean;
}
export interface SquareNode extends KeyedNode {
  tagName: 'SQUARE';
}

export interface Memo<A> {
  (): A;
  clear: () => void;
}

export interface Timer {
  start: () => void;
  cancel: () => void;
  stop: () => number;
}

export type Redraw = () => void;
export type Unbind = () => void;
export type Milliseconds = number;
export type KHz = number;

export const colors = ['white', 'black'] as const;
export const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'] as const;
export const ranks = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'] as const;

export interface BoardDimensions {
  width: number;
  height: number;
}

export const enum Geometry {dim8x8, dim9x9, dim10x8, dim9x10, dim10x10, dim5x5, dim7x7, dim3x4, dim5x6};
export const dimensions: BoardDimensions[] = [{width: 8, height: 8}, {width: 9, height: 9}, {width: 10, height: 8}, {width: 9, height: 10}, {width: 10, height: 10}, {width: 5, height: 5}, {width: 7, height: 7}, {width: 3, height: 4}, {width: 5, height: 6}];

export const enum Notation {DEFAULT, SAN, LAN, SHOGI_HOSKING, SHOGI_HODGES, SHOGI_HODGES_NUMBER, JANGGI, XIANGQI_WXF};
