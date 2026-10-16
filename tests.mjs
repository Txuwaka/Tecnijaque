import assert from 'node:assert/strict';
import {Chess} from './vendor/chess.js';
import {bestMove} from './ai.js';
const g=new Chess();
function perft(game,depth){if(!depth)return 1;let n=0;for(const m of game.moves()){game.move(m);n+=perft(game,depth-1);game.undo()}return n}
assert.equal(perft(g,3),8902,'Legal move tree');
for(const move of ['f3','e5','g4','Qh4#'])g.move(move);assert(g.isCheckmate());
g.load('r3k2r/8/8/8/8/8/8/R3K2R w KQkq - 0 1');assert(g.moves().includes('O-O'));assert(g.moves().includes('O-O-O'));g.move('O-O');assert.equal(g.get('f1').type,'r');
g.reset();for(const move of ['e4','a6','e5','d5','exd6'])g.move(move);assert.equal(g.get('d5'),undefined);assert.equal(g.get('d6').type,'p');
g.load('7k/P7/8/8/8/8/8/7K w - - 0 1');assert.equal(g.moves({square:'a7',verbose:true}).filter(m=>m.promotion).length,4);g.move({from:'a7',to:'a8',promotion:'n'});assert.equal(g.get('a8').type,'n');
g.load('7k/5K2/6Q1/8/8/8/8/8 b - - 0 1');assert(g.isStalemate());
g.reset();for(let i=0;i<2;i++)for(const move of ['Nf3','Nf6','Ng1','Ng8'])g.move(move);assert(g.isThreefoldRepetition());
g.load('7k/8/8/8/8/8/8/7K w - - 0 1');assert(g.isInsufficientMaterial());
g.reset();for(let i=0;i<20&&!g.isGameOver();i++){const fen=g.fen(),m=bestMove(fen,2);assert(m);g.move(m)}const pgn=g.pgn();const copy=new Chess();copy.loadPgn(pgn);assert.equal(copy.fen(),g.fen());
g.reset();for(const m of ['f3','e5','g4'])g.move(m);g.move(bestMove(g.fen(),2));assert(g.isCheckmate(),'AI takes mate in one');
console.log('OK: perft 8902, mate, castling, en passant, 4 promotions, stalemate, repetition, material, AI 20 plies, PGN persistence, AI mate.');
