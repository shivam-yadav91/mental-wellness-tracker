const moodButtons = document.querySelectorAll('#mood-options button');
const journalInput = document.getElementById('journal');
const saveBtn = document.getElementById('saveEntry');
const entryList = document.getElementById('entryList');

let selectedMood = '';

moodButtons.forEach(button => {
  button.addEventListener('click', () => {
    selectedMood = button.dataset.mood;
    moodButtons.forEach(btn => btn.style.backgroundColor = '#e0e0e0');
    button.style.backgroundColor = '#80cbc4';
  });
});

saveBtn.addEventListener('click', () => {
  if (!selectedMood) {
    alert('Please select a mood!');
    return;
  }

  const journalText = journalInput.value.trim();
  const date = new Date().toLocaleDateString();
  const entry = { mood: selectedMood, journal: journalText, date };

  let entries = JSON.parse(localStorage.getItem('moodEntries')) || [];
  entries.unshift(entry);
  localStorage.setItem('moodEntries', JSON.stringify(entries));

  journalInput.value = '';
  selectedMood = '';
  moodButtons.forEach(btn => btn.style.backgroundColor = '#e0e0e0');
  loadEntries();
});

function loadEntries() {
  const entries = JSON.parse(localStorage.getItem('moodEntries')) || [];
  entryList.innerHTML = '';
  entries.forEach(entry => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${entry.date}</strong> - ${entry.mood}<br>${entry.journal}`;
    entryList.appendChild(li);
  });
}

loadEntries();
