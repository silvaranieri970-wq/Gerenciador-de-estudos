// Banco de dados organizado por Fase -> Matéria -> Assuntos (sem siglas)
const dadosEstudos = {
    "1": {
        "Introdução ao Desenvolvimento": [
            "Processo de solução de problemas",
            "Tabela Verdade e Operadores Lógicos",
            "Estruturas Condicionais",
            "Estruturas de Repetição (for/while)",
            "Teste Automatizado (JUNIT)",
            "Arrays e Matrizes"
        ],
        "Fundamentos de Eng. Software": ["Ciclo de Vida", "RUP", "Qualidade (Pu)", "Ética"],
        "Matemática Básica": ["Funções", "Logaritmos", "Trigonometria", "Conjuntos"]
    },
    "2": {
        "Desenvolvimento Orientado a Objetos I": ["Classes e Objetos", "Herança", "Polimorfismo"],
        "Engenharia de Requisitos": ["Elicitação", "Análise", "Especificação"]
    },
    "3": {
        "Sistemas Operacionais": ["Processos", "Memória", "Sistemas de Arquivos"],
        "Banco de Dados I": ["Modelo ER", "SQL", "Normalização"]
    },
    "4": {
        "Programação Web": ["HTML/CSS", "JavaScript", "Frameworks"],
        "Estrutura de Dados": ["Listas", "Árvores", "Grafos"]
    }
};

function atualizarMaterias() {
    const fase = document.getElementById('input-fase').value;
    const selectMateria = document.getElementById('input-materia');
    selectMateria.innerHTML = '<option value="">Selecione a matéria</option>';
    
    if (dadosEstudos[fase]) {
        // Pega as matérias da fase escolhida
        Object.keys(dadosEstudos[fase]).forEach(materia => {
            let opt = document.createElement('option');
            opt.value = materia;
            opt.textContent = materia;
            selectMateria.appendChild(opt);
        });
    }
}

function atualizarSugestoes() {
    const fase = document.getElementById('input-fase').value;
    const materia = document.getElementById('input-materia').value;
    const datalist = document.getElementById('sugestoes-lista');
    datalist.innerHTML = '';
    
    // Procura os assuntos dentro da fase e matéria selecionadas
    if (dadosEstudos[fase] && dadosEstudos[fase][materia]) {
        dadosEstudos[fase][materia].forEach(assunto => {
            let opt = document.createElement('option');
            opt.value = assunto;
            datalist.appendChild(opt);
        });
    }
}

function adicionarTarefa() {
    const materia = document.getElementById('input-materia').value;
    const assunto = document.getElementById('input-assunto').value;
    
    if (!materia || !assunto) return alert("Escolha a matéria e o assunto!");

    const lista = document.getElementById('lista-pendentes');
    const li = document.createElement('li');
    li.innerHTML = `<span><strong>${materia}</strong>: ${assunto}</span> <button onclick="this.parentElement.remove()" style="background:none; color:red; border:none; cursor:pointer">X</button>`;
    lista.appendChild(li);
    
    document.getElementById('input-assunto').value = '';
}
// 1. Função para carregar os dados assim que a página abre
window.onload = function() {
    const salvo = localStorage.getItem('meuAtelieDados');
    if (salvo) {
        document.getElementById("listas-container").innerHTML = salvo;
    }
};

// 2. Função para salvar o estado atual da lista
function salvarNoCofre() {
    const conteudo = document.getElementById("listas-container").innerHTML;
    localStorage.setItem('meuAtelieDados', conteudo);
}

// 3. Função do botão Sair
function sair() {
    if (confirm("Deseja limpar sua lista e sair?")) {
        localStorage.removeItem('meuAtelieDados');
        location.reload();
    }
}

// 4. Sua função adicionar atualizada com DATA e SALVAMENTO
function adicionar() {
    const materia = document.getElementById("materia-entrada").value;
    const assunto = document.getElementById("entrada-assunto").value;

    if (!materia || !assunto) {
        alert("Por favor, preencha a matéria e o assunto!");
        return;
    }

    // Criando a data automática
    const hoje = new Date();
    const dataFormatada = hoje.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });

    const lista = document.getElementById("listas-container");
    const li = document.createElement("div");
    li.className = "item-pendente"; // Certifique-se que essa classe existe no seu CSS

    // Adicionando o ícone de calendário e o conteúdo
    li.innerHTML = `
        <i class="fas fa-calendar-alt" style="margin-right:8px; color:#666;"></i>
        <small>${dataFormatada}</small> - 
        <strong>${materia}</strong>: ${assunto}
        <span onclick="this.parentElement.remove(); salvarNoCofre();" style="color:red; cursor:pointer; float:right; font-weight:bold;"> X</span>
    `;

    lista.appendChild(li);
    
    // SALVA no navegador imediatamente após adicionar
    salvarNoCofre();

    // Limpa o campo de assunto para o próximo
    document.getElementById("entrada-assunto").value = "";
}
