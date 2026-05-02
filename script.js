let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

const botoes = document.querySelectorAll(".btn-comprar");
const lista = document.getElementById("lista-carrinho");
const contador = document.getElementById("contador");
const icone = document.getElementById("icone-carrinho");
const box = document.getElementById("carrinho-box");

// ABRIR / FECHAR
icone.addEventListener("click", () => {
  box.classList.toggle("fechado");
});

// ADICIONAR PRODUTO
botoes.forEach(botao => {
  botao.addEventListener("click", () => {

    const nome = botao.dataset.produto;
    const preco = botao.dataset.preco;

    const itemExistente = carrinho.find(item => item.nome === nome);

    if (itemExistente) {
      itemExistente.qtd++;
    } else {
      carrinho.push({ nome, preco, qtd: 1 });
    }

    atualizarCarrinho();
  });
});

// ATUALIZAR
function atualizarCarrinho() {
  lista.innerHTML = "";

  carrinho.forEach((item, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>${item.nome}</span>
      <div>
        <button onclick="diminuir(${index})">-</button>
        ${item.qtd}
        <button onclick="aumentar(${index})">+</button>
      </div>
    `;

    lista.appendChild(li);
  });

  contador.innerText = carrinho.reduce((total, item) => total + item.qtd, 0);

  const total = calcularTotal();

const totalElement = document.createElement("p");
totalElement.innerHTML = `<strong>Total: R$ ${total.toFixed(2)}</strong>`;

lista.appendChild(totalElement);

localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

// AUMENTAR
function aumentar(index) {
  carrinho[index].qtd++;
  atualizarCarrinho();
}

// DIMINUIR
function diminuir(index) {
  carrinho[index].qtd--;

  if (carrinho[index].qtd <= 0) {
    carrinho.splice(index, 1);
  }

  atualizarCarrinho();

}
const finalizar = document.getElementById("finalizar");

finalizar.addEventListener("click", () => {

  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  let mensagem = "Olá! Quero comprar:%0A%0A";

  carrinho.forEach(item => {
    mensagem += `- ${item.nome} (x${item.qtd})%0A`;
  });

  const telefone = "5511990043226"; // 👈 COLOCA SEU NÚMERO

  const total = calcularTotal();
mensagem += `%0ATotal: R$ ${total.toFixed(2)}`;

  const url = `https://wa.me/${telefone}?text=${mensagem}`;

  window.open(url, "_blank");
});
function calcularTotal() {
  let total = 0;

  carrinho.forEach(item => {
    let valor = item.preco
      .replace("R$", "")
      .replace(",", ".")
      .trim();

    total += parseFloat(valor) * item.qtd;
  });

  return total;
}
atualizarCarrinho();

window.addEventListener("load", () => {
  const banner = document.getElementById("banner");

  function trocarImagem() {
    const largura = window.innerWidth;

    if (largura <= 768) {
      if (!banner.src.includes("celular2.jpeg")) {
        banner.src = "imagens/celular2.jpeg";
      }
    } else {
      if (!banner.src.includes("principal.jpeg")) {
        banner.src = "imagens/principal.jpeg";
      }
    }
  }

  trocarImagem();
  window.addEventListener("resize", trocarImagem);
});