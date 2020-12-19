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
    this.bestScore = localStorage.getItem('goblinGameScore') || 0;
    this.characterMove = null;
    this.container = null;

    this.func = (e) => { this.addScore(e); };
  }

  /**
   * Сбрасывает очки на значение по умолчанию
   */
  reset() {
    this.score = 0;
    this.scoreLife = 5;
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

    GoblinGame.showHint();
  }

  /**
   * Создает игровое поле
   */
  createUI() {
    const board = this.board.getBoard(this.size);
    board.addEventListener('click', this.func);

    const body = document.querySelector('body');

    const container = this.container || document.createElement('div');
    container.classList.add('container');
    container.innerHTML = this.getContainerMarkUp();
    container.appendChild(board);

    this.container = container;

    body.insertBefore(this.container, body.firstChild);
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

  /**
   * Показывает подсказку при наведении мыши
   * или касании пальца
   */
  static showHint() {
    const title = document.querySelector('.title');
    const hint = document.querySelector('.board');

    title.addEventListener('mouseenter', () => {
      hint.classList.add('hint-active');
    });
    title.addEventListener('mouseleave', () => {
      hint.classList.remove('hint-active');
    });
    title.addEventListener('touchstart', () => {
      hint.classList.add('hint-active');
    });
    title.addEventListener('touchend', () => {
      hint.classList.remove('hint-active');
    });
  }

  /**
   * Устанавливает значение this.heart
   */
  setHearts() {
    let heart = '';

    if (this.scoreLife) {
      for (let i = 0; i < this.scoreLife; i += 1) {
        heart += '❤';
      }
    } else {
      heart = '💔';
    }
    this.heart = heart;
  }

  /**
   * Логика
   * * добавление очков
   * * проверка проигрыша
   *
   * @param {event} e - событие
   */
  addScore(e) {
    e.preventDefault();

    if (document.querySelector('.board').classList.contains('lock')) { console.log(1); }

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

    this.character.characterStop();
    this.createUI();

    if (this.scoreLife < 1) {
      this.character.characterStop();

      const board = document.querySelector('.board');
      board.removeEventListener('click', this.func);
      board.classList.add('lock');

      setTimeout(() => {
        this.init();
      }, 1000);
    } else {
      this.character.characterLogic();
    }
  }
}
