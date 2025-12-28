
// Mostrar saldo salvo
function formatar(valor) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

const saldoSalvo = Number(localStorage.getItem(SALDO_STORAGE_KEY)) || 0;
document.getElementById('saldoConvite').innerText = formatar(saldoSalvo);

// Modal
const modal = document.getElementById('modalCnpj');

document.getElementById('abrirModalConvite').onclick = () => {
  modal.classList.remove('hidden');
};

document.getElementById('continuarSemCnpj').onclick = () => {
  window.location.href = 'index.html';
};

document.getElementById('continuarComCnpj').onclick = () => {
  const cnpj = document.getElementById('cnpjInput').value;
  if (cnpj) {
    localStorage.setItem('cnpj_empresa', cnpj);
  }
  window.location.href = 'index.html';
};




const modalLoading = document.getElementById('modalLoading');

function iniciarLoadingERedirecionar() {
  modal.classList.add('hidden');
  modalLoading.classList.remove('hidden');

  setTimeout(() => {
    window.location.href = 'index.html';
  }, 2000); //tempo de transicao
}

document.getElementById('continuarSemCnpj').onclick = () => {
  iniciarLoadingERedirecionar();
};

document.getElementById('continuarComCnpj').onclick = () => {
  const cnpj = document.getElementById('cnpjInput').value;
  if (cnpj) {
    localStorage.setItem('cnpj_empresa', cnpj);
  }
  iniciarLoadingERedirecionar();
};
