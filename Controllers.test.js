const data = require('./preco_remedio_consumidor.json');
const Controllers = require('./Controllers');

test('add test', () => {
    expect(Controllers.add(4,2)).toBe(6);
  });