const gradeUdesc = {
    "1": ["IDT - Introd. ao Desenv. de Software", "FES - Fundamentos de Eng. Software", "MAT - Matemática Básica", "PRS - Processos"],
    "2": ["DOO1 - Desenv. Orientado a Objetos I", "REQ - Requisitos de Software", "INF - Infraestruturas Computacionais", "BD1 - Modelagem de Dados"],
    "3": ["DOO2 - Desenv. Orientado a Objetos II", "TES - Testes de Software", "IHC - Interface Humano-Computador", "MDI - Matemática Discreta"],
    "4": ["PRJ - Projeto de Software", "EST - Probabilidade e Estatística", "RPE - Resolução de Problemas", "QUA - Qualidade de Software"]
};
const btnAdicionar = document.getElementById('btn-adicionar');
const campoBusca = document.getElementById('campo-busca');

// Carregar dados salvos
let dados = JSON.parse(localStorage.getItem('estudos')) || { pendentes: [], concluidas: [] };

function salvar() {
    localStorage.setItem('estudos', JSON.stringify(dados));
    renderizar();
}

btnAdicionar.addEventListener('click', () => {
    const materia = document.getElementById('materia').value;
    const assunto = document.getElementById('assunto').value;
    const categoria = document.getElementById('categoria').value;

    function atualizarOpcoesMaterias() {
    const fase = document.getElementById('input-fase').value; // ID do select de fase no modal
    const comboMateria = document.getElementById('input-materia'); // ID do select de matéria no modal
    
    comboMateria.innerHTML = '<option value="">Selecione a matéria...</option>';
    
    if (fase && gradeUdesc[fase]) {
        gradeUdesc[fase].forEach(materia => {
            const opt = document.createElement('option');
            opt.value = materia;
            opt.textContent = materia;
            comboMateria.appendChild(opt);
        });
    }
}
    if (materia && assunto) {
        dados.pendentes.push({ id: Date.now(), materia, assunto, categoria });
        document.getElementById('materia').value = '';
        document.getElementById('assunto').value = '';
        salvar();
    }
});

function concluir(id) {
    const index = dados.pendentes.findIndex(i => i.id === id);
    const item = dados.pendentes.splice(index, 1)[0];
    dados.concluidas.push(item);
    salvar();
}

function excluir(id, lista) {
    dados[lista] = dados[lista].filter(i => i.id !== id);
    salvar();
}

function renderizar() {
    const listaP = document.getElementById('lista-pendentes');
    const listaC = document.getElementById('lista-concluidas');
    
    listaP.innerHTML = '';
    listaC.innerHTML = '';

    dados.pendentes.forEach(item => {
        const li = document.createElement('li');
       li.innerHTML = `
    <span><strong>${item.materia}</strong>: ${item.assunto} <span class="tag-categoria">${item.categoria}</span></span>
    <div>
        <button onclick="concluir(${item.id})"><i class="fas fa-check"></i></button>
        <button onclick="excluir(${item.id}, 'pendentes')"><i class="fas fa-trash-alt"></i></button>
    </div>
`;
        `;
        listaP.appendChild(li);
    });

const novoItem = {
    id: Date.now(), // Gera um ID único
    materia: document.getElementById('input-materia').value,
    assunto: document.getElementById('input-assunto').value,
    categoria: document.getElementById('input-categoria').value,
    fase: document.getElementById('input-fase').value // [NOVO] Pega a fase do modal
};

dados.pendentes.push(novoItem);
salvarEDesenhar(); // Sua função que salva no localStorage e limpa a tela


    document.getElementById('count-pendentes').innerText = dados.pendentes.length;
    document.getElementById('count-concluidas').innerText = dados.concluidas.length;
}

// Busca em tempo real
campoBusca.addEventListener('input', () => {
    const termo = campoBusca.value.toLowerCase();
    document.querySelectorAll('li').forEach(li => {
        li.style.display = li.innerText.toLowerCase().includes(termo) ? 'flex' : 'none';
    });
});

renderizar();
// Faz o botão de busca executar a mesma lógica do campo
document.getElementById('btn-buscar').addEventListener('click', () => {
    campoBusca.dispatchEvent(new Event('input'));
});
const todasAsMaterias = [
    { id: "IDT", nome: "Introdução ao Desenv. de Software e Testes", fase: "1", categoria: "Programação" },
    { id: "MAT", nome: "Tópicos em Matemática Básica", fase: "1", categoria: "Exatas" },
    { id: "DOO1", nome: "Desenv. de Software Orientado a Objetos I", fase: "2", categoria: "Programação" },
    { id: "REQ", nome: "Requisitos de Software", fase: "2", categoria: "Programação" },
    // Adicione as demais matérias da grade aqui...
];
function filtrarPorFase() {
    // 1. Captura qual fase o usuário escolheu no HTML
    const faseSelecionada = document.getElementById('filtro-fase').value;
    
    // 2. Limpa as listas atuais na tela para não duplicar dados
    const listaP = document.getElementById('lista-pendentes'); // Ajuste o ID se for diferente
    const listaC = document.getElementById('lista-concluidas');
    listaP.innerHTML = '';
    listaC.innerHTML = '';

    // 3. Função auxiliar para desenhar os itens (mantendo seu estilo atual)
    const renderizarItem = (item, listaAlvo, tipo) => {
        // Só renderiza se for "todas" ou se a fase do item for igual à selecionada
        if (faseSelecionada === 'todas' || item.fase === faseSelecionada) {
            const li = document.createElement('li');
            
            // Aqui usamos o template que você já criou com as tags de categoria
            li.innerHTML = `
                <span><strong>${item.materia}</strong>: ${item.assunto} 
                <span class="tag-categoria">${item.categoria}</span></span>
                <div>
                    ${tipo === 'pendentes' ? `<button onclick="concluir(${item.id})">✅</button>` : ''}
                    <button onclick="excluir(${item.id}, '${tipo}')">❌</button>
                </div>
            `;
            listaAlvo.appendChild(li);
        }
    };

    // 4. Executa o filtro para as duas listas
    dados.pendentes.forEach(item => renderizarItem(item, listaP, 'pendentes'));
    dados.concluidas.forEach(item => renderizarItem(item, listaC, 'concluidas'));
    
    // 5. Atualiza os contadores (opcional, se você quiser que o (0) mude conforme o filtro)
    atualizarContadores(); 
}
