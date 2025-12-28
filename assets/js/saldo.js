/* ===============================
   CONFIGURAÇÃO E ESTADO GLOBAL
================================ */


const BLOCOS_STORAGE_KEY = "saldoBlocos";

const DISTRIBUICAO = {
  enriquecimento: 0.2,
  consumo: 0.3,
  "dia-a-dia": 0.5,
};

let valores = {};
window.saldoTotal = 0;

/* ===============================
   UTILITÁRIOS
================================ */

function gerarSaldo() {
  return Math.floor(Math.random() * (120000 - 37000 + 1)) + 37000;
}

function formatar(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

/* ===============================
   SALDO GLOBAL
================================ */

function obterSaldoInicial() {
  const salvo = localStorage.getItem(SALDO_STORAGE_KEY);
  if (salvo !== null) return Number(salvo);

  const novo = gerarSaldo();
  localStorage.setItem(SALDO_STORAGE_KEY, novo);
  return novo;
}

/* ===============================
   BLOCOS DE SALDO
================================ */

function inicializarBlocos(saldoTotal) {
  const salvo = localStorage.getItem(BLOCOS_STORAGE_KEY);

  if (salvo) {
    valores = JSON.parse(salvo);
    return;
  }

  Object.keys(DISTRIBUICAO).forEach((key) => {
    valores[key] = saldoTotal * DISTRIBUICAO[key];
  });

  salvarBlocos();
}

function salvarBlocos() {
  localStorage.setItem(BLOCOS_STORAGE_KEY, JSON.stringify(valores));
}

function atualizarSaldoGlobal() {
  const total =
    valores.enriquecimento +
    valores.consumo +
    valores["dia-a-dia"];

  window.saldoTotal = total;
  localStorage.setItem(SALDO_STORAGE_KEY, total);
}

/* ===============================
   TELA
================================ */

function atualizarTela() {
  document.getElementById("saldoTotal").innerText =
    formatar(window.saldoTotal);

  document.getElementById("val-enriquecimento").innerText =
    formatar(valores.enriquecimento);

  document.getElementById("val-consumo").innerText =
    formatar(valores.consumo);

  document.getElementById("val-dia").innerText =
    formatar(valores["dia-a-dia"]);

  document.querySelectorAll(".segment").forEach((seg) => {
    const key = seg.dataset.key;
    const percentual = (valores[key] / window.saldoTotal) * 100;
    seg.style.height = percentual + "%";
  });
}

/* ===============================
   AÇÕES FINANCEIRAS
================================ */

/* SAQUE → NÃO REDISTRIBUI */
function sacar(tipo, valor = 1000) {
  if (valores[tipo] >= valor) {
    valores[tipo] -= valor;
    salvarBlocos();
    atualizarSaldoGlobal();
    atualizarTela();
  } else {
    alert("Saldo insuficiente neste bloco");
  }
}

/* DEPÓSITO → REDISTRIBUI */
function depositar(tipo, valor = 1000) {
  const novoTotal = window.saldoTotal + valor;

  Object.keys(DISTRIBUICAO).forEach((key) => {
    valores[key] = novoTotal * DISTRIBUICAO[key];
  });

  salvarBlocos();
  atualizarSaldoGlobal();
  atualizarTela();
}

/* ===============================
   MODAL DE VALOR
================================ */

let acaoAtual = null;
let tipoAtual = null;

function abrirModal(acao, tipo) {
  acaoAtual = acao;
  tipoAtual = tipo;

  document.getElementById("modalTitulo").innerText =
    acao === "depositar"
      ? "Valor para depósito"
      : "Valor para saque";

  document.getElementById("valorInput").value = "";
  document.getElementById("modalValor").classList.remove("hidden");
}

function fecharModalValor() {
  document.getElementById("modalValor").classList.add("hidden");
}

function confirmarAcao() {
  const valor = parseFloat(
    document.getElementById("valorInput").value
  );

  if (!valor || valor <= 0) {
    alert("Informe um valor válido");
    return;
  }

  if (acaoAtual === "depositar") {
    depositar(tipoAtual, valor);
  } else if (acaoAtual === "sacar") {
    sacar(tipoAtual, valor);
  }

  fecharModalValor();
}

/* ===============================
   INICIALIZAÇÃO
================================ */

window.saldoTotal = obterSaldoInicial();
inicializarBlocos(window.saldoTotal);
atualizarSaldoGlobal();
atualizarTela();
