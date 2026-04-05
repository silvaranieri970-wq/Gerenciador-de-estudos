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

    dados.concluidas.forEach(item => {
        li.innerHTML = `
    <span><del>${item.materia}</del> <span class="tag-categoria">${item.categoria}</span></span>
    <button onclick="excluir(${item.id}, 'concluidas')"><i class="fas fa-trash-alt"></i></button>
`;
        `;
        listaC.appendChild(li);
    });

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
