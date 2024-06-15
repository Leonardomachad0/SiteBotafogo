import { hex_sha256 } from './sha256.mjs';

// Verificar o hash gerado para "UMASENHA"
const senhaHashGerado = hex_sha256("UMASENHA");
console.log('Hash gerado para "UMASENHA":', senhaHashGerado);

const senhaHashArmazenada = 'db36f96abf366f9e28583fe898ce814e4bc480102aa2e276eec4a28227588704';

window.entrar = function() {
    const senhaDigitada = document.getElementById('senha').value;
    const hashDigitado = hex_sha256(senhaDigitada);

    // Adicionando logs para depuração
    console.log('Senha digitada:', senhaDigitada);
    console.log('Hash da senha digitada:', hashDigitado);
    console.log('Hash armazenado:', senhaHashArmazenada);

    const mensagem = document.getElementById('mensagem');

    if (hashDigitado === senhaHashArmazenada) {
        console.log('Senha correta!');
        localStorage.setItem('auth', 'true'); // Set authentication flag
        window.location.href = 'detalhes.html';
    } else {
        console.log('Senha incorreta!');
        mensagem.textContent = 'Senha incorreta!';
        mensagem.style.color = 'red';
    }
};
