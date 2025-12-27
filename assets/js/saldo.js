const DISTRIBUICAO = {
  enriquecimento: 0.2,
  consumo: 0.3,
  "dia-a-dia": 0.5,
};

let valores = {};





function gerarSaldo() {
  return Math.floor(Math.random() * (120000 - 37000 + 1)) + 37000;
}

function obterSaldoGlobal() {
  const saldoSalvo = localStorage.getItem(SALDO_STORAGE_KEY);

  if (saldoSalvo !== null) {
    return Number(saldoSalvo);
  }

  const novoSaldo = gerarSaldo();
  localStorage.setItem(SALDO_STORAGE_KEY, novoSaldo);
  return novoSaldo;
}

// Estado global
window.saldoTotal = obterSaldoGlobal();

function formatar(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function calcularDistribuicao() {
  Object.keys(DISTRIBUICAO).forEach((key) => {
    valores[key] = saldoTotal * DISTRIBUICAO[key];
  });
}

function atualizarTela() {
  document.getElementById("saldoTotal").innerText = formatar(saldoTotal);

  document.getElementById("val-enriquecimento").innerText = formatar(
    valores.enriquecimento
  );
  document.getElementById("val-consumo").innerText = formatar(valores.consumo);
  document.getElementById("val-dia").innerText = formatar(valores["dia-a-dia"]);

  document.querySelectorAll(".segment").forEach((seg) => {
    const key = seg.dataset.key;
    seg.style.height = DISTRIBUICAO[key] * 100 + "%";
  });
}

function depositar(tipo) {
  const valor = 1000;
  valores[tipo] += valor;
  saldoTotal += valor;
  atualizarTela();

  atualizarSaldo(saldoTotal);
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

function atualizarSaldo(novoValor) {
  window.saldoTotal = novoValor;
  localStorage.setItem(SALDO_STORAGE_KEY, novoValor);
}

function sacar(tipo) {
  const valor = 1000;

  if (valores[tipo] >= valor) {
    valores[tipo] -= valor;
    atualizarSaldo(window.saldoTotal - valor);
    atualizarTela();
  }
}
