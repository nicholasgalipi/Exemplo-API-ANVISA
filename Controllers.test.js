const data = require('./preco_remedio_consumidor.json');
const Controllers = require('./Controllers');

test('add test', () => {
    expect(Controllers.add(4,2)).toBe(6);
  });




/*import fetch from 'node-fetch'

  describe("test requests", () => {
      test("bad request", async () => {
          const data = await fetch('http://localhost:8080/get_by_produto/!@#!@').then(res => res.json())
          expect(data).toEqual({ error: 'Caracteres inválidos no parâmetro.' });
      });
  })*/