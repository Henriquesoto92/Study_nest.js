import { somar } from '../utils/somar';

test('Este é o meu primeiro teste', () => {
  const result = somar(2, 2);
  expect(result).toEqual(4);
});
