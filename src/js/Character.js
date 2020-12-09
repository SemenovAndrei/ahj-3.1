/**
 * @class Character
 */
export default class Character {
  constructor() {
    this.character = null;
    this.move = null;
    this.cells = null;
  }

  /**
   * Создает игрового персонажа
   */
  createCharacter() {
    const character = document.createElement('div');
    character.classList.add('character');

    this.character = character;
  }

  /**
   * @returns character
   */
  getCharacter() {
    this.createCharacter();
    return this.character;
  }

  /**
   * Логика действий игрового персонажа
   */
  characterLogic() {
    const character = this.getCharacter();
    const cells = document.getElementsByClassName('cell');

    const func = () => {
      const freeCells = [...cells].filter((e) => !e.hasChildNodes());
      const index = Math.floor(Math.random() * freeCells.length);

      freeCells[index].appendChild(character);
    };

    func();
    this.move = setInterval(func, 1000);
  }

  /**
   * Останавливает перемещение игрового персонажа
   */
  characterStop() {
    clearInterval(this.move);
  }
}
