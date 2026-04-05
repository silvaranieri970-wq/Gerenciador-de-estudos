// 1. BANCO DE DATOS (UDESC - 1ª a 4ª Fase)
const dadosEstudos = {
    "1": {
        "Introdução ao Desenvolvimento": ["Processo de solução de problemas", "Tabela Verdade e Operadores Lógicos", "Estruturas Condicionais", "Estruturas de Repetição (for/while)", "Teste Automatizado (JUNIT)", "Arrays e Matrizes"],
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

// 2. FUNÇÕES DE INTERFACE (MATÉRIAS E SUGESTÕES)
function atualizarMaterias() {
    const fase = document.getElementById('input-fase').value;
    const selectMateria = document.getElementById('input-materia');
    selectMateria.innerHTML = '<option value="">Selecione a matéria</option>';
    
    if (dadosEstudos[fase]) {
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
    
    if (dadosEstudos[fase] && dadosEstudos[fase][materia]) {
        dadosEstudos[fase][materia].forEach(assunto => {
            let opt = document.createElement('option');
            opt.value = assunto;
            datalist.appendChild(opt);
        });
    }
}

// 3. LÓGICA DE SALVAMENTO (LOCAL STORAGE)
function salvarNoCofre() {
    const listaPendentes = document.getElementById("lista-pendentes").innerHTML;
    localStorage.setItem('meuAtelieDados', listaPendentes);
}

window.onload = function() {
    const salvo = localStorage.getItem('meuAtelieDados');
    if (salvo) {
        document.getElementById("lista-pendentes").innerHTML = salvo;
    }
};

// 4. FUNÇÃO PRINCIPAL: ADICIONAR TAREFA
function adicionarTarefa() {
    const materia = document.getElementById('input-materia').value;
    const assunto = document.getElementById('input-assunto').value;
    
    if (!materia || !assunto) {
        alert("Por favor, selecione a matéria e o assunto!");
        return;
    }

    // Gerando a data automática (dia/mês)
    const hoje = new Date();
    const dataFormatada = hoje.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });

    const lista = document.getElementById('lista-pendentes');
    const li = document.createElement('li');
    li.style.marginBottom = "10px"; // Pequeno ajuste de espaço

    // Montando o visual do item com o botão de excluir que também salva ao ser clicado
    li.innerHTML = `
        <span>
            <i class="fas fa-calendar-alt" style="margin-right:8px; color:#666;"></i>
            <small>${dataFormatada}</small> - 
            <strong>${materia}</strong>: ${assunto}
        </span>
        <button onclick="this.parentElement.remove(); salvarNoCofre();" 
                style="background:none; color:red; border:none; cursor:pointer; font-weight:bold; float:right;">
            X
        </button>
    `;

    lista.appendChild(li);
    
    // Salva automaticamente no navegador
    salvarNoCofre();

    // Limpa o campo de assunto para a próxima
    document.getElementById('input-assunto').value = '';
}

// 5. FUNÇÃO SAIR (OPCIONAL)
function sair() {
    if (confirm("Deseja limpar sua lista e sair?")) {
        localStorage.removeItem('meuAtelieDados');
        location.reload();
    }
}
