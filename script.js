// ===== GAME CONSTANTS =====
const GRADES = ['Seniors', 'Juniors', 'Sophomores', 'Freshmen'];
const GRADE_COLORS = {
  'Seniors': '#FFD700',
  'Juniors': '#C0C0C0',
  'Sophomores': '#CD7F32',
  'Freshmen': '#00C853'
};

const PROMPTS = [
  "Most likely to be the harshest grader",
  "Most likely to be the loudest teacher",
  "Most likely to go on a tangent and forget the original point",
  "Most likely to be mistaken for a student",
  "Most likely to be the most out of pocket teacher",
  "Most likely to punch a colleague",
  "Most likely to skip a school meeting",
  "Most likely to be the best dorm parent",
  "Most likely to fail a drug test",
  "Most likely to check too much during Intervis",
  "Most likely to be a part of the CIA",
  "Most likely to take contraband for themselves",
  "Most likely to go bald"
];

// ===== GAME STATE =====
const gameState = {
  phase: 'draft', // 'draft', 'bracket', 'semifinal1', 'semifinal2', 'championship', 'ending'

  // Draft phase
  draftPool: [],
  draftOrder: [],
  currentDraftIndex: 0,

  // Team rosters
  rosters: {
    Seniors: [],
    Juniors: [],
    Sophomores: [],
    Freshmen: []
  },

  // Global tournament tracking
  usedPrompts: [], // Track prompts used across entire tournament

  // Current match
  currentMatch: {
    team1: '',
    team2: '',
    scores: { team1: 0, team2: 0 },
    roundNumber: 0,
    team1Champion: null,
    team2Champion: null,
    currentPrompt: '',
    usedTeachers: { team1: [], team2: [] }
  },

  // Tournament results
  semifinal1Winner: null,
  semifinal2Winner: null,
  tournamentWinner: null
};

// ===== UTILITY FUNCTIONS =====
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getRandomPrompt() {
  const availablePrompts = PROMPTS.filter(p => !gameState.usedPrompts.includes(p));
  if (availablePrompts.length === 0) {
    // If all prompts have been used, reset and start over
    gameState.usedPrompts = [];
    const prompt = PROMPTS[Math.floor(Math.random() * PROMPTS.length)];
    gameState.usedPrompts.push(prompt);
    return prompt;
  }
  const prompt = availablePrompts[Math.floor(Math.random() * availablePrompts.length)];
  gameState.usedPrompts.push(prompt);
  return prompt;
}

function showPhase(phaseName) {
  document.querySelectorAll('.phase').forEach(phase => {
    phase.classList.add('hidden');
  });
  document.getElementById(`${phaseName}-phase`).classList.remove('hidden');
}

function hideElement(id) {
  document.getElementById(id).classList.add('hidden');
}

function showElement(id) {
  document.getElementById(id).classList.remove('hidden');
}

// ===== DRAFT PHASE =====
function initializeDraft() {
  // Select 20 random teachers from the pool
  gameState.draftPool = shuffleArray(allTeachers).slice(0, 20);

  renderDraftUI();
  
  // Start automatic draft after a brief delay
  setTimeout(() => {
    startAutomaticDraft();
  }, 1000);
}

function renderDraftUI() {
  const grid = document.getElementById('teacher-grid');
  grid.innerHTML = '';

  gameState.draftPool.forEach((teacher, index) => {
    const card = document.createElement('div');
    card.className = 'teacher-card';
    card.dataset.index = index;
    card.dataset.teacherName = teacher.name; // Add teacher name for easy identification

    card.innerHTML = `
      <img src="${teacher.photo}" alt="${teacher.name}" />
      <div class="teacher-name">${teacher.name}</div>
    `;

    grid.appendChild(card);
  });
}

// Automatic Draft Animation
async function startAutomaticDraft() {
  const grades = ['Seniors', 'Juniors', 'Sophomores', 'Freshmen'];
  const indicator = document.getElementById('draft-indicator');
  
  // Create a floating selection display area
  let selectionDisplay = document.createElement('div');
  selectionDisplay.id = 'floating-selection';
  selectionDisplay.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.95);
    border: 4px solid #DC143C;
    border-radius: 20px;
    padding: 40px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    z-index: 1000;
    min-width: 600px;
    box-shadow: 0 0 50px rgba(220, 20, 60, 0.7);
  `;
  document.body.appendChild(selectionDisplay);

  for (const grade of grades) {
    // Show grade name
    indicator.innerHTML = `<span style="color: ${GRADE_COLORS[grade]}">${grade.toUpperCase()}</span> - DRAFTING...`;
    indicator.style.borderColor = GRADE_COLORS[grade];
    
    selectionDisplay.innerHTML = `
      <h2 style="color: ${GRADE_COLORS[grade]}; font-size: 3em; margin: 0;">${grade}</h2>
      <div id="temp-selections" style="display: flex; gap: 15px; flex-wrap: wrap; justify-content: center;"></div>
    `;
    
    const tempSelections = document.getElementById('temp-selections');
    
    // Pick 5 random teachers for this grade
    const availableTeachers = gameState.draftPool.filter(t => !t.drafted);
    const selectedTeachers = [];
    
    for (let i = 0; i < 5 && availableTeachers.length > 0; i++) {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      // Pick random teacher
      const randomIndex = Math.floor(Math.random() * availableTeachers.length);
      const teacher = availableTeachers[randomIndex];
      teacher.drafted = true;
      selectedTeachers.push(teacher);
      
      // Find and gray out the card by teacher name
      const cards = document.querySelectorAll('.teacher-card');
      cards.forEach(card => {
        if (card.dataset.teacherName === teacher.name) {
          card.classList.add('disabled');
          card.style.animation = 'pulse 0.5s ease';
        }
      });
      
      // Add to floating display with animation
      const tempCard = document.createElement('div');
      tempCard.style.cssText = `
        background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
        border: 3px solid ${GRADE_COLORS[grade]};
        border-radius: 15px;
        padding: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
        animation: slideIn 0.5s ease;
        box-shadow: 0 4px 20px rgba(220, 20, 60, 0.5);
      `;
      tempCard.innerHTML = `
        <img src="${teacher.photo}" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; border: 3px solid ${GRADE_COLORS[grade]};" />
        <div style="color: white; font-weight: bold; margin-top: 10px; text-align: center; font-size: 0.9em;">${teacher.name}</div>
      `;
      tempSelections.appendChild(tempCard);
      
      // Remove from available
      availableTeachers.splice(randomIndex, 1);
    }
    
    // Add to roster
    gameState.rosters[grade] = selectedTeachers;
    
    // Wait a moment to show the selections
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Animate to bottom roster
    selectionDisplay.style.transition = 'all 0.8s ease';
    selectionDisplay.style.transform = 'translate(-50%, 100vh)';
    selectionDisplay.style.opacity = '0';
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Update roster display at bottom
    updateRosterDisplay(grade);
    
    // Reset floating display for next grade
    selectionDisplay.style.transition = 'none';
    selectionDisplay.style.transform = 'translate(-50%, -50%)';
    selectionDisplay.style.opacity = '1';
  }
  
  // Remove floating display
  selectionDisplay.remove();
  
  // Transition to bracket
  indicator.innerHTML = 'DRAFT COMPLETE!';
  await new Promise(resolve => setTimeout(resolve, 1500));
  transitionToBracket();
}

function updateRosterDisplay(grade) {
  const rosterItem = document.querySelector(`.roster-item[data-grade="${grade}"]`);
  const count = rosterItem.querySelector('.roster-count');
  const teachersList = rosterItem.querySelector('.roster-teachers');

  const roster = gameState.rosters[grade];
  count.textContent = `${roster.length}/5`;

  teachersList.innerHTML = '';
  roster.forEach(teacher => {
    const div = document.createElement('div');
    div.textContent = teacher.name;
    teachersList.appendChild(div);
  });
}

// ===== BRACKET PHASE =====
function transitionToBracket() {
  gameState.phase = 'bracket';
  showPhase('bracket');
  renderBracket();
}

function renderBracket() {
  // Render Semifinal 1: Seniors vs Freshmen
  renderBracketTeam('Seniors');
  renderBracketTeam('Freshmen');

  // Render Semifinal 2: Juniors vs Sophomores
  renderBracketTeam('Juniors');
  renderBracketTeam('Sophomores');
}

function renderBracketTeam(grade) {
  const teamDiv = document.querySelector(`.bracket-team[data-grade="${grade}"]`);
  const rosterDiv = teamDiv.querySelector('.bracket-roster');

  rosterDiv.innerHTML = '';
  gameState.rosters[grade].forEach(teacher => {
    const item = document.createElement('div');
    item.className = 'bracket-roster-item';
    item.innerHTML = `
      <img src="${teacher.photo}" alt="${teacher.name}" />
      <span>${teacher.name}</span>
    `;
    rosterDiv.appendChild(item);
  });
}

document.getElementById('start-tournament').addEventListener('click', () => {
  startMatch('Seniors', 'Freshmen', 'semifinal1');
});

// ===== GAME/BATTLE PHASE =====
let currentGameStep = ''; // Track which step we're on

function startMatch(team1, team2, matchType) {
  gameState.phase = matchType;
  gameState.currentMatch = {
    team1,
    team2,
    scores: { team1: 0, team2: 0 },
    roundNumber: 0,
    team1Champion: null,
    team2Champion: null,
    currentPrompt: '',
    usedTeachers: { team1: [], team2: [] }
  };

  showPhase('game');
  updateMatchHeader();

  // Hide all game sub-sections
  hideAllGameScreens();

  startNewRound();
}

function hideAllGameScreens() {
  document.querySelectorAll('.game-screen').forEach(screen => {
    screen.classList.add('hidden');
  });
}

function showGameScreen(screenId) {
  hideAllGameScreens();
  document.getElementById(screenId).classList.remove('hidden');
}

function updateMatchHeader() {
  const { team1, team2 } = gameState.currentMatch;
  document.getElementById('match-title').innerHTML =
    `<span style="color: ${GRADE_COLORS[team1]}">${team1}</span> vs <span style="color: ${GRADE_COLORS[team2]}">${team2}</span>`;
  // Hide score for single-round matches
  document.getElementById('match-score').style.display = 'none';
}

function startNewRound() {
  gameState.currentMatch.roundNumber++;
  gameState.currentMatch.currentPrompt = getRandomPrompt();

  // Reset champion selections for new round
  gameState.currentMatch.team1Champion = null;
  gameState.currentMatch.team2Champion = null;

  // Update persistent prompt display at top
  document.getElementById('round-prompt').textContent = gameState.currentMatch.currentPrompt;

  // Show prompt screen
  currentGameStep = 'prompt';
  document.getElementById('current-prompt').textContent = gameState.currentMatch.currentPrompt;
  showGameScreen('prompt-display');

  // Enable continue button for prompt
  enableContinueButton();
}

function showTeam1Selection() {
  currentGameStep = 'team1-selection';

  const { team1 } = gameState.currentMatch;
  document.getElementById('team1-name').innerHTML =
    `<span style="color: ${GRADE_COLORS[team1]}">${team1}</span> - Choose Your Champion`;

  renderSelectionRoster('team1');
  showGameScreen('team1-selection');

  // Disable continue until selection is made
  disableContinueButton();
}

function renderSelectionRoster(team) {
  const teamName = gameState.currentMatch[team === 'team1' ? 'team1' : 'team2'];
  const roster = gameState.rosters[teamName];

  const rosterDiv = document.getElementById(`${team}-roster`);
  rosterDiv.innerHTML = '';

  roster.forEach((teacher, index) => {
    const card = document.createElement('div');
    card.className = 'selection-card';
    card.dataset.index = index;

    card.innerHTML = `
      <img src="${teacher.photo}" alt="${teacher.name}" />
      <div class="teacher-name">${teacher.name}</div>
    `;

    card.addEventListener('click', () => selectChampion(team, index));

    rosterDiv.appendChild(card);
  });
}

function selectChampion(team, teacherIndex) {
  // Remove previous selection
  document.querySelectorAll(`#${team}-roster .selection-card`).forEach(c => {
    c.classList.remove('selected');
  });

  // Mark new selection
  const card = document.querySelector(`#${team}-roster .selection-card[data-index="${teacherIndex}"]`);
  card.classList.add('selected');

  // Store selection
  const teamName = gameState.currentMatch[team === 'team1' ? 'team1' : 'team2'];
  const teacher = gameState.rosters[teamName][teacherIndex];
  gameState.currentMatch[`${team}Champion`] = teacher;

  // Enable continue button
  enableContinueButton();
}

function showTeam2Selection() {
  currentGameStep = 'team2-selection';

  const { team2 } = gameState.currentMatch;
  document.getElementById('team2-name').innerHTML =
    `<span style="color: ${GRADE_COLORS[team2]}">${team2}</span> - Choose Your Champion`;

  renderSelectionRoster('team2');
  showGameScreen('team2-selection');

  // Disable continue until selection is made
  disableContinueButton();
}

function showFaceOff() {
  currentGameStep = 'face-off';

  const { team1, team2, team1Champion, team2Champion } = gameState.currentMatch;

  // Validate champions are selected (prevent null errors)
  if (!team1Champion || !team2Champion) {
    console.error('Champions not selected!');
    return;
  }

  // Set champions
  document.getElementById('champion1-img').src = team1Champion.photo;
  document.getElementById('champion1-name').textContent = team1Champion.name;

  document.getElementById('champion2-img').src = team2Champion.photo;
  document.getElementById('champion2-name').textContent = team2Champion.name;

  // Set vote button labels
  document.getElementById('left-team-name').textContent = team1.toUpperCase();
  document.getElementById('right-team-name').textContent = team2.toUpperCase();

  showGameScreen('face-off');

  // Hide continue button - voting buttons are the action
  disableContinueButton();
  document.getElementById('game-continue').style.display = 'none';
}

document.getElementById('vote-left').addEventListener('click', () => {
  declareRoundWinner('team1');
});

document.getElementById('vote-right').addEventListener('click', () => {
  declareRoundWinner('team2');
});

function declareRoundWinner(winner) {
  currentGameStep = 'round-winner';

  // Update score
  gameState.currentMatch.scores[winner]++;
  updateMatchHeader();

  // Show round winner
  const winnerTeam = gameState.currentMatch[winner === 'team1' ? 'team1' : 'team2'];
  document.getElementById('round-winner-team').innerHTML =
    `<span style="color: ${GRADE_COLORS[winnerTeam]}">${winnerTeam}</span>`;
  document.getElementById('round-winner-team').style.color = GRADE_COLORS[winnerTeam];

  showGameScreen('round-winner');

  // Show and enable continue button
  document.getElementById('game-continue').style.display = 'block';
  enableContinueButton();
}

function showMatchWinner() {
  currentGameStep = 'match-winner';

  const { team1, team2, scores } = gameState.currentMatch;
  const winner = scores.team1 > scores.team2 ? team1 : team2;

  document.getElementById('match-winner-team').textContent = winner;
  document.getElementById('match-winner-team').style.color = GRADE_COLORS[winner];

  // For single-round matches, show "WINS!" instead of score
  document.getElementById('final-match-score').textContent = 'WINS THE MATCH!';

  showGameScreen('match-winner');

  // Store winner
  if (gameState.phase === 'semifinal1') {
    gameState.semifinal1Winner = winner;
  } else if (gameState.phase === 'semifinal2') {
    gameState.semifinal2Winner = winner;
  } else if (gameState.phase === 'championship') {
    gameState.tournamentWinner = winner;
  }

  // Clear prompt display for match transition
  document.getElementById('round-prompt').textContent = '';

  // Show and enable continue button
  document.getElementById('game-continue').style.display = 'block';
  enableContinueButton();
}

// ===== TEACHER STEALING & BRACKET UPDATE =====
function stealRoster(winnerTeam, loserTeam) {
  // Transfer all teachers from loser to winner
  const stolenTeachers = gameState.rosters[loserTeam];
  gameState.rosters[winnerTeam] = [...gameState.rosters[winnerTeam], ...stolenTeachers];

  return stolenTeachers;
}

function showTeacherSteal(winnerTeam, loserTeam) {
  currentGameStep = 'teacher-steal';

  // Set defeated team name
  document.getElementById('defeated-team-name').textContent = loserTeam.toUpperCase();
  document.getElementById('defeated-team-name').style.color = GRADE_COLORS[loserTeam];

  // Get stolen teachers before actually stealing
  const stolenTeachers = gameState.rosters[loserTeam];

  // Create animation
  const animationArea = document.getElementById('steal-animation-area');
  animationArea.innerHTML = '';

  stolenTeachers.forEach((teacher, index) => {
    const img = document.createElement('img');
    img.src = teacher.photo;
    img.className = 'teacher-card-flying';
    img.style.left = `${Math.random() * 80}%`;
    img.style.top = `${Math.random() * 60 + 20}%`;
    img.style.animationDelay = `${index * 0.2}s`;
    animationArea.appendChild(img);
  });

  // Actually steal the roster
  stealRoster(winnerTeam, loserTeam);

  // Show new roster count
  const newCount = gameState.rosters[winnerTeam].length;
  document.getElementById('new-roster-count').innerHTML =
    `<span style="color: ${GRADE_COLORS[winnerTeam]}">${winnerTeam}</span> now has ${newCount} teachers!`;

  showGameScreen('teacher-steal');

  // Auto-advance after animation (3 seconds)
  setTimeout(() => {
    showBracketUpdate();
  }, 3000);
}

function showBracketUpdate() {
  currentGameStep = 'bracket-update';

  // Update Semifinal 1 result
  if (gameState.semifinal1Winner) {
    const loser1 = gameState.semifinal1Winner === 'Seniors' ? 'Freshmen' : 'Seniors';
    document.getElementById('semi1-result').innerHTML = `
      <div class="result-winner" style="color: ${GRADE_COLORS[gameState.semifinal1Winner]}">${gameState.semifinal1Winner} ✓</div>
      <div class="result-loser" style="color: ${GRADE_COLORS[loser1]}">${loser1}</div>
    `;
  }

  // Update Semifinal 2 result
  if (gameState.semifinal2Winner) {
    const loser2 = gameState.semifinal2Winner === 'Juniors' ? 'Sophomores' : 'Juniors';
    document.getElementById('semi2-result').innerHTML = `
      <div class="result-winner" style="color: ${GRADE_COLORS[gameState.semifinal2Winner]}">${gameState.semifinal2Winner} ✓</div>
      <div class="result-loser" style="color: ${GRADE_COLORS[loser2]}">${loser2}</div>
    `;
  }

  // Update championship display
  const champDisplay = document.getElementById('championship-teams');
  if (gameState.semifinal1Winner && gameState.semifinal2Winner) {
    champDisplay.innerHTML = `
      <span style="color: ${GRADE_COLORS[gameState.semifinal1Winner]}">${gameState.semifinal1Winner}</span>
      <span style="color: white; margin: 0 20px;">VS</span>
      <span style="color: ${GRADE_COLORS[gameState.semifinal2Winner]}">${gameState.semifinal2Winner}</span>
    `;
  } else if (gameState.semifinal1Winner) {
    champDisplay.innerHTML = `
      <span style="color: ${GRADE_COLORS[gameState.semifinal1Winner]}">${gameState.semifinal1Winner}</span>
      <span style="color: white; margin: 0 20px;">VS</span>
      <span>???</span>
    `;
  } else {
    champDisplay.textContent = 'TBD';
  }

  showGameScreen('bracket-update');

  // Show and enable continue button
  document.getElementById('game-continue').style.display = 'block';
  enableContinueButton();
}

// ===== ENDING PHASE =====
function showEnding() {
  gameState.phase = 'ending';
  showPhase('ending');

  const winner = gameState.tournamentWinner;
  document.getElementById('tournament-winner').textContent = winner;
  document.getElementById('tournament-winner').style.color = GRADE_COLORS[winner];

  // Display winner's roster
  renderWinnerRoster();

  // Trigger confetti
  triggerConfetti();
}

function renderWinnerRoster() {
  const winner = gameState.tournamentWinner;
  const roster = gameState.rosters[winner];
  const rosterDiv = document.getElementById('winner-roster');

  rosterDiv.innerHTML = '';
  roster.forEach(teacher => {
    const item = document.createElement('div');
    item.className = 'winner-roster-item';
    item.innerHTML = `
      <img src="${teacher.photo}" alt="${teacher.name}" />
      <span>${teacher.name}</span>
    `;
    rosterDiv.appendChild(item);
  });
}

function triggerConfetti() {
  const container = document.querySelector('.confetti-container');
  container.innerHTML = '';

  // Create 100 confetti pieces
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.animationDuration = `${2 + Math.random() * 3}s`;
    confetti.style.animationDelay = `${Math.random() * 2}s`;
    container.appendChild(confetti);
  }
}

document.getElementById('play-again').addEventListener('click', () => {
  resetGame();
});

function resetGame() {
  // Reset state
  gameState.phase = 'draft';
  gameState.rosters = {
    Seniors: [],
    Juniors: [],
    Sophomores: [],
    Freshmen: []
  };
  gameState.currentDraftIndex = 0;
  gameState.usedPrompts = []; // Reset prompts for new tournament
  gameState.semifinal1Winner = null;
  gameState.semifinal2Winner = null;
  gameState.tournamentWinner = null;

  // Clear roster displays
  document.querySelectorAll('.roster-count').forEach(el => el.textContent = '0/5');
  document.querySelectorAll('.roster-teachers').forEach(el => el.innerHTML = '');

  // Restart
  showPhase('draft');
  initializeDraft();
}

// ===== UNIFIED CONTINUE BUTTON HANDLER =====
function enableContinueButton() {
  const btn = document.getElementById('game-continue');
  if (btn) {
    btn.disabled = false;
    btn.style.display = 'block';
  }
}

function disableContinueButton() {
  const btn = document.getElementById('game-continue');
  if (btn) {
    btn.disabled = true;
  }
}

// Single event listener for the one continue button
document.addEventListener('DOMContentLoaded', () => {
  const continueBtn = document.getElementById('game-continue');
  if (continueBtn) {
    continueBtn.addEventListener('click', handleContinue);
  }
});

function handleContinue() {
  const { scores, roundNumber } = gameState.currentMatch;

  switch (currentGameStep) {
    case 'prompt':
      showTeam1Selection();
      break;

    case 'team1-selection':
      // Validate selection before continuing
      if (!gameState.currentMatch.team1Champion) {
        alert('Please select a champion first!');
        return;
      }
      showTeam2Selection();
      break;

    case 'team2-selection':
      // Validate selection before continuing
      if (!gameState.currentMatch.team2Champion) {
        alert('Please select a champion first!');
        return;
      }
      showFaceOff();
      break;

    case 'round-winner':
      // Single round per match - always go to match winner after round
      showMatchWinner();
      break;

    case 'match-winner':
      // Trigger teacher steal animation, then show bracket update
      const { team1, team2, scores: matchScores } = gameState.currentMatch;
      const winner = matchScores.team1 > matchScores.team2 ? team1 : team2;
      const loser = matchScores.team1 > matchScores.team2 ? team2 : team1;

      if (gameState.phase === 'championship') {
        // No stealing for championship, go straight to ending
        showEnding();
      } else {
        // Show steal animation for semifinals
        showTeacherSteal(winner, loser);
      }
      break;

    case 'bracket-update':
      // After bracket update, start next match
      if (gameState.phase === 'semifinal1') {
        startMatch('Juniors', 'Sophomores', 'semifinal2');
      } else if (gameState.phase === 'semifinal2') {
        startMatch(gameState.semifinal1Winner, gameState.semifinal2Winner, 'championship');
      }
      break;

    default:
      console.log('Unknown step:', currentGameStep);
  }
}

// ===== INITIALIZATION =====
window.addEventListener('DOMContentLoaded', () => {
  initializeDraft();
});
