const fetch = require('node-fetch');

fetch(`http://localhost:8080/get_by_product_name?name=dorflex`)
    .then(res => res.json())
    .then((res) => (console.log(res)));