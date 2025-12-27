const DISTRIBUICAO = {
  enriquecimento: 0.20,
  consumo: 0.30,
  "dia-a-dia": 0.50
};

let saldoTotal = gerarSaldo();
let valores = {};

function gerarSaldo() {
  return Math.floor(Math.random() * (120000 - 37000 + 1)) + 37000;
}

function formatar(valor) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

function calcularDistribuicao() {
  Object.keys(DISTRIBUICAO).forEach(key => {
    valores[key] = saldoTotal * DISTRIBUICAO[key];
  });
}

function atualizarTela() {
  document.getElementById('saldoTotal').innerText = formatar(saldoTotal);

  document.getElementById('val-enriquecimento').innerText = formatar(valores.enriquecimento);
  document.getElementById('val-consumo').innerText = formatar(valores.consumo);
  document.getElementById('val-dia').innerText = formatar(valores["dia-a-dia"]);

  document.querySelectorAll('.segment').forEach(seg => {
    const key = seg.dataset.key;
    seg.style.height = (DISTRIBUICAO[key] * 100) + '%';
  });
}

function depositar(tipo) {
  const valor = 1000;
  valores[tipo] += valor;
  saldoTotal += valor;
  atualizarTela();
}

function sacar(tipo) {
  const valor = 1000;
  if (valores[tipo] >= valor) {
    valores[tipo] -= valor;
    saldoTotal -= valor;
    atualizarTela();
  }
}

calcularDistribuicao();
atualizarTela();


