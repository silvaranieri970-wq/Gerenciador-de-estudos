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
