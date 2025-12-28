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







const btnAbrirConviteColab = document.getElementById("btnAbrirConvite");
  const modalConviteColab = document.getElementById("modalConvite");




  const btnFecharConviteColab =
  document.getElementById("fecharModalConvite");

const btnCancelarConviteColab =
  document.getElementById("cancelarConviteColab");

const btnConfirmarConviteColab =
  document.getElementById("confirmarConviteColab");




  function fecharModalConviteColab() {
    modalConviteColab.classList.remove("active");
  }

  btnAbrirConviteColab.addEventListener("click", () => {
    modalConviteColab.classList.add("active");
  });

  btnFecharConviteColab.addEventListener("click", fecharModalConviteColab);
  btnCancelarConviteColab.addEventListener("click", fecharModalConviteColab);

  btnConfirmarConviteColab.addEventListener("click", () => {
    const nome = document.getElementById("nomeColaborador").value.trim();
    const telefone = document.getElementById("telefoneColaborador").value.trim();
    const salario = document.getElementById("salarioColaborador").value;
    const cargo = document.getElementById("cargoColaborador").value;

    if (!nome || !telefone || !salario || !cargo) {
      alert("Preencha todos os campos");
      return;
    }

    const conviteColaborador = {
      id: Date.now(),
      nome,
      telefone,
      salario,
      cargo,
      criadoEm: new Date().toISOString()
    };

    const convitesExistentes =
      JSON.parse(localStorage.getItem("convitesColaboradores")) || [];

    convitesExistentes.push(conviteColaborador);

    localStorage.setItem(
      "convitesColaboradores",
      JSON.stringify(convitesExistentes)
    );

    fecharModalConviteColab();
    atualizarQuantidadeColaboradores();


    alert(
      "Mensagem enviada via WhatsApp com sucesso 📲"
    );

    // Limpa os campos
    document.getElementById("nomeColaborador").value = "";
    document.getElementById("telefoneColaborador").value = "";
    document.getElementById("salarioColaborador").value = "";
    document.getElementById("cargoColaborador").value = "";
  });


  function atualizarQuantidadeColaboradores() {
  const lista =
    JSON.parse(localStorage.getItem("convitesColaboradores")) || [];

  const total = lista.length;


  const spanTotal = document.getElementById("totalColaboradores");
  if (spanTotal) {
    spanTotal.textContent = total;
  }
}

// Atualiza ao carregar a página
document.addEventListener("DOMContentLoaded", atualizarQuantidadeColaboradores);





function formatar(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function carregarSaldoTotal() {
  const saldoSalvo = localStorage.getItem(SALDO_STORAGE_KEY);

  const saldo = saldoSalvo ? Number(saldoSalvo) : 0;

  const el = document.getElementById("saldoTotal");
  if (el) {
    el.innerText = formatar(saldo);
  }
}

/* Executa ao carregar a página */
document.addEventListener("DOMContentLoaded", carregarSaldoTotal);

