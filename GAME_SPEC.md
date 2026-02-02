# School Champions Battle - Game Specification

## Overview
A Jackbox-style tournament game where four grade levels (Seniors, Juniors, Sophomores, Freshmen) draft teachers, compete in bracket-style battles, and crown a champion based on funny prompts and crowd voting.

## Technology Stack
- Vanilla HTML/CSS/JavaScript
- No frameworks or libraries
- Single-page application
- Designed for full-screen projector display

## Game Flow

### Phase 1: Draft (Snake Draft)
**Objective:** Each grade drafts 5 teachers from a pool of 20

**UI Layout:**
- Top: Current drafter indicator showing which grade's turn (e.g., "SENIORS - Pick your champion!")
- Center: Grid of 20 teacher icons/cards displayed randomly from master list
- Bottom: Draft status showing each grade's current roster count (0/5, 1/5, etc.)

**Draft Order:**
1. Round 1: Seniors → Juniors → Sophomores → Freshmen
2. Round 2: Freshmen → Sophomores → Juniors → Seniors (snake reverses)
3. Round 3: Seniors → Juniors → Sophomores → Freshmen
4. Round 4: Freshmen → Sophomores → Juniors → Seniors
5. Round 5: Seniors → Juniors → Sophomores → Freshmen

**Mechanics:**
- Teacher cards are clickable only during active grade's turn
- Once clicked, teacher is immediately assigned to that grade
- Teacher card becomes unavailable (grayed out/hidden)
- Draft status updates to show teacher added to grade's roster
- Automatically advances to next grade's turn
- Draft completes when all 20 teachers are picked (each grade has 5)

**Visual Feedback:**
- Highlight current drafter's section
- Show visual confirmation when teacher is selected
- Display each grade's growing roster in real-time

---

### Phase 2: Bracket Setup
**Objective:** Display tournament bracket and prepare for semifinals

**Bracket Structure:**
```
Semifinal 1: SENIORS vs FRESHMEN
Semifinal 2: JUNIORS vs SOPHOMORES
             ↓           ↓
         CHAMPIONSHIP ROUND
                ↓
             WINNER
```

**UI Layout:**
- Clean bracket visualization
- Show each matchup clearly
- Display grade names and their 5 teachers under each team
- "Start Tournament" button to begin battles

---

### Phase 3: Game/Battle Rounds
**Objective:** Teams compete in 3-round matches using funny prompts

**Match Structure:**
- Semifinal 1: Best of 3 rounds (first to 2 points or whoever has more after 3 rounds)
- Semifinal 2: Best of 3 rounds
- Championship: Best of 3 rounds

**Round Flow for Each Battle:**

#### Step 1: Prompt Reveal
- Display random prompt from list (see Prompts section)
- Large, centered text with animation
- Examples: "Champion of Dad Jokes", "Champion of Coffee Addiction"

#### Step 2: Team 1 Champion Selection
- Show Grade 1's 5 teacher roster
- Rep clicks on their chosen champion
- Selected teacher is highlighted/locked in
- "Confirm Selection" button

#### Step 3: Team 2 Champion Selection
- Show Grade 2's 5 teacher roster
- Rep clicks on their chosen champion
- Selected teacher is highlighted/locked in
- "Confirm Selection" button

#### Step 4: Face-Off Display
- Two selected teacher icons/names displayed large
- VS indicator between them
- Prompt displayed at top
- Layout: `[Teacher 1] <-- VS --> [Teacher 2]`

#### Step 5: Crowd Vote / President Decision
- President uses crowd reaction to gauge winner
- Two large buttons: "Left Wins!" and "Right Wins!"
- Clicking assigns 1 point to winning team
- Dramatic visual feedback for winner

#### Step 6: Score Update
- Display current match score (e.g., "Seniors: 2 - Freshmen: 1")
- If match not over (less than 3 rounds or no team has 2 points), return to Step 1
- If match complete, show match winner and advance to next match

---

### Phase 4: Ending/Victory
**Objective:** Celebrate the winning grade

**UI Display:**
- Full screen celebration
- Confetti animation falling from top
- Large text: "[WINNING GRADE] ARE THE CHAMPIONS!"
- Trophy emoji/icon
- List of the winning team's 5 teachers
- "Play Again" button to restart

---

## Data Structures

### Master Teacher List (40 teachers minimum)
```javascript
const masterTeacherList = [
  "Mr. Anderson", "Ms. Baker", "Dr. Chen", "Mrs. Davis",
  "Mr. Evans", "Ms. Foster", "Dr. Garcia", "Mrs. Harris",
  "Mr. Ibrahim", "Ms. Jackson", "Dr. Kim", "Mrs. Lopez",
  "Mr. Martin", "Ms. Nelson", "Dr. O'Brien", "Mrs. Patel",
  "Mr. Quinn", "Ms. Roberts", "Dr. Smith", "Mrs. Taylor",
  "Mr. Underwood", "Ms. Vaughn", "Dr. Williams", "Mrs. Xavier",
  "Mr. Young", "Ms. Zhang", "Dr. Adams", "Mrs. Brown",
  "Mr. Clark", "Ms. Dixon", "Dr. Ellis", "Mrs. Fisher",
  "Mr. Gray", "Ms. Hunt", "Dr. Irvine", "Mrs. Jensen",
  "Mr. Kelly", "Ms. Lee", "Dr. Moore", "Mrs. Nash"
];
```

### Game State Object
```javascript
const gameState = {
  phase: 'draft', // 'draft', 'bracket', 'semifinal1', 'semifinal2', 'championship', 'ending'
  
  // Draft phase
  draftPool: [], // 20 randomly selected teachers
  draftOrder: [], // Array of grade names in pick order
  currentDraftIndex: 0,
  
  // Team rosters
  rosters: {
    Seniors: [],
    Juniors: [],
    Sophomores: [],
    Freshmen: []
  },
  
  // Current match
  currentMatch: {
    team1: '',
    team2: '',
    scores: { team1: 0, team2: 0 },
    roundNumber: 0,
    team1Champion: null,
    team2Champion: null,
    currentPrompt: ''
  },
  
  // Tournament results
  semifinal1Winner: null,
  semifinal2Winner: null,
  tournamentWinner: null
};
```

### Prompts List (15 prompts)
```javascript
const prompts = [
  "Champion of Dad Jokes",
  "Champion of Coffee Addiction ☕",
  "Champion of Showing Up Late",
  "Champion of Losing Their Keys 🔑",
  "Champion of Forgetting Students' Names",
  "Champion of Wearing the Same Outfit",
  "Champion of Epic Tangents",
  "Champion of Snack Stashing 🍿",
  "Champion of Technology Struggles 💻",
  "Champion of Awkward Dance Moves 🕺",
  "Champion of Motivational Speeches 💪",
  "Champion of Crazy Stories",
  "Champion of Bad Handwriting ✍️",
  "Champion of Pop Culture References 🎬",
  "Champion of Strict Grading"
];
```

---

## UI/UX Requirements

### Visual Design
- **Color Scheme:**
  - Seniors: Gold (#FFD700)
  - Juniors: Silver (#C0C0C0)
  - Sophomores: Bronze (#CD7F32)
  - Freshmen: Green (#00C853)
  - Background: Deep purple gradient (#667eea to #764ba2)
  - Accent: Hot pink (#f5576c)

- **Typography:**
  - Headings: Bold, 3-4em size
  - Body: 1.5-2em for readability at distance
  - High contrast white text on colored backgrounds

- **Layout:**
  - Full viewport width/height
  - Centered content
  - Large touch targets (buttons min 60px height)
  - Grid systems for teacher cards

### Animations
- Card selection: Scale up 1.1x with border highlight
- Winner reveal: Pulse animation + confetti
- Phase transitions: Smooth fade in/out
- Score updates: Number count-up animation

### Teacher Cards
- **Size:** ~150px x 150px minimum
- **Design:**
  - Rounded corners (15px border-radius)
  - White background with colored border
  - Teacher name centered
  - Optional: Icon or initial avatar
  - Hover state: Slight elevation shadow
  - Selected state: Thick colored border matching grade
  - Disabled state: 50% opacity, no pointer events

### Responsive Behavior
- Designed for 1920x1080 projector resolution
- Scale appropriately for larger displays
- Grid layout adjusts for different screen ratios

---

## State Management

### Phase Transitions
1. **Draft → Bracket:** When all 20 teachers drafted
2. **Bracket → Semifinal 1:** When "Start Tournament" clicked
3. **Semifinal 1 → Semifinal 2:** When team reaches 2 points or 3 rounds complete
4. **Semifinal 2 → Championship:** When team reaches 2 points or 3 rounds complete
5. **Championship → Ending:** When team reaches 2 points or 3 rounds complete

### Key Functions Needed
```javascript
// Draft Phase
function initializeDraft() { }
function selectTeacher(teacherName) { }
function advanceDraft() { }

// Bracket Phase
function displayBracket() { }
function startTournament() { }

// Game Phase
function startMatch(team1, team2) { }
function revealPrompt() { }
function selectChampion(team, teacher) { }
function confirmChampions() { }
function declareRoundWinner(winner) { }
function updateMatchScore() { }
function checkMatchComplete() { }

// Ending Phase
function displayWinner() { }
function triggerConfetti() { }
function resetGame() { }

// Utility
function shuffleArray(array) { }
function getRandomPrompt() { }
```

---

## Technical Implementation Notes

### HTML Structure
```html
<!-- Main container -->
<div id="app">
  <!-- Draft Phase -->
  <div id="draft-phase" class="phase">
    <div class="draft-indicator"></div>
    <div class="teacher-grid"></div>
    <div class="roster-status"></div>
  </div>
  
  <!-- Bracket Phase -->
  <div id="bracket-phase" class="phase hidden">
    <div class="bracket-display"></div>
    <button id="start-tournament">Start Tournament</button>
  </div>
  
  <!-- Game Phase -->
  <div id="game-phase" class="phase hidden">
    <div class="prompt-display"></div>
    <div class="match-score"></div>
    <div class="selection-area"></div>
    <div class="face-off"></div>
    <div class="voting-controls"></div>
  </div>
  
  <!-- Ending Phase -->
  <div id="ending-phase" class="phase hidden">
    <div class="winner-announcement"></div>
    <div class="winner-roster"></div>
    <button id="play-again">Play Again</button>
  </div>
</div>
```

### CSS Classes Strategy
- `.phase` - Base class for all game phases
- `.hidden` - Display none utility
- `.active` - Highlight/active state
- `.disabled` - Disabled/unavailable state
- `.selected` - Selected item state
- `.winner` - Winner celebration styles

### Event Handling
- Click handlers on teacher cards
- Button click handlers for confirmations and voting
- Keyboard support for accessibility (optional but nice)
- Prevent rapid clicking during animations

### Data Persistence
- No localStorage needed (single session game)
- All state in memory via gameState object
- Game resets completely on "Play Again"

---

## Testing Checklist

### Draft Phase
- [ ] 20 random teachers displayed
- [ ] Draft order follows snake pattern correctly
- [ ] Teacher can only be picked once
- [ ] Each grade ends with exactly 5 teachers
- [ ] Visual feedback clear for current drafter

### Bracket Phase
- [ ] Correct matchups displayed (Seniors v Freshmen, Juniors v Sophomores)
- [ ] Each team's roster shown correctly
- [ ] Start button transitions to first match

### Game Phase
- [ ] Random prompt displays each round
- [ ] Both teams can select champions from their roster
- [ ] Face-off displays correctly
- [ ] Voting assigns points correctly
- [ ] Score updates after each round
- [ ] Match ends at 2 points or after 3 rounds
- [ ] Winner advances to next match

### Ending Phase
- [ ] Correct winner displayed
- [ ] Confetti animation plays
- [ ] Winner's 5 teachers listed
- [ ] Play Again button resets game completely

---

## File Structure
```
school-champions-battle/
├── index.html          # Main HTML structure
├── styles.css          # All styling
├── script.js          # Game logic and state management
└── README.md          # Setup and usage instructions
```

---

## Additional Features (Nice to Have)
- Sound effects for selections and wins
- Animated transition between phases
- Timer for selections (optional pressure)
- Undo last pick in draft (before confirming)
- Save bracket results for replay
- Custom teacher names input before draft

---

## Game Balance Notes
- Each match is best of 3 rounds (first to 2 points wins)
- If tied 1-1 after 2 rounds, round 3 is decisive
- All prompts equally weighted (random selection)
- No teacher can be used twice in same match (each teacher can only be selected once per match)

---

## Accessibility Considerations
- High contrast text and backgrounds
- Large click targets for easy selection
- Clear visual state indicators
- Announce phase changes clearly
- Keyboard navigation support (if time permits)

---

## Performance Optimization
- Minimize DOM reflows
- Use CSS transforms for animations (hardware accelerated)
- Event delegation for teacher card clicks
- Debounce rapid button clicks

---

## Launch Checklist
- [ ] Test complete game flow from start to finish
- [ ] Verify all 20 teachers are unique in draft pool
- [ ] Check bracket matchups are correct
- [ ] Test winner determination logic
- [ ] Ensure confetti animation works
- [ ] Verify responsive design on target display
- [ ] Test "Play Again" fully resets game state

---

## Quick Start Guide for Claude Code

1. **Initialize Project:**
   - Create `index.html`, `styles.css`, `script.js`
   - Set up basic HTML structure with phase containers

2. **Implement Draft Phase First:**
   - Create teacher card grid
   - Implement draft order logic
   - Handle teacher selection and roster building

3. **Build Bracket Display:**
   - Create bracket visualization
   - Transition from draft to bracket

4. **Implement Game Loop:**
   - Prompt selection
   - Champion selection UI
   - Face-off display
   - Voting and scoring

5. **Add Ending Celebration:**
   - Winner display
   - Confetti animation
   - Reset functionality

6. **Polish & Test:**
   - Add animations and transitions
   - Test full tournament flow
   - Refine visual design

---

**Target Development Time:** 1 hour
**Priority:** Functional core game loop > Visual polish > Extra features
