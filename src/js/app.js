import Board from './Board';
import Character from './Character';
import GoblinGame from './GoblinGame';

const board = new Board();

const character = new Character();

const goblinGame = new GoblinGame(board, character);
goblinGame.init();
