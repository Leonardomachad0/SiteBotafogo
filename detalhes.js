document.addEventListener('DOMContentLoaded', () => {
    const masculinoBtn = document.getElementById('masculino');
    const femininoBtn = document.getElementById('feminino');
    const allBtn = document.getElementById('all');
    const searchInput = document.getElementById('searchInput');
    const playersContainer = document.getElementById('players-container');

    // Função para buscar jogadores de um endpoint específico
    function fetchPlayers(endpoint) {
        fetch(endpoint)
            .then(response => response.json())
            .then(data => {
                playersContainer.innerHTML = ''; // Limpa o container
                data.forEach(player => {
                    const playerCard = document.createElement('div');
                    playerCard.className = 'player-card';
                    playerCard.innerHTML = `
                        <img src="${player.imagem}" alt="${player.nome}">
                        <h3>${player.nome}</h3>
                        <p>Posição: ${player.posicao}</p>
                        <p>Jogos: ${player.n_jogos}</p>
                        <button onclick="verDetalhes('${player.id}')">Ver Detalhes</button>
                    `;
                    playersContainer.appendChild(playerCard);
                });
            })
            .catch(error => console.error('Erro ao buscar jogadores:', error));
    }

    // Função para exibir os detalhes de um jogador
    window.verDetalhes = function(id) {
        window.location.href = `jogador.html?id=${id}`;
    }

    // Função para logout
    function logout() {
        localStorage.removeItem('auth');
        window.location.href = 'index.html';
    }

    document.getElementById('logout').addEventListener('click', logout);

    // Event listeners para os botões de filtro
    masculinoBtn.addEventListener('click', () => fetchPlayers('https://botafogo-atletas.mange.li/2024-1/masculino'));
    femininoBtn.addEventListener('click', () => fetchPlayers('https://botafogo-atletas.mange.li/2024-1/feminino'));
    allBtn.addEventListener('click', () => fetchPlayers('https://botafogo-atletas.mange.li/2024-1/all'));

    // Event listener para a barra de pesquisa
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const players = document.querySelectorAll('.player-card');
        players.forEach(player => {
            const playerName = player.querySelector('h3').textContent.toLowerCase();
            if (playerName.includes(query)) {
                player.style.display = '';
            } else {
                player.style.display = 'none';
            }
        });
    });

    // Carregar elenco completo por padrão
    fetchPlayers('https://botafogo-atletas.mange.li/2024-1/all');
});
