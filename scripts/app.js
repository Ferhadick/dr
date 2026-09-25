// Вставь свои короткие дословные строки в поле lyric у вопросов type: 'lyrics'.
// Не меняй artist: это правильный ответ для этой строки.
const trackQuestions = [
  { type: 'track', title: 'Время', artist: 'PHARAOH' },
  { type: 'track', title: 'Солдат', artist: 'PHARAOH' },
  { type: 'track', title: 'Сети', artist: 'GONE.Fludd' },
  { type: 'track', title: 'Cadillac', artist: 'MORGENSHTERN' },
  { type: 'track', title: 'Властелин калек', artist: 'SALUKI' },
];

const lyricQuestions = [
  { type: 'lyrics', artist: 'PHARAOH', lyric: 'ВСТАВЬ СЮДА СТРОКУ ИЗ ТРЕКА PHARAOH' },
  { type: 'lyrics', artist: 'PHARAOH', lyric: 'ВСТАВЬ СЮДА ЕЩЁ ОДНУ СТРОКУ ИЗ ТРЕКА PHARAOH' },
  { type: 'lyrics', artist: 'GONE.Fludd', lyric: 'ВСТАВЬ СЮДА СТРОКУ ИЗ ТРЕКА GONE.Fludd' },
  { type: 'lyrics', artist: 'GONE.Fludd', lyric: 'ВСТАВЬ СЮДА ЕЩЁ ОДНУ СТРОКУ ИЗ ТРЕКА GONE.Fludd' },
  { type: 'lyrics', artist: 'SALUKI', lyric: 'ВСТАВЬ СЮДА СТРОКУ ИЗ ТРЕКА SALUKI' },
];

const artists = ['PHARAOH', 'SALUKI', 'GONE.Fludd', 'MORGENSHTERN'];
const $ = (id) => document.getElementById(id);
let questions = [];
let current = 0;
let score = 0;

function shuffle(items) { return [...items].sort(() => Math.random() - 0.5); }
function createAnswers(item) {
  const answers = shuffle(artists);
  return { ...item, answers, correct: answers.indexOf(item.artist) };
}
function renderQuestion() {
  const item = questions[current];
  const isLyrics = item.type === 'lyrics';
  $('question-type').textContent = isLyrics ? 'УГАДАЙ ПО СТРОКЕ' : 'УГАДАЙ ТРЕК';
  $('question').textContent = isLyrics ? `«${item.lyric}»` : `Кто исполняет трек «${item.title}»?`;
  $('question').classList.toggle('lyric-question', isLyrics);
  $('progress-label').textContent = `Вопрос ${current + 1} из ${questions.length}`;
  $('score-label').textContent = `Очки: ${score}`;
  $('progress-bar').style.width = `${((current + 1) / questions.length) * 100}%`;
  $('answers').replaceChildren(...item.answers.map((answer, index) => {
    const button = document.createElement('button');
    button.className = 'answer'; button.textContent = answer;
    button.addEventListener('click', () => chooseAnswer(index));
    return button;
  }));
}
function show(id) {
  ['start-screen', 'quiz-screen', 'wrong-screen', 'win-screen'].forEach((screen) => $(screen).classList.toggle('hidden', screen !== id));
  document.body.classList.toggle('error-mode', id === 'wrong-screen');
}
function chooseAnswer(index) {
  if (index !== questions[current].correct) return show('wrong-screen');
  score++; current++;
  if (current === questions.length) { show('win-screen'); launchConfetti(); } else renderQuestion();
}
function resetQuiz() {
  current = 0; score = 0;
  questions = shuffle([...trackQuestions, ...lyricQuestions]).map(createAnswers);
  renderQuestion(); show('quiz-screen');
}
function launchConfetti() {
  const colors = ['#5865f2', '#28c7a5', '#ffd35c', '#ff835c', '#ffffff'];
  for (let i = 0; i < 90; i++) {
    const piece = document.createElement('i'); piece.className = 'confetti';
    piece.style.left = `${Math.random() * 100}vw`; piece.style.background = colors[i % colors.length];
    piece.style.setProperty('--drift', `${(Math.random() - .5) * 250}px`); piece.style.animationDelay = `${Math.random() * .65}s`;
    $('confetti').append(piece); setTimeout(() => piece.remove(), 3400);
  }
}
$('start-button').addEventListener('click', resetQuiz);
$('retry-button').addEventListener('click', () => show('quiz-screen'));
$('restart-button').addEventListener('click', resetQuiz);
$('celebrate-button').addEventListener('click', launchConfetti);
document.querySelector('.screamer-frame img').addEventListener('error', (event) => { event.currentTarget.hidden = true; });
questions = shuffle([...trackQuestions, ...lyricQuestions]).map(createAnswers);
show('start-screen');
