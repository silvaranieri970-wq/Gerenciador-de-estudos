// 1. VERIFICAÇÃO DE ACESSO (MOCK)
window.onload = function() {
    const usuario = localStorage.getItem('usuarioLogado');
    
    // Se não houver usuário logado, redireciona para o login imediatamente
    if (!usuario) {
        window.location.href = "index.html";
        return;
    }

    // Carrega os dados do "Cofre" se existirem
    const salvo = localStorage.getItem('meuAtelieDados');
    if (salvo) {
        document.getElementById("lista-pendentes").innerHTML = salvo;
    }
};

// 2. BANCO DE DATOS (UDESC - 1ª a 4ª Fase)
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

// 3. FUNÇÕES DE INTERFACE
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
            opt.appendChild(datalist); // Ajuste: datalist.appendChild(opt)
            datalist.appendChild(opt);
        });
    }
}

// 4. LÓGICA DE SALVAMENTO
function salvarNoCofre() {
    const listaPendentes = document.getElementById("lista-pendentes").innerHTML;
    localStorage.setItem('meuAtelieDados', listaPendentes);
}

// 5. FUNÇÃO PRINCIPAL: ADICIONAR TAREFA
function adicionarTarefa() {
    const materia = document.getElementById('input-materia').value;
    const assunto = document.getElementById('input-assunto').value;
    
    if (!materia || !assunto) {
        alert("Por favor, selecione a matéria e o assunto!");
        return;
    }

    const hoje = new Date();
    const dataFormatada = hoje.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });

    const lista = document.getElementById('lista-pendentes');
    const li = document.createElement('li');
    li.style.marginBottom = "10px";

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
    salvarNoCofre();
    document.getElementById('input-assunto').value = '';
}

// 6. FUNÇÃO SAIR (AGORA COM NAVEGAÇÃO)
function sair() {
    if (confirm("Deseja encerrar sua sessão?")) {
        localStorage.removeItem('usuarioLogado'); // Limpa o login
        window.location.href = "index.html"; // Volta para o login
    }
}
