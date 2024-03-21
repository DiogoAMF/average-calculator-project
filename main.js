const form = document.getElementById("form-atividade");
const imgAprovado = '<img src="./image/aprovado.png" alt="Emoji Feliz">';
const imgReprovado = '<img src="./image/reprovado.png" alt="Emoji Triste">';
const atividades = [];
const notas = [];
const spanAprovado = `<span class="resultado aprovado">Aprovado</span>`;
const spanReprovado = `<span class="resultado reprovado">Reprovado</span>`;

const notaMinima = parseFloat(prompt("Digite a nota minima:"));

let linhas = " "; // Inicializando a variável linhas

// Adicionando um ouvinte de evento para o envio do formulário
form.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevenindo o comportamento padrão do formulário

  adicionaLinha(); // Chamando a função para adicionar uma linha à tabela
  atualizaTabela(); // Chamando a função para atualizar a tabela
  atualizaMediaFinal(); // Chamando a função para atualizar a média final
});

// Função para adicionar uma linha à tabela
function adicionaLinha() {
  // Obtendo os elementos de input do nome e da nota da atividade
  const inputNomeAtividade = document.getElementById("nome-atividade");
  const inputNotaAtividade = document.getElementById("nota-atividade");

  // Verificando se a atividade já foi inserida
  if (atividades.includes(inputNomeAtividade.value)) {
    alert(`A atividade ${inputNomeAtividade.value} já foi inserida`);
  } else {
    // Adicionando o nome da atividade e sua nota aos arrays correspondentes
    atividades.push(inputNomeAtividade.value);
    notas.push(parseFloat(inputNotaAtividade.value));

    // Criando uma linha HTML para a tabela
    let linha = "<tr>";
    linha += `<td>${inputNomeAtividade.value}</td>`;
    linha += `<td>${inputNotaAtividade.value}</td>`;
    linha += `<td>${
      inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado
    }</td>`;
    linha += `</tr>`;

    // Adicionando a linha à string linhas
    linhas += linha; /* += é o operador de concatenação */
  }

  // Resetando os campos de input
  inputNomeAtividade.value = " ";
  inputNotaAtividade.value = " ";
}

// Função para atualizar a tabela na página HTML
function atualizaTabela() {
  const corpoTabela = document.querySelector("tbody"); // Selecionando o corpo da tabela
  corpoTabela.innerHTML = linhas; // Atualizando o conteúdo do corpo da tabela com as linhas
}

// Função para atualizar a média final na página HTML
function atualizaMediaFinal() {
  // Calculando a média final das notas
  const mediaFinal = calculaMediaFinal();

  // Atualizando o valor da média final na página HTML e limitando o numero de casas decimais
  document.getElementById("media-final-valor").innerHTML =
    mediaFinal.toFixed(2);

  // Determinando se o aluno foi aprovado ou reprovado e atualizando o resultado na página HTML
  document.getElementById("media-final-resultado").innerHTML =
    mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}

// Função para calcular a média final das notas
function calculaMediaFinal() {
  let somaDasNotas = 0; // Variável para armazenar a soma das notas

  // Loop para percorrer todas as notas e calcular a soma
  for (let i = 0; i < notas.length; i++) {
    somaDasNotas += notas[i]; // Adicionando o valor da nota à soma
  }

  // Calculando e retornando a média final
  return somaDasNotas / notas.length;
}
