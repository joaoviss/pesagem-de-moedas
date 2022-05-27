var count = 0, moedas, qtd;

const somaPeso = function(_moedas) {
    return _moedas.reduce((total, moeda) => total + moeda.peso, 0);
}

const begin = function() {
    var total = document.getElementById('total').innerText = `${qtd.value} moedas`;
    var output = document.getElementById('output');
    let _moedas = [];
    for (let i = 0; i < qtd.value; i++) {
        _moedas[i] = new Moeda(`moeda_${i}`, 10);
    }
    let fake = Math.floor(Math.random() * qtd.value);
    _moedas[fake].peso = 5;
    output.innerHTML = '';
    moedas = _moedas;
    moedas.forEach(moeda => output.appendChild(template(moeda)));
}
const template = function(obj) {
    let stringHtml = Object.keys(obj).reduce((tmpl, key) => {
        re = new RegExp(`@${key}`, 'g');
        return tmpl.replace(re, obj[key]);
    }, document.getElementById('template').innerHTML);
    let doc = new DOMParser().parseFromString(stringHtml, "text/html");
    return doc.body.firstChild;
}

const pesagem = function(_moedas) {
    var resto;
    let length = _moedas.length;
    if (length > 1) {
        count++;
        if (length % 2 == 1 ) {
            resto = _moedas.pop();
        }
        let parte1 = _moedas.slice(0, length / 2);
        let parte2 = _moedas.slice(-length / 2);
        if (somaPeso(parte1) == somaPeso(parte2)) {
            return pesagem([resto]);
        } else {
            return (somaPeso(parte1) < somaPeso(parte2)) ? pesagem(parte1) : pesagem(parte2);
        }
    }
    begin();
    return {
        "nome": _moedas[0].nome,
        "peso": _moedas[0].peso,
        "count": count
    };
}

document.addEventListener('DOMContentLoaded', function() {
    qtd = document.getElementById('qtd');
    let datalist = document.getElementById('datalist');
    begin();
    qtd.addEventListener('change', begin);
    for (let i = 2; i < 20; i++) {
        let mark = document.createElement('option');
        mark.value = i;
        datalist.appendChild(mark);
    }
})
