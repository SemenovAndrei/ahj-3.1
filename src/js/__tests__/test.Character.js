import Character from '../Character';

test('create character', () => {
  const character = new Character();
  const obj = character.getCharacter();
  expect(obj.node.classList.contains('character')).toBeTruthy();
});
