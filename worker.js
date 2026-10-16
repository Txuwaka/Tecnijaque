import {bestMove} from './ai.js';
self.onmessage=({data})=>{try{self.postMessage({id:data.id,move:bestMove(data.fen,data.level),kind:data.kind})}catch{self.postMessage({id:data.id,move:null,kind:data.kind})}};
