const filtro = document.getElementById("filtroCategoria");
const cards = document.querySelectorAll(".card-parceiro");

filtro.addEventListener("change", () => {
  const categoria = filtro.value;

  cards.forEach((card) => {
    if (!categoria || card.dataset.categoria === categoria) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
});

function abrirModalCompra() {
  document.getElementById("modalCompra").classList.remove("hidden");
}

function fecharModalCompra() {
  document.getElementById("modalCompra").classList.add("hidden");
}





