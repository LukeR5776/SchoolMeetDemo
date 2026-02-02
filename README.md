# School Champions Battle - Pomfret Edition

A Jackbox-style tournament game where four grade levels (Seniors, Juniors, Sophomores, Freshmen) draft teachers, compete in bracket-style battles, and crown a champion based on funny prompts and crowd voting.

## 🎮 How to Play

### Setup
1. Open `index.html` in any modern web browser
2. Display on a projector for the entire audience to see
3. One person (the "President" or game host) controls the mouse/keyboard

### Game Flow

#### Phase 1: Draft (Snake Draft)
- 20 random teachers from the 87 Pomfret staff are displayed
- Each grade takes turns drafting 5 teachers using a snake draft order:
  - Round 1: Seniors → Juniors → Sophomores → Freshmen
  - Round 2: Freshmen → Sophomores → Juniors → Seniors (reversed!)
  - Round 3: Seniors → Juniors → Sophomores → Freshmen
  - Round 4: Freshmen → Sophomores → Juniors → Seniors (reversed!)
  - Round 5: Seniors → Juniors → Sophomores → Freshmen
- **How to Draft**: Simply click on a teacher card during your grade's turn
- The roster status at the bottom shows each grade's current team

#### Phase 2: Tournament Bracket
- Fixed matchups are shown:
  - **Semifinal 1**: Seniors vs Freshmen
  - **Semifinal 2**: Juniors vs Sophomores
- Winners of each semifinal advance to the Championship
- Click "START TOURNAMENT" to begin battles

#### Phase 3: Battle Rounds
Each match is best of 3 rounds (first to 2 points wins):

1. **Prompt Reveal**: A funny prompt appears (e.g., "Champion of Dad Jokes")
2. **Team Selection**: First team selects which teacher to champion this round
3. **Team 2 Selection**: Second team makes their selection
4. **Face-Off**: Both teachers are displayed with the prompt
5. **Crowd Vote**: President gauges crowd reaction and clicks the winning team
6. **Score Update**: Points are awarded and next round begins
7. Match continues until a team wins 2 rounds (or all 3 rounds are played)

**Important Rule**: Each teacher can only be used ONCE per match!

#### Phase 4: Victory Celebration
- Tournament winner is announced with confetti animation
- The winning team's complete roster is displayed
- Click "PLAY AGAIN" to start a new tournament with a fresh draft

## 🎨 Grade Colors
- **Seniors**: Gold (#FFD700)
- **Juniors**: Silver (#C0C0C0)
- **Sophomores**: Bronze (#CD7F32)
- **Freshmen**: Green (#00C853)

## 📋 Prompts
The game includes 15 hilarious prompts:
- Champion of Dad Jokes
- Champion of Coffee Addiction
- Champion of Showing Up Late
- Champion of Losing Their Keys
- Champion of Forgetting Students' Names
- Champion of Wearing the Same Outfit
- Champion of Epic Tangents
- Champion of Snack Stashing
- Champion of Technology Struggles
- Champion of Awkward Dance Moves
- Champion of Motivational Speeches
- Champion of Crazy Stories
- Champion of Bad Handwriting
- Champion of Pop Culture References
- Champion of Strict Grading

## 🏆 Tournament Structure
```
Semifinal 1: SENIORS vs FRESHMEN
Semifinal 2: JUNIORS vs SOPHOMORES
             ↓           ↓
         CHAMPIONSHIP ROUND
                ↓
             WINNER
```

## 🖼️ Teacher Photos
The game uses actual Pomfret Teachers + Staff photos located in the `Pomfret Teachers + Staff` folder. All 87 teachers are available, with 20 randomly selected for each draft.

## 💻 Technical Details
- **Technology**: Vanilla HTML, CSS, and JavaScript (no frameworks)
- **Display**: Optimized for 1920x1080 projector resolution
- **Browser**: Works in any modern browser (Chrome, Firefox, Safari, Edge)
- **Files**:
  - `index.html` - Main game structure
  - `styles.css` - All styling and animations
  - `script.js` - Game logic and state management
  - `teachers.js` - Teacher data with photos
  - `Pomfret Teachers + Staff/` - Folder containing 87 teacher photos

## 🎯 Tips for Running the Game
1. **Test First**: Run through the game once before presenting to an audience
2. **Projector Setup**: Make sure the display is clearly visible to everyone
3. **Sound Off**: This is a silent game (sound effects optional)
4. **Crowd Engagement**: The President should hype up the crowd before voting!
5. **Fair Voting**: President should genuinely gauge crowd reactions for authenticity
6. **Time Management**: A full game takes approximately 15-20 minutes

## 🔧 Customization
To customize the game:
- **Add/Remove Teachers**: Edit `teachers.js` and update the `Pomfret Teachers + Staff` folder
- **Change Prompts**: Edit the `PROMPTS` array in `script.js`
- **Modify Colors**: Update `GRADE_COLORS` in `script.js` and corresponding CSS
- **Adjust Draft Size**: Change the slice size in `initializeDraft()` function

## 🐛 Troubleshooting
- **Photos not loading**: Ensure the `Pomfret Teachers + Staff` folder is in the same directory as `index.html`
- **Game stuck**: Refresh the page to restart
- **Layout issues**: Ensure browser is in full-screen mode (F11 on most browsers)

## 📝 Game Rules Summary
- Each grade drafts 5 teachers in a snake draft
- Matches are best of 3 rounds
- Each teacher can only be used once per match
- President decides round winners based on crowd reaction
- First team to 2 points wins the match (or best of 3)
- Tournament winner is crowned champion!

---

**Developed for Pomfret School - Have Fun!** 🎉
