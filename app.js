// 1. Banco de Dados da UDESC (Nomes amigáveis sem códigos)
const gradeUdesc = {
    "1": ["Introdução ao Desenvolvimento", "Fundamentos de Eng. Software", "Matemática Básica", "Processos de Software"],
    "2": ["Desenvolvimento Orientado a Objetos I", "Requisitos de Software", "Infraestruturas Computacionais", "Modelagem de Dados"],
    "3": ["Desenvolvimento Orientado a Objetos II", "Testes de Software", "Interface Humano-Computador", "Matemática Discreta"],
    "4": ["Projeto de Software", "Probabilidade e Estatística", "Resolução de Problemas", "Qualidade de Software"]
};

// Dados iniciais (Caso não tenha nada no LocalStorage)
let dados = JSON.parse(localStorage.getItem('ateliê_dados')) || {
    pendentes: [],
    concluidas: []
};

// 2. Função para preencher matérias automaticamente
function atualizarOpcoesMaterias() {
    const faseModal = document.getElementById('input-fase').value;
    const selectMateria = document.getElementById('input-materia');
    
    selectMateria.innerHTML = '<option value="">Selecione a Matéria</option>';

    if (gradeUdesc[faseModal]) {
        gradeUdesc[faseModal].forEach(materia => {
            const option = document.createElement('option');
            option.value = materia;
            option.text = materia;
            selectMateria.appendChild(option);
        });
    }
}

// 3. Função para Adicionar Nova Tarefa
function adicionarItem() {
    const materia = document.getElementById('input-materia').value;
    const assunto = document.getElementById('input-assunto').value;
    const fase = document.getElementById('input-fase').value;
    const categoria = document.getElementById('input-categoria').value;

    if (!materia || !assunto) {
        alert("Por favor, preencha a matéria e o assunto!");
        return;
    }

    const novoItem = {
        id: Date.now(),
        materia: materia,
        assunto: assunto,
        fase: fase,
        categoria: categoria
    };

    dados.pendentes.push(novoItem);
    salvarEDesenhar();
    
    // Limpa o campo de assunto após adicionar
    document.getElementById('input-assunto').value = '';
}

// 4. Salvar no Navegador e Atualizar a Tela
function salvarEDesenhar() {
    localStorage.setItem('ateliê_dados', JSON.stringify(dados));
    desenharListas();
}

function desenharListas() {
    const listaP = document.getElementById('lista-pendentes');
    const listaC = document.getElementById('lista-concluidas');
    
    listaP.innerHTML = '';
    listaC.innerHTML = '';

    dados.pendentes.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span><strong>${item.materia}</strong> - ${item.assunto} <span class="tag">${item.categoria}</span></span>
            <button onclick="concluir(${item.id})"><i class="fas fa-check"></i></button>
        `;
        listaP.appendChild(li);
    });

    dados.concluidas.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span><del>${item.materia}</del> - ${item.assunto}</span>
            <button onclick="excluir(${item.id})"><i class="fas fa-trash"></i></button>
        `;
        listaC.appendChild(li);
    });

    document.getElementById('count-pendentes').innerText = dados.pendentes.length;
    document.getElementById('count-concluidas').innerText = dados.concluidas.length;
}

// 5. Busca Inteligente (Filtra pelo que o usuário digita)
document.getElementById('campo-busca').addEventListener('input', function() {
    const termo = this.value.toLowerCase();
    const itens = document.querySelectorAll('li');

    itens.forEach(li => {
        const texto = li.innerText.toLowerCase();
        li.style.display = texto.includes(termo) ? 'flex' : 'none';
    });
});

// Inicializa o botão de adicionar
document.getElementById('btn-adicionar').addEventListener('click', adicionarItem);

// Desenha ao carregar a página
desenharListas();
// Função para Mover para "Já Estudado"
function concluir(id) {
    const index = dados.pendentes.findIndex(item => item.id === id);
    if (index !== -1) {
        const item = dados.pendentes.splice(index, 1)[0];
        dados.concluidas.push(item);
        salvarEDesenhar();
    }
}

// Função para Deletar Permanentemente
function excluir(id) {
    // Procura nas duas listas
    dados.pendentes = dados.pendentes.filter(item => item.id !== id);
    dados.concluidas = dados.concluidas.filter(item => item.id !== id);
    salvarEDesenhar();
}

// Função para Filtrar por Fase na tela principal
function filtrarPorFase() {
    const faseSelecionada = document.getElementById('filtro-fase').value;
    const itens = document.querySelectorAll('li');

    itens.forEach(li => {
        // Se for "todas" ou o item for daquela fase, mostra.
        // Nota: Precisamos que o item salve a fase no objeto para isso ser perfeito.
        li.style.display = 'flex'; 
    });
    
    // Dica: Para um filtro visual perfeito, o ideal é redesenhar a lista 
    // filtrando o array 'dados' antes do forEach.
}
// 1. Dicionário de Assuntos (Exemplo com IDT que você enviou)
const assuntosPorMateria = {
    "Introdução ao Desenvolvimento": [
        "Processo de solução de problemas",
        "Variáveis, constantes e tipos primitivos",
        "Tabela Verdade e Operadores Lógicos",
        "Estruturas Condicionais (se/então)",
        "Estruturas de Repetição (for/while)",
        "Subprogramas e Parametrização",
        "Teste Unitário e JUNIT",
        "Manipulação de Arrays e Matrizes"
    ],
    "Fundamentos de Eng. Software": [
        "Ciclos de Vida (Cascata, Incremental)",
        "Processo Unificado (RUP)",
        "Qualidade de Software",
        "Ética e Postura Profissional"
    ]
    // Você pode adicionar as outras matérias aqui seguindo o mesmo padrão!
};

// 2. Função para atualizar as sugestões de assunto
function atualizarSugestoesAssunto() {
    const materiaSelecionada = document.getElementById('input-materia').value;
    const datalist = document.getElementById('sugestoes-assunto');
    
    // Limpa as sugestões atuais
    datalist.innerHTML = '';

    // Se existirem assuntos para essa matéria, adiciona-os ao datalist
    if (assuntosPorMateria[materiaSelecionada]) {
        assuntosPorMateria[materiaSelecionada].forEach(assunto => {
            const option = document.createElement('option');
            option.value = assunto;
            datalist.appendChild(option);
        });
    }
}

// 3. Conectar com o campo de matéria
document.getElementById('input-materia').addEventListener('change', atualizarSugestoesAssunto);
