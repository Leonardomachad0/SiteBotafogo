// Verificar se o usuário está autenticado
if (!localStorage.getItem('auth')) {
    window.location.href = 'index.html';
}

// Função de logout
function logout() {
    localStorage.removeItem('auth');
    window.location.href = 'index.html';
}

async function fetchPlayers(endpoint) {
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const players = await response.json();
        displayPlayers(players);
        window.players = players; // Adiciona os jogadores ao escopo global
    } catch (error) {
        console.error('Error fetching players:', error);
    }
}

function displayPlayers(players) {
    const container = document.getElementById('players-container');
    container.innerHTML = '';

    if (!players || players.length === 0) {
        container.innerHTML = '<p>ATLETA NÃO ENCONTRADO(A).</p>';
        return;
    }

    players.forEach(player => {
        const playerCard = document.createElement('div');
        playerCard.classList.add('player-card');
        playerCard.innerHTML = `
            <img src="${player.imagem}" alt="${player.nome}">
            <h3>${player.nome}</h3>
            <p>${player.posicao}</p>
            <button onclick="window.location.href='jogador.html?id=${player.id}'">Saiba mais</button>
        `;
        container.appendChild(playerCard);
    });
}

document.getElementById('masculino').addEventListener('click', () => fetchPlayers('https://botafogo-atletas.mange.li/2024-1/masculino'));
document.getElementById('feminino').addEventListener('click', () => fetchPlayers('https://botafogo-atletas.mange.li/2024-1/feminino'));
document.getElementById('all').addEventListener('click', () => fetchPlayers('https://botafogo-atletas.mange.li/2024-1/all'));

// Função de filtro
document.getElementById('searchInput').addEventListener('input', (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredPlayers = window.players.filter(player => player.nome.toLowerCase().includes(searchTerm));
    displayPlayers(filteredPlayers);
});

// Load all players by default
fetchPlayers('https://botafogo-atletas.mange.li/2024-1/all');

// Adicionar evento de logout
document.getElementById('logout').addEventListener('click', logout);