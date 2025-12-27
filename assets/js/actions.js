// Arquivo reservado para ações JS
// Navegação, eventos, consumo de APIs, etc.

console.log("Actions loaded");
const SALDO_STORAGE_KEY = "app_saldo_total";

function navigateTo(page) {
  window.location.href = page;
}

function atualizarTela() {
  document.getElementById("saldoTotal").innerText = formatar(saldoTotal);

  document.getElementById("val-enriquecimento").innerText = formatar(
    valores.enriquecimento
  );
  document.getElementById("val-consumo").innerText = formatar(valores.consumo);
  document.getElementById("val-dia").innerText = formatar(valores["dia-a-dia"]);

  Object.keys(DISTRIBUICAO).forEach((key) => {
    const limite = saldoTotal * DISTRIBUICAO[key];
    const usado = valores[key];

    let percentualUso = usado / limite;
    if (percentualUso > 1) percentualUso = 1;
    if (percentualUso < 0) percentualUso = 0;

    document.getElementById(
      `fill-${key === "dia-a-dia" ? "dia" : key}`
    ).style.height = percentualUso * 100 + "%";
  });
}

function formatar(valor) {
  return Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const saldoSalvo = localStorage.getItem(SALDO_STORAGE_KEY);

  window.saldoTotal = saldoSalvo ? Number(saldoSalvo) : 0;

  const saldoEl = document.getElementById("saldoGlobal");
  if (saldoEl) {
    saldoEl.innerText = formatar(window.saldoTotal);
  }
});