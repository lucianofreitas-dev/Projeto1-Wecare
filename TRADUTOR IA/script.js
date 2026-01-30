// ============ OBJETO COM TRADUÇÕES ============
// Armazena as traduções em diferentes idiomas
const dicionario = {
    'Inglês': {
        'olá': 'hello',
        'mundo': 'world',
        'bom dia': 'good morning',
        'boa noite': 'good night',
        'obrigado': 'thank you',
        'por favor': 'please',
        'sim': 'yes',
        'não': 'no',
        'como você está?': 'how are you?',
        'meu nome é': 'my name is'
    },
    'alemão': {
        'olá': 'hallo',
        'mundo': 'welt',
        'bom dia': 'guten morgen',
        'boa noite': 'gute nacht',
        'obrigado': 'danke',
        'por favor': 'bitte',
        'sim': 'ja',
        'não': 'nein',
        'como você está?': 'wie geht es dir?',
        'meu nome é': 'mein name ist'
    },
    'japonês': {
        'olá': 'こんにちは',
        'mundo': '世界',
        'bom dia': 'おはようございます',
        'boa noite': 'おやすみなさい',
        'obrigado': 'ありがとう',
        'por favor': 'お願いします',
        'sim': 'はい',
        'não': 'いいえ',
        'como você está?': '元気ですか？',
        'meu nome é': '私の名前は'
    }
};

// ============ SELECIONA ELEMENTOS DO HTML ============
const inputTexto = document.querySelector('.input-texto');
const selectIdioma = document.querySelector('.idioma-selecao');
const btnTraduzir = document.querySelector('.traduzir');
const btnMicrofone = document.querySelector('.microfone');
const paragrafoTradução = document.querySelector('.traducao');

// ============ FUNÇÃO PRINCIPAL - TRADUZIR TEXTO ============
function traduzirTexto() {
    // Pega o texto digitado e converte para minúsculas
    const textoOriginal = inputTexto.value.toLowerCase().trim();
    
    // Pega o idioma selecionado no select
    const idiomaSelecionado = selectIdioma.value;
    
    // Valida se há texto para traduzir
    if (textoOriginal === '') {
        paragrafoTradução.textContent = 'Por favor, digite algo para traduzir!';
        return;
    }
    
    // Procura a tradução no dicionário
    const traducao = dicionario[idiomaSelecionado][textoOriginal];
    
    // Se encontrou a tradução, exibe. Se não, mostra mensagem
    if (traducao) {
        paragrafoTradução.textContent = traducao;
    } else {
        paragrafoTradução.textContent = 'Tradução não encontrada. Tente: "olá", "mundo", "obrigado", etc.';
    }
}

// ============ FUNÇÃO - RECONHECIMENTO DE VOZ ============
function usarMicrofone() {
    // Verifica se o navegador suporta reconhecimento de voz
    const reconhecimento = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!reconhecimento) {
        alert('Seu navegador não suporta reconhecimento de voz!');
        return;
    }
    
    // Cria uma instância do reconhecimento de voz
    const speech = new reconhecimento();
    
    // Configura para português
    speech.lang = 'pt-BR';
    
    // Inicia o reconhecimento
    speech.start();
    btnMicrofone.textContent = '🎤 Ouvindo...';
    
    // Quando o reconhecimento termina
    speech.onend = () => {
        btnMicrofone.textContent = '🎤';
    };
    
    // Quando consegue reconhecer a voz
    speech.onresult = (event) => {
        // Pega o texto reconhecido
        const textoFalado = event.results[0][0].transcript;
        
        // Insere o texto no textarea
        inputTexto.value = textoFalado;
        
        // Traduz automaticamente
        traduzirTexto();
    };
    
    // Se houver erro no reconhecimento
    speech.onerror = (event) => {
        alert('Erro no reconhecimento de voz: ' + event.error);
        btnMicrofone.textContent = '🎤';
    };
}

// ============ ADICIONA EVENTOS AOS BOTÕES ============
// Traduz quando clica no botão "Traduzir"
btnTraduzir.addEventListener('click', traduzirTexto);

// Traduz também ao apertar ENTER no textarea
inputTexto.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        traduzirTexto();
    }
});

// Ativa o microfone ao clicar
btnMicrofone.addEventListener('click', usarMicrofone);
