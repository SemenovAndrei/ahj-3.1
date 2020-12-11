/**
 * @class GoblinGame
 */
export default class GoblinGame {
  /**
   *
   * @param {Class} board - игровое поле
   * @param {Class} character - игровой персонаж
   */
  constructor(board, character) {
    this.size = 4;
    this.board = board;
    this.character = character;
    this.score = 0;
    this.scoreLife = 5;
    this.heart = null;
    this.bestScore = localStorage.getItem('goblinGameScore', this.bestScore) || 0;
    this.characterMove = null;
    this.container = null;
  }

  /**
   * Инициация игры
   */
  init() {
    this.character.characterStop();
    this.reset();
    this.setHearts();
    this.createUI();
    this.character.characterLogic();
  }

  /**
   * Создает игровое поле
   */
  createUI() {
    const board = this.board.getBoard(this.size);
    board.addEventListener('click', (e) => this.addScore(e));

    const body = document.querySelector('body');

    const container = this.container || document.createElement('div');
    container.classList.add('container');
    container.innerHTML = this.getContainerMarkUp();
    container.appendChild(board);

    this.container = container;

    body.insertBefore(this.container, body.firstChild);

    this.setHearts();
  }

  /**
   * Добавляет разметку
   */
  getContainerMarkUp() {
    return `
    <h1 class="title">Goblin Game</h1>
    <div class="statistics">
      <div class="statistic">Best Score
        <div class="score-best">${this.bestScore}
        </div>
      </div>
      <div class="statistic">Score
        <div class="score">${this.score}
        </div>
      </div>
      <div class="statistic">Life
        <div class="score-life">${this.heart}
        </div>
      </div>
    </div>
    `;
  }

  reset() {
    this.score = 0;
    this.scoreLife = 5;
  }

  setHearts() {
    let heart = '';
    for (let i = 0; i < this.scoreLife; i += 1) {
      heart += '❤';
    }
    this.heart = heart;
  }

  addScore(e) {
    e.preventDefault();

    if (e.target.classList.contains('character-evil')) {
      this.character.setMark();
      this.score += 1;
    } else {
      this.character.clearMark();
      this.scoreLife -= 1;
      this.setHearts();
    }

    if (this.bestScore < this.score) {
      this.bestScore = this.score;
      localStorage.setItem('goblinGameScore', this.bestScore);
    }

    if (this.scoreLife < 1) {
      this.init();
      alert('lose');
    }

    this.character.characterStop();
    this.createUI();
    this.character.characterLogic();
  }
}
