const colaboradores = {
  1: {
    nome: 'Colaborador 1',
    conta: 'Conta xxxxxxxxxx-x',
    salario: 10000,
    ferias: 1666.67,
    vt: 250.90,
    fgts: 800
  },
  2: {
    nome: 'Colaborador 2',
    conta: 'Conta xxxxxxxxxx-x',
    salario: 8500,
    ferias: 1416.67,
    vt: 230.50,
    fgts: 680
  }
};

function formatar(valor) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

function abrirModal(id) {
  const c = colaboradores[id];

  document.getElementById('modal-nome').innerText = c.nome;
  document.getElementById('modal-conta').innerText = c.conta;
  document.getElementById('salario').innerText = formatar(c.salario);
  document.getElementById('ferias').innerText = formatar(c.ferias);
  document.getElementById('vt').innerText = formatar(c.vt);
  document.getElementById('fgts').innerText =
    `${formatar(c.fgts)} (${formatar(c.salario)} × 8%)`;

  const total = c.salario + c.ferias + c.vt + c.fgts;
  document.getElementById('total').innerText = formatar(total);

  document.getElementById('modal').classList.add('active');
}

function fecharModal() {
  document.getElementById('modal').classList.remove('active');
}
