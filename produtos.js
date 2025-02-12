
//pegar os dados do arquivo json através do ajax
var ajax = new XMLHttpRequest();
ajax.open("GET", "produtos.json", true);
ajax.responseType = "json";
ajax.send();

ajax.addEventListener("readystatechange", function () {
    if (ajax.readyState === 4 && ajax.status === 200) {
        console.log(ajax);

        var resposta = ajax.response;

        // Seleciona o container
        var containerCardsPedidos = document.getElementById('card-pedidos');
        let cardsHtml = ""; // Variável para armazenar os cards

        // Mapeia e cria os cards
        resposta.map((valor) => {
            cardsHtml += `
            <div class="card">
                <div class="img"><img src="${valor.imagem}" alt="${valor.titulo}"></div>
                <div class="content">
                    <div class="product-name">${valor.titulo}</div>
                    <div class="price">${parseFloat(valor.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
                    <div style="clear:both"></div>
    
                    <div class="product-description">${valor.descricao}<br><br></div>
                    <div class="btn">
                        <a key="${valor.id}" href="#">Detalhes</a>
                    </div>
                </div>
            </div>
            `;
        });

        // Insere todos os cards de uma vez no container
        containerCardsPedidos.innerHTML = cardsHtml;

        // Função para redirecionar
        var passaValor = function (valor) {
            window.location = "detalhes.html?produto=" + encodeURIComponent(valor);
        };

        // Adiciona evento aos links
        var links = document.getElementsByTagName('a');
        for (var i = 0; i < links.length; i++) {
            links[i].addEventListener("click", function () {
                let key = this.getAttribute('key');
                console.log("O valor é: " + key);

                var valorQueEuQueroPassar = key;
                passaValor(valorQueEuQueroPassar);
                return false;
            });
        }
    } else if (ajax.readyState === 4) {
        console.error("Erro ao carregar os dados: ", ajax.status, ajax.statusText);
    }
});
