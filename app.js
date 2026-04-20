window.onload = function() {
    const usuario = localStorage.getItem('usuarioLogado');
    if (!usuario && !window.location.href.includes("index.html")) {
        window.location.href = "index.html";
    } else if (usuario) {
        const nome = usuario.split('@')[0];
        const titulo = document.querySelector('h1');
        if (titulo) titulo.innerHTML = `<i class="fas fa-graduation-cap"></i> Olá, ${nome}!`;
    }
    
    const salvo = localStorage.getItem('meuAtelieDados');
    if (salvo && document.getElementById('lista-pendentes')) {
        document.getElementById('lista-pendentes').innerHTML = salvo;
    }
    setInterval(() => {
        const r = document.getElementById('relogio');
        if(r) r.innerText = new Date().toLocaleTimeString();
    }, 1000);
    atualizarContador();
};

const dadosEstudos = {
    "1": { "Introdução ao Desenvolvimento": ["Tabela Verdade", "Operadores Lógicos"], "Fundamentos": ["Ciclo de Vida", "RUP"], "Matemática Básica": ["Funções", "Logaritmos"] },
    "2": { "Cálculo I": ["Limites", "Derivadas"], "Álgebra Linear": ["Matrizes", "Vetores"] }
};

function atualizarMaterias() {
    const fase = document.getElementById('input-fase').value;
    const selectMateria = document.getElementById('input-materia');
    selectMateria.innerHTML = '<option value="">Matéria</option>';
    if (dadosEstudos[fase]) {
        Object.keys(dadosEstudos[fase]).forEach(m => {
            let opt = document.createElement('option');
            opt.value = m; opt.innerHTML = m;
            selectMateria.appendChild(opt);
        });
    }
}

function atualizarSugestoes() {
    const fase = document.getElementById('input-fase').value;
    const materia = document.getElementById('input-materia').value;
    const datalist = document.getElementById('sugestoes-lista');
    if (datalist) datalist.innerHTML = '';
    if (dadosEstudos[fase] && dadosEstudos[fase][materia]) {
        dadosEstudos[fase][materia].forEach(a => {
            let opt = document.createElement('option');
            opt.value = a; datalist.appendChild(opt);
        });
    }
}

function adicionarTarefa() {
    const mat = document.getElementById('input-materia').value;
    const ass = document.getElementById('input-assunto').value;
    const lista = document.getElementById('lista-pendentes');
    if (!mat || !ass) return alert("Escolha matéria e assunto!");

    const li = document.createElement('li');
    li.innerHTML = `<span><strong>${mat}:</strong> ${ass}</span> <button onclick="remover(this)" style="background:none; color:red; border:none; cursor:pointer; font-weight:bold;">X</button>`;
    lista.appendChild(li);
    localStorage.setItem('meuAtelieDados', lista.innerHTML);
    atualizarContador();
    document.getElementById('input-assunto').value = '';
}

function remover(btn) {
    btn.parentElement.remove();
    localStorage.setItem('meuAtelieDados', document.getElementById('lista-pendentes').innerHTML);
    atualizarContador();
}

function atualizarContador() {
    const n = document.querySelectorAll('#lista-pendentes li').length;
    const el = document.getElementById('numero-tarefas');
    if (el) el.innerText = n;
}

function sair() {
    localStorage.removeItem('usuarioLogado');
    window.location.href = "index.html";
}
