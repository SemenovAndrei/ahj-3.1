/**
 * @class Board
 * Игровое поле
 */
export default class Board {
  constructor() {
    this.board = null;
  }

  /**
   * Создает игровое поле
   *
   * @param {Number} number - размер игрового поля
   *
   * @throws {Error}
   */
  createBoard(number) {
    if (typeof number !== 'number' || number <= 0) {
      throw new Error('значение должно быть положительным числом');
    }

    const board = document.createElement('div');
    board.classList.add('board');

    for (let i = 0; i < Math.trunc(number) ** 2; i += 1) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      board.appendChild(cell);
    }

    this.board = board;
  }

  /**
   * Возвращает игровое поле
   *
   * @param {Number} number - размер игрового поля
   *
   * @returns
   */
  getBoard(number) {
    this.createBoard(number);
    return this.board;
  }
}
