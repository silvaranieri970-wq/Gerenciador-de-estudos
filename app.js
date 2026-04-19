// 1. VERIFICAÇÃO DE ACESSO E PERSONALIZAÇÃO
window.onload = function() {
    const usuario = localStorage.getItem('usuarioLogado');
    
    if (!usuario) {
        window.location.href = "index.html";
        return;
    }

    const nomeUsuario = usuario.split('@')[0];
    const titulo = document.querySelector('h1');
    if (titulo) titulo.innerHTML = `<i class="fas fa-graduation-cap"></i> Olá, ${nomeUsuario}!`;

    // Carrega dados salvos
    const salvo = localStorage.getItem('meuAtelieDados');
    if (salvo) {
        const lista = document.getElementById("lista-pendentes");
        if (lista) lista.innerHTML = salvo;
    }
    
    atualizarContador();
    atualizarRelogio();
};

// 2. BANCO DE DADOS (UDESC)
const dadosEstudos = {
    "1": {
        "Introdução ao Desenvolvimento": ["Processo de solução de problemas", "Tabela Verdade e Operadores Lógicos"],
        "Fundamentos de Eng. Software": ["Ciclo de Vida", "RUP", "Qualidade (Pu)", "Ética"],
        "Matemática Básica": ["Funções", "Logaritmos", "Trigonometria", "Conjuntos"]
    },
    "2": {
        "Cálculo I": ["Limites", "Derivadas", "Integrais"],
        "Álgebra Linear": ["Matrizes", "Vetores", "Sistemas Lineares"],
        "Linguagem de Programação I": ["Ponteiros", "Alocação Dinâmica", "Estruturas"]
    },
    "3": {
        "Estruturas de Dados": ["Listas", "Pilhas", "Filas", "Árvores"],
        "Sistemas Operacionais": ["Processos", "Memória", "File Systems"]
    },
    "4": {
        "Banco de Dados I": ["Modelagem ER", "SQL", "Normalização"],
        "Engenharia de Requisitos": ["Elicitação", "User Stories", "Casos de Uso"]
    }
};

// 3. WIDGETS
function atualizarRelogio() {
    const agora = new Date();
    const tempo = agora.toLocaleTimeString('pt-BR');
    const el = document.getElementById('relogio');
    if(el) el.innerText = tempo;
}
setInterval(atualizarRelogio, 1000);

// 4. LÓGICA DE INTERFACE
function atualizarMaterias() {
    const fase = document.getElementById('input-fase').value;
    const selectMateria = document.getElementById('input-materia');
    selectMateria.innerHTML = '<option value="">Matéria</option>';
    
    if (fase && dadosEstudos[fase]) {
        Object.keys(dadosEstudos[fase]).forEach(materia => {
            let opt = document.createElement('option');
            opt.value = materia;
            opt.innerHTML = materia;
            selectMateria.appendChild(opt);
        });
    }
}

function atualizarSugestoes() {
    const fase = document.getElementById('input-fase').value;
    const materia = document.getElementById('input-materia').value;
    const datalist = document.getElementById('sugestoes-lista');
    if (!datalist) return;
    datalist.innerHTML = '';
    
    if (dadosEstudos[fase] && dadosEstudos[fase][materia]) {
        dadosEstudos[fase][materia].forEach(assunto => {
            let opt = document.createElement('option');
            opt.value = assunto;
            datalist.appendChild(opt);
        });
    }
}

// 5. LÓGICA DE TAREFAS (AQUI ESTAVA O ERRO)
function adicionarTarefa() {
    const materia = document.getElementById('input-materia').value;
    const assunto = document.getElementById('input-assunto').value;
    const lista = document.getElementById('lista-pendentes');
    
    if (!materia || !assunto) {
        alert("Escolha a matéria e o assunto!");
        return;
    }

    if (!lista) {
        console.error("Erro: Elemento 'lista-pendentes' não encontrado no HTML!");
        return;
    }

    const dataObj = new Date();
    const dia = String(dataObj.getDate()).padStart(2, '0');
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
    const dataFormatada = `${dia}/${mes}`;
    
    const item = document.createElement('li');
    item.innerHTML = `
        <span><i class="fas fa-calendar-day" style="color:#777; margin-right:10px"></i> <strong>${dataFormatada} - ${materia}:</strong> ${assunto}</span>
        <button onclick="removerTarefa(this)" style="background:none; color:#d9534f; font-weight:bold; border:none; cursor:pointer;">X</button>
    `;
    
    lista.appendChild(item);
    salvarDados();
    document.getElementById('input-assunto').value = '';
    atualizarContador();
}

function removerTarefa(botao) {
    if(confirm("Deseja marcar como concluída?")) {
        botao.parentElement.remove();
        salvarDados();
        atualizarContador();
    }
}

function atualizarContador() {
    const total = document.querySelectorAll('#lista-pendentes li').length;
    const contadorArea = document.getElementById('numero-tarefas');
    if(contadorArea) {
        contadorArea.innerText = total;
    }
}

function salvarDados() {
    const lista = document.getElementById("lista-pendentes");
    if (lista) {
        localStorage.setItem('meuAtelieDados', lista.innerHTML);
    }
}

function sair() {
    localStorage.removeItem('usuarioLogado');
    window.location.href = "index.html";
}
