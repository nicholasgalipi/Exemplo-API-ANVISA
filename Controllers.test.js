const data = require('./preco_remedio_consumidor.json');
const Controllers = require('./Controllers');
const fetch = require('node-fetch');

const getByName = "http://localhost:8080/get_by_product_name?name="
const getByActive = "http://localhost:8080/get_by_active_ingredient?name="

//Examples for testing the API
const produto1 = {
    "SUBSTÂNCIA": "ROSUVASTATINA",
    "CNPJ": "60.318.797/0001-00",
    "LABORATÓRIO": "ASTRAZENECA DO BRASIL LTDA",
    "PRODUTO": "VIVACOR"
}

const produto2 = {
    "SUBSTÂNCIA": "FOLINATO DE CÁLCIO",
    "CNPJ": "61.230.314/0001-75",
    "LABORATÓRIO": "LIBBS FARMACÊUTICA LTDA",
    "PRODUTO": "FAULDLEUCO",
}

const produto3 = {
    "SUBSTÂNCIA": "ALBUMINA HUMANA",
    "CNPJ": "62.969.589/0001-98",
    "LABORATÓRIO": "CSL BEHRING COMÉRCIO DE PRODUTOS FARMACÊUTICOS LTDA",
    "PRODUTO": "ALBUREX 20",
}



describe("Testing requests on the get by product name route", () => {
      
    test("Name does not exist in DB", async () => {
          const data = await fetch(`${getByName}nomeinvalido`).then(res => res.json())
          expect(data).toEqual({message: "Bad request"});
    });
    
    test("empty get req", async () => {
        const data = await fetch(`${getByName}`).then(res => res.json())
        expect(data).toEqual({message: "Empty request"});
    });

    test("String with a ?", async () => {
        const data = await fetch(`${getByName}vivacor?`).then(res => res.json())
        expect(data[0]).toMatchObject(produto1);
    });

    test("Space before the parameter", async () => {
        const data = await fetch(`${getByName} vivacor`).then(res => res.json())
        expect(data[0]).toMatchObject(produto1);
    });

    test("Parameter with space", async () => {
        const data = await fetch(`${getByName} viva cor`).then(res => res.json())
        expect(data[0]).toMatchObject(produto1);
    });

    test("Parse numbers on product name", async () => {
        const data = await fetch(`${getByName}alburex20`).then(res => res.json())
        expect(data[0]).toMatchObject(produto3);
    });

    test("Ignore special characters", async () => {
        const data = await fetch(`${getByName}alburex20!@#$`).then(res => res.json())
        expect(data[0]).toMatchObject(produto3);
    });

    test("Ignore upppers/lower case", async () => {
        const data = await fetch(`${getByName}Alburex20`).then(res => res.json())
        expect(data[0]).toMatchObject(produto3);
    });

    test("Handle accentuation", async () => {
        const data = await fetch(`${getByName}Alburéx20`).then(res => res.json())
        expect(data[0]).toMatchObject(produto3);
    });



  })


  describe("Testing requests on the get by active ingredient", () => {
      
    test("Name does not exist in DB", async () => {
          const data = await fetch(`${getByActive}nomeinvalido`).then(res => res.json())
          expect(data).toEqual({message: "Bad request"});
    });

    test("empty get req", async () => {
        const data = await fetch(`${getByActive}`).then(res => res.json())
        expect(data).toEqual({message: "Empty request"});
    });

    test("String with a ?", async () => {
        const data = await fetch(`${getByActive}rosuvastatina?`).then(res => res.json())
        expect(data[0]).toMatchObject(produto1);
    });

    test("Space before the parameter", async () => {
        const data = await fetch(`${getByActive} rosuvastatina`).then(res => res.json())
        expect(data[0]).toMatchObject(produto1);
    });

    test("Parameter with space", async () => {
        const data = await fetch(`${getByActive}rosu vastatina`).then(res => res.json())
        expect(data[0]).toMatchObject(produto1);
    });

    test("Ignore special characters", async () => {
        const data = await fetch(`${getByActive}rosuvastatina!@#$`).then(res => res.json())
        expect(data[0]).toMatchObject(produto1);
    });

    test("Ignore upppers/lower case", async () => {
        const data = await fetch(`${getByActive}Rosuvastatina`).then(res => res.json())
        expect(data[0]).toMatchObject(produto1);
    });

    test("Handle accentuation", async () => {
        const data = await fetch(`${getByActive}folinato de cálcio`).then(res => res.json())
        expect(data[0]).toMatchObject(produto2);
    });





  })