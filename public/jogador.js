// Verificar se o usuário está autenticado
if (!localStorage.getItem('auth')) {
    window.location.href = 'index.html';
}

// Função de logout
function logout() {
    localStorage.removeItem('auth');
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const jogadorId = urlParams.get('id');

    fetch(`https://botafogo-atletas.mange.li/2024-1/${jogadorId}`)
        .then(response => response.json())
        .then(data => {
            const detalhesContainer = document.getElementById('jogador-detalhes');
            detalhesContainer.innerHTML = `
                <div class="player-card">
                    <img src="${data.imagem}" alt="${data.nome}">
                    <div class="player-info">
                        <h3>${data.nome}</h3>
                        <p>Elenco: ${data.elenco}</p>
                        <p>Posição: ${data.posicao}</p>
                        <p>Jogos pelo Botafogo: ${data.n_jogos}</p>
                        <p>Nascimento: ${data.nascimento}</p>
                        <p>Altura: ${data.altura}</p>
                        <p>Naturalidade: ${data.naturalidade}</p>
                        <p>Detalhes: ${data.detalhes}</p>
                    </div>
                </div>
            `;
        })
        .catch(error => console.error('Error fetching player details:', error));

    document.getElementById('voltar').addEventListener('click', () => {
        window.history.back();
    });

    // Adicionar evento de logout
    document.getElementById('logout').addEventListener('click', logout);
});
