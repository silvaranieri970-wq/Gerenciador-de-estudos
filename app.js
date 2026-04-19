
// 1. VERIFICAÇÃO DE ACESSO E PERSONALIZAÇÃO
window.onload = function() {
    const usuario = localStorage.getItem('usuarioLogado');
    
    // Se não houver usuário logado, redireciona para o login
    if (!usuario) {
        window.location.href = "index.html";
        return;
    }

    // Personaliza o título com o nome do usuário (antes do @)
    const nomeUsuario = usuario.split('@')[0];
    const titulo = document.querySelector('h1');
    titulo.innerHTML = `<i class="fas fa-graduation-cap"></i> Olá, ${nomeUsuario}!`;

    // Carrega os dados salvos se existirem
    const salvo = localStorage.getItem('meuAtelieDados');
    if (salvo) {
        document.getElementById("lista-pendentes").innerHTML = salvo;
    }
    
    // Atualiza o contador de tarefas inicial
    atualizarContador();
};

// 2. BANCO DE DADOS (UDESC - 1ª a 4ª Fase)
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
    }
    // Você pode adicionar as fases 3 e 4 aqui depois!
};
function atualizarRelogio() {
    const agora = new Date();
    const tempo = agora.toLocaleTimeString('pt-BR');
    const el = document.getElementById('relogio');
    if(el) el.innerText = tempo;
}
setInterval(atualizarRelogio, 1000); // Atualiza a cada 1 segundo

// 3. LÓGICA DE INTERFACE
function atualizarMaterias() {
    const fase = document.getElementById('input-fase').value;
    const selectMateria = document.getElementById('input-materia');
    selectMateria.innerHTML = '<option value="">Selecione a matéria</option>';
    
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
    datalist.innerHTML = '';
    
    if (dadosEstudos[fase] && dadosEstudos[fase][materia]) {
        dadosEstudos[fase][materia].forEach(assunto => {
            let opt = document.createElement('option');
            opt.value = assunto;
            datalist.appendChild(opt);
        });
    }
}

// 4. LÓGICA DE TAREFAS
function adicionarTarefa() {
    const materia = document.getElementById('input-materia').value;
    const assunto = document.getElementById('input-assunto').value;
    
    if (!materia || !assunto) {
        alert("Escolha a matéria e o assunto!");
        return;
    }

    const lista = document.getElementById('lista-pendentes');
    const data = new Date().toLocaleDateString('pt-BR', {day: '2d', month: '2d'});
    
    const item = document.createElement('li');
    item.innerHTML = `
        <span><i class="fas fa-calendar-day" style="color:#777; margin-right:10px"></i> <strong>${data} - ${materia}:</strong> ${assunto}</span>
        <button onclick="removerTarefa(this)" style="background:none; color:#d9534f; font-weight:bold; padding:0">X</button>
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
    const conteudo = document.getElementById("lista-pendentes").innerHTML;
    localStorage.setItem('meuAtelieDados', conteudo);
}

function sair() {
    localStorage.removeItem('usuarioLogado');
    window.location.href = "index.html";
}
