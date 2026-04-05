const sugestoesAssunto = {
    "1": { // Referência à 1ª Fase
        "IDT - Introd. ao Desenv. de Software": [
            "Processo de solução de problemas",
            "Tabela Verdade e Operadores Lógicos",
            "Estruturas Condicionais",
            "Estruturas de Repetição (for/while)",
            "Teste Automatizado (JUNIT)",
            "Arrays e Matrizes"
        ],
        "FES - Fundamentos de Eng. Software": [
            "Ciclo de Vida de Software",
            "Desenvolvimento Incremental",
            "Qualidade e Usabilidade (Pu)",
            "Engenharia de Requisitos"
        ],
        "MAT - Matemática Básica": [
            "Funções de 1º e 2º Grau",
            "Logaritmos",
            "Trigonometria",
            "Conjuntos Numéricos"
        ],
        "PRS - Processos": [
            "Fases do RUP",
            "Metodologias Ágeis (Scrum)",
            "Gerenciamento de Configuração"
        ]
    }
};

function atualizarSugestoes() {
    const fase = document.getElementById('input-fase').value;
    const materia = document.getElementById('input-materia').value;
    const datalist = document.getElementById('sugestoes-lista');
    
    datalist.innerHTML = '';
    
    // Busca os assuntos apenas se a fase e a matéria existirem no nosso banco
    if (sugestoesAssunto[fase] && sugestoesAssunto[fase][materia]) {
        sugestoesAssunto[fase][materia].forEach(assunto => {
            let opt = document.createElement('option');
            opt.value = assunto; // Aqui vai apenas o nome do assunto, sem códigos!
            datalist.appendChild(opt);
        });
    }
}
