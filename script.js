let carrinho = [];

const botoes = document.querySelectorAll(".btn-comprar");
const contador = document.getElementById("contador");
const finalizar = document.getElementById("finalizar");

botoes.forEach(botao => {
    botao.addEventListener("click", () => {

        // tenta pegar o card do produto (com ou sem .produto)
        let card = botao.closest(".produto") || botao.parentElement;

        const produto = botao.dataset.produto;
        const preco = botao.dataset.preco;

        carrinho.push({
            nome: produto,
            preco: preco
        });

        atualizarTotal();

        // atualiza contador (se existir)
        if (contador) {
            contador.innerText = carrinho.length;
        }

        // efeito no botão
        botao.innerText = "✔";

        setTimeout(() => {
            botao.innerText = "Adicionar";
        }, 1000);

    });
});

if (finalizar) {
    finalizar.addEventListener("click", () => {

        if (carrinho.length === 0) {
            alert("Carrinho vazio!");
            return;
        }

        const numero = "5511990043226";

        const mensagem =
            "Olá! Quero comprar os produtos:\n" +
            carrinho.map(item => item.nome + " - " + item.preco).join("\n");

        const url =
            "https://wa.me/" +
            numero +
            "?text=" +
            encodeURIComponent(mensagem);

        window.open(url, "_blank");

    });
}

function atualizarTotal() {
  let total = 0;

  carrinho.forEach(item => {
    // remove "R$" e troca vírgula por ponto
    let preco = item.preco
      .replace("R$", "")
      .replace(",", ".")
      .trim();

    total += parseFloat(preco);
  });

  const totalElemento = document.getElementById("total");

  if (totalElemento) {
    totalElemento.innerText = total.toFixed(2);
  }
}

const removerUltimo = document.getElementById("remover-ultimo");

if (removerUltimo) {
  removerUltimo.addEventListener("click", () => {
    
    if (carrinho.length === 0) {
      alert("Carrinho já está vazio!");
      return;
    }

    carrinho.pop();

    if (contador) {
      contador.innerText = carrinho.length;
    }

    atualizarTotal();

    alert("Último item removido!");
  });
}

const botaoEnviar = document.getElementById("enviar");

if (botaoEnviar) {
  botaoEnviar.addEventListener("click", () => {

    const nome = document.getElementById("nome").value;
    const mensagem = document.getElementById("mensagem").value;

    if (!nome || !mensagem) {
      alert("Preencha todos os campos!");
      return;
    }

    const numero = "5511990043226";

    const texto = `Olá! Me chamo ${nome}. ${mensagem}`;

    const url = "https://wa.me/" + numero + "?text=" + encodeURIComponent(texto);

    window.open(url, "_blank");
  });
}

//* aqui*// 
botaoEnviar.addEventListener("click", () => {

  window.open("https://wa.me/5511990043226?text=Test", "_blank");
});