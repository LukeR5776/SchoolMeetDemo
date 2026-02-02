# School Champions Battle - Pomfret Edition (Demo Version)

A fast-paced, Jackbox-style tournament game where four grade levels (Seniors, Juniors, Sophomores, Freshmen) are automatically assigned teachers, compete in rapid bracket-style battles, and crown a champion based on funny prompts and crowd voting. Optimized for quick demonstrations and presentations!

## 🎮 How to Play

### Setup
1. Open `index.html` in any modern web browser
2. Display on a projector for the entire audience to see
3. One person (the "President" or game host) controls the mouse/keyboard

### Game Flow

#### Phase 1: Automatic Draft (Animated)
- 20 random teachers from the 71 Pomfret staff are displayed
- **Fully Automatic**: No clicking required! Watch as the game automatically:
  - Shows each grade's name in their signature color
  - Randomly selects 5 teachers for that grade with dramatic animations
  - Grays out selected teachers in the main grid
  - Displays selections in a floating panel
  - Slides the roster down to the bottom display
- The entire draft completes in ~30 seconds with smooth animations
- Each grade gets exactly 5 teachers randomly assigned

#### Phase 2: Tournament Bracket
- Fixed matchups are shown:
  - **Semifinal 1**: Seniors vs Freshmen
  - **Semifinal 2**: Juniors vs Sophomores
- Winners of each semifinal advance to the Championship
- Click "START TOURNAMENT" to begin battles

#### Phase 3: Battle Rounds (Single-Prompt Matches)
Each match is decided by a SINGLE prompt for rapid gameplay:

1. **Prompt Reveal**: A funny prompt appears (e.g., "Most likely to be the harshest grader")
2. **Team 1 Selection**: First team clicks to select their champion teacher
3. **Team 2 Selection**: Second team clicks to select their champion teacher
4. **Face-Off**: Both teachers are displayed side-by-side with the prompt
5. **Crowd Vote**: President gauges crowd reaction and clicks the winning team's button
6. **Match Winner**: Winner advances immediately - no multiple rounds!

**Fast Format**: One prompt per match means the entire tournament completes in minutes!

#### Phase 4: Victory Celebration
- Tournament winner is announced with confetti animation
- The winning team's complete roster is displayed
- Click "PLAY AGAIN" to start a new tournament with a fresh draft

## 🎨 Visual Design

### Color Scheme
- **Background**: Dramatic black to dark red gradient
- **Accents**: Crimson red (#DC143C) with glowing effects
- **Cards**: Black with red borders and shadows
- **Theme**: Bold, high-contrast red and black throughout

### Grade Colors
- **Seniors**: Gold (#FFD700)
- **Juniors**: Silver (#C0C0C0)
- **Sophomores**: Bronze (#CD7F32)
- **Freshmen**: Green (#00C853)

## 📋 Prompts
The game includes 13 hilarious "Most Likely To..." prompts:
- Most likely to be the harshest grader
- Most likely to be the loudest teacher
- Most likely to go on a tangent and forget the original point
- Most likely to be mistaken for a student
- Most likely to be the most out of pocket teacher
- Most likely to punch a colleague
- Most likely to skip a school meeting
- Most likely to be the best dorm parent
- Most likely to fail a drug test
- Most likely to check too much during Intervis
- Most likely to be a part of the CIA
- Most likely to take contraband for themselves
- Most likely to go bald

**Prompt Management**: Prompts never repeat during a single tournament!

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
The game uses actual Pomfret Teachers + Staff photos located in the `Pomfret Teachers + Staff` folder. 71 teachers with existing photos are available, with 20 randomly selected for each draft pool.

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
1. **Demo Mode**: Perfect for quick demonstrations - full game completes in 5-7 minutes!
2. **Projector Setup**: Make sure the display is clearly visible to everyone
3. **Auto Draft**: Let the automatic draft play out - it's part of the show!
4. **Sound Off**: This is a silent game (sound effects optional)
5. **Crowd Engagement**: The host should hype up the crowd before each vote!
6. **Fair Voting**: Host should genuinely gauge crowd reactions for authenticity
7. **Quick Selection**: Teams only have 5 teachers, so champion selection is fast and strategic

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

## 📝 Game Rules Summary (Demo Version)
- Each grade is automatically assigned 5 random teachers
- Matches are decided by a **single prompt** (not multiple rounds)
- Teams can use any of their 5 teachers for selection
- Host decides the winner based on crowd reaction
- Winner of each match advances immediately
- Tournament winner is crowned champion with confetti!
- Total game time: **5-7 minutes** from start to finish

## 🚀 What's New in Demo Version
- **Automatic Draft**: No manual clicking - watch the AI draft teams!
- **Single-Prompt Matches**: Each match decided by one face-off for speed
- **Red & Black Theme**: Bold, dramatic color scheme throughout
- **Faster Gameplay**: Complete tournament in under 10 minutes
- **Optimized Animations**: Smooth transitions and visual effects
- **Streamlined UI**: Removed score tracking for cleaner interface

---

**Developed for Pomfret School - Have Fun!** 🎉
