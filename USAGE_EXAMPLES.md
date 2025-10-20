# PWA Builder - Usage Examples

Real-world examples of apps you can build with PWA Builder.

## 1. Simple Note-Taking App

**Use Case**: Offline note-taking app with localStorage

**Key Files to Edit**:

**`index.html`:**
```html
<main>
    <h1>My Notes</h1>
    <textarea id="noteInput" placeholder="Write your note..."></textarea>
    <button id="saveBtn">Save Note</button>
    <div id="notesList"></div>
</main>
```

**`js/app.js`:**
```javascript
const noteInput = document.getElementById('noteInput');
const saveBtn = document.getElementById('saveBtn');
const notesList = document.getElementById('notesList');

// Load notes on startup
let notes = JSON.parse(localStorage.getItem('notes') || '[]');
renderNotes();

saveBtn.addEventListener('click', () => {
    const note = {
        id: Date.now(),
        text: noteInput.value,
        date: new Date().toLocaleString()
    };
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
    noteInput.value = '';
    renderNotes();
});

function renderNotes() {
    notesList.innerHTML = notes.map(note => `
        <div class="note">
            <p>${note.text}</p>
            <small>${note.date}</small>
            <button onclick="deleteNote(${note.id})">Delete</button>
        </div>
    `).join('');
}

function deleteNote(id) {
    notes = notes.filter(n => n.id !== id);
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes();
}
```

**Build**: `npm run build`

---

## 2. Photo Diary (with Camera)

**Use Case**: Take photos and add captions

**`build-config.json`:**
```json
{
  "appName": "Photo Diary",
  "appId": "com.yourname.photodiary",
  "plugins": {
    "camera": {
      "enabled": true
    }
  }
}
```

**`index.html`:**
```html
<main>
    <h1>Photo Diary</h1>
    <button id="takePhotoBtn">Take Photo</button>
    <div id="photoGallery"></div>
</main>
```

**`js/app.js`:**
```javascript
let photos = JSON.parse(localStorage.getItem('photos') || '[]');

document.getElementById('takePhotoBtn').addEventListener('click', async () => {
    if (window.Capacitor) {
        const photo = await Capacitor.Plugins.Camera.getPhoto({
            quality: 90,
            resultType: 'DataUrl'
        });

        const caption = prompt('Add a caption:');
        photos.push({
            id: Date.now(),
            image: photo.dataUrl,
            caption: caption || '',
            date: new Date().toLocaleString()
        });

        localStorage.setItem('photos', JSON.stringify(photos));
        renderGallery();
    }
});

function renderGallery() {
    const gallery = document.getElementById('photoGallery');
    gallery.innerHTML = photos.map(photo => `
        <div class="photo">
            <img src="${photo.image}" alt="${photo.caption}">
            <p>${photo.caption}</p>
            <small>${photo.date}</small>
        </div>
    `).join('');
}

renderGallery();
```

---

## 3. Habit Tracker with Notifications

**Use Case**: Track daily habits with reminders

**`build-config.json`:**
```json
{
  "appName": "Habit Tracker",
  "appId": "com.yourname.habits",
  "plugins": {
    "notifications": {
      "enabled": true
    }
  }
}
```

**`js/app.js`:**
```javascript
let habits = JSON.parse(localStorage.getItem('habits') || '[]');

async function scheduleReminder(habit) {
    if (window.Capacitor) {
        await Capacitor.Plugins.LocalNotifications.schedule({
            notifications: [{
                title: "Habit Reminder",
                body: `Time to: ${habit.name}`,
                id: habit.id,
                schedule: {
                    at: new Date(Date.now() + habit.reminderTime * 60000)
                }
            }]
        });
    }
}

function completeHabit(habitId) {
    const habit = habits.find(h => h.id === habitId);
    habit.lastCompleted = new Date().toISOString();
    habit.streak = (habit.streak || 0) + 1;
    localStorage.setItem('habits', JSON.stringify(habits));
    renderHabits();
}
```

---

## 4. Expense Tracker

**Use Case**: Track daily expenses offline

**Key Features**:
- Add expenses with category
- View total by category
- Export data as JSON

**`js/app.js`:**
```javascript
let expenses = JSON.parse(localStorage.getItem('expenses') || '[]');

function addExpense(amount, category, description) {
    expenses.push({
        id: Date.now(),
        amount: parseFloat(amount),
        category,
        description,
        date: new Date().toISOString()
    });
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function getTotalByCategory(category) {
    return expenses
        .filter(e => e.category === category)
        .reduce((sum, e) => sum + e.amount, 0);
}

function exportData() {
    const dataStr = JSON.stringify(expenses, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `expenses-${Date.now()}.json`;
    link.click();
}
```

---

## 5. Offline Quiz App

**Use Case**: Educational quiz app with scoring

**`js/app.js`:**
```javascript
const quizData = [
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correct: 1
    },
    // More questions...
];

let currentQuestion = 0;
let score = 0;

function showQuestion() {
    const q = quizData[currentQuestion];
    document.getElementById('question').textContent = q.question;
    document.getElementById('options').innerHTML = q.options.map((opt, i) => `
        <button onclick="checkAnswer(${i})">${opt}</button>
    `).join('');
}

function checkAnswer(selected) {
    if (selected === quizData[currentQuestion].correct) {
        score++;
    }
    currentQuestion++;

    if (currentQuestion < quizData.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById('app').innerHTML = `
        <h2>Quiz Complete!</h2>
        <p>Score: ${score}/${quizData.length}</p>
        <button onclick="location.reload()">Restart</button>
    `;

    // Save high score
    const highScore = parseInt(localStorage.getItem('highScore') || '0');
    if (score > highScore) {
        localStorage.setItem('highScore', score);
    }
}

showQuestion();
```

---

## 6. Timer/Stopwatch App

**Use Case**: Simple timer with notification

**`js/app.js`:**
```javascript
let seconds = 0;
let interval = null;

function startTimer(duration) {
    seconds = duration;
    interval = setInterval(() => {
        seconds--;
        updateDisplay();

        if (seconds <= 0) {
            stopTimer();
            timerComplete();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(interval);
    interval = null;
}

function updateDisplay() {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    document.getElementById('display').textContent =
        `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

async function timerComplete() {
    // Vibrate if on mobile
    if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200]);
    }

    // Show notification
    if (window.Capacitor) {
        await window.PWA.showNotification('Timer', 'Time is up!');
    } else {
        alert('Time is up!');
    }
}
```

---

## Configuration Tips

### For Camera Apps
```json
{
  "plugins": {
    "camera": {
      "enabled": true,
      "permissions": ["camera", "photos"]
    }
  }
}
```

### For Notification Apps
```json
{
  "plugins": {
    "notifications": {
      "enabled": true,
      "smallIcon": "ic_stat_notification",
      "iconColor": "#4CAF50"
    }
  }
}
```

### For Data-Heavy Apps
Add more folders to copy:
```json
{
  "foldersToCopy": [
    "js",
    "styles",
    "icons",
    "assets",
    "data",
    "images"
  ]
}
```

---

## Building These Examples

1. Create new project: `node create-pwa-app.js`
2. Copy the code into appropriate files
3. Update `build-config.json` if needed
4. Test: `npm run serve`
5. Build: `npm run build`

Happy building! 🚀
