import Board from '../Board';

const board = new Board();

test.each([
  [-1],
  [0],
  ['123'],
])('%p', (notNumber) => {
  expect(() => {
    board.getBoard(notNumber);
  }).toThrow();
});

test.each([
  [1],
  [4],
  [100],
])('%p', (number) => {
  const obj = board.getBoard(number);
  const cells = obj.querySelectorAll('.cell');
  expect(cells.length).toBe(number ** 2);
});

test('create board', () => {
  const obj = board.getBoard(4);
  expect(obj.classList.contains('board')).toBeTruthy();
});
