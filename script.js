// Initial health values
let playerHealth = 100;
let opponentHealth = 100;

// Attack function to handle moves
function attack(attacker, move) {
    let damage;
    let logMessage = '';
    
    if (attacker === 'player') {
        switch (move) {
            case 'quickAttack':
                damage = 15;
                logMessage = "Pikachu used Quick Attack!";
                break;
            case 'thunderbolt':
                damage = 25;
                logMessage = "Pikachu used Thunderbolt!";
                break;
            case 'ironTail':
                damage = 20;
                logMessage = "Pikachu used Iron Tail!";
                break;
        }
        opponentHealth -= damage;
    } else if (attacker === 'opponent') {
        switch (move) {
            case 'scratch':
                damage = 10;
                logMessage = "Charmander used Scratch!";
                break;
            case 'flamethrower':
                damage = 30;
                logMessage = "Charmander used Flamethrower!";
                break;
            case 'ember':
                damage = 20;
                logMessage = "Charmander used Ember!";
                break;
        }
        playerHealth -= damage;
    }

    // Update health bars and log
    updateHealthBars();
    logBattleAction(logMessage);
}

// Heal function to heal the specific Pokémon
function heal(pokemon) {
    let healAmount = 20;
    if (pokemon === 'player') {
        playerHealth = Math.min(playerHealth + healAmount, 100); // max health is 100
    } else if (pokemon === 'opponent') {
        opponentHealth = Math.min(opponentHealth + healAmount, 100); // max health is 100
    }

    updateHealthBars();
    logBattleAction(`${pokemon === 'player' ? 'Pikachu' : 'Charmander'} healed for ${healAmount} HP!`);
}

// Update health bars for both Pokémon
function updateHealthBars() {
    document.getElementById('player-health').style.width = playerHealth + '%';
    document.getElementById('player-health').innerText = playerHealth + '%';

    document.getElementById('opponent-health').style.width = opponentHealth + '%';
    document.getElementById('opponent-health').innerText = opponentHealth + '%';
    
    // Add knockout effect if health is 0
    if (playerHealth <= 0) {
        playerHealth = 0;
        document.getElementById('pikachu-img').classList.add('knocked-out');
        logBattleAction("Pikachu fainted!");
        disableButtons('player'); // Disable player's buttons
    }
    
    if (opponentHealth <= 0) {
        opponentHealth = 0;
        document.getElementById('charmander-img').classList.add('knocked-out');
        logBattleAction("Charmander fainted!");
        disableButtons('opponent'); // Disable opponent's buttons
    }
}

// Function to disable buttons
function disableButtons(pokemon) {
    if (pokemon === 'player') {
        const playerButtons = document.querySelectorAll('#player1 .btn');
        playerButtons.forEach(button => button.disabled = true);
    } else {
        const opponentButtons = document.querySelectorAll('#player2 .btn');
        opponentButtons.forEach(button => button.disabled = true);
    }
}

// Function to log actions in the battle log
function logBattleAction(message) {
    const log = document.getElementById('battle-log');
    log.innerHTML += `<p>${message}</p>`;
    log.scrollTop = log.scrollHeight; // Auto-scroll to the latest log
}
