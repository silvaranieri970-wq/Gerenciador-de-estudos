window.onload = function() {
    const usuario = localStorage.getItem('usuarioLogado');
    if (!usuario) {
        if (!window.location.href.includes("index.html")) {
            window.location.href = "index.html";
        }
    } else {
        const nome = usuario.split('@')[0];
        const h1 = document.getElementById('boas-vindas');
        if (h1) h1.innerText = "Olá, " + nome;
    }
    atualizarRelogio();
    atualizarContador();
};

const dadosEstudos = {
    "1": { "Matemática Básica": ["Funções", "Logaritmos"], "Fundamentos": ["Ciclo de Vida", "Ética"] },
    "2": { "Cálculo I": ["Limites", "Derivadas"], "Álgebra": ["Matrizes", "Sistemas"] }
};

function atualizarRelogio() {
    setInterval(() => {
        const el = document.getElementById('relogio');
        if (el) el.innerText = new Date().toLocaleTimeString();
    }, 1000);
}

function atualizarMaterias() {
    const fase = document.getElementById('input-fase').value;
    const select = document.getElementById('input-materia');
    select.innerHTML = '<option value="">Matéria</option>';
    if (dadosEstudos[fase]) {
        Object.keys(dadosEstudos[fase]).forEach(m => {
            let opt = document.createElement('option');
            opt.value = m; opt.innerHTML = m;
            select.appendChild(opt);
        });
    }
}

function adicionarTarefa() {
    const mat = document.getElementById('input-materia').value;
    const ass = document.getElementById('input-assunto').value;
    const lista = document.getElementById('lista-pendentes');
    if (!mat || !ass) return alert("Preencha tudo!");

    const li = document.createElement('li');
    li.innerHTML = `<span><strong>${mat}:</strong> ${ass}</span> <button onclick="this.parentElement.remove(); atualizarContador();">X</button>`;
    lista.appendChild(li);
    atualizarContador();
}

function atualizarContador() {
    const count = document.querySelectorAll('#lista-pendentes li').length;
    document.getElementById('numero-tarefas').innerText = count;
}

function sair() {
    localStorage.removeItem('usuarioLogado');
    window.location.href = "index.html";
}
