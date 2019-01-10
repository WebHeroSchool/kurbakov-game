// Data
const data = {
  emoji: {
    mouse: 'mouse-face',
    panda: 'panda-face',
    bear: 'bear-face',
    fox: 'fox-face',
    cat: 'cat-face',
    cow: 'cow-face',
    lion: 'lion-face',
    pig: 'pig-nose',
    koala: 'koala-face',
    rabbit: 'rabbit-face',
    tiger: 'tiger-face',
  },
  holes: [ 'hole-1', 'hole-2', 'hole-3', 'hole-4', 'hole-5' ]
};

// Elements
const livesEl = document.getElementById('lives');
const scoreEl = document.getElementById('score');
const start = document.getElementById('start');
const question = document.getElementById('question');
const rules = document.getElementById('rules');
const rulesOk = document.getElementById('rules-ok');

// Popup rules
const showRules = () => {
  rules.classList.add('active');
};

const hideRules = () => {
  rules.classList.remove('active');
};

// Main class
class Game {
	constructor(score, lives, isRunning, isMouse, time) {
		this.score = score;
		this.lives = lives;
		this.isRunning = isRunning;
		this.isMouse = isMouse;
    this.time = time;
    this.counter = 0;

    this.checkLives = hearts => {
      if (hearts !== 3) {
        livesEl.children[hearts].classList.remove('heart-red');
        livesEl.children[hearts].classList.add('heart-grey');
      } else {
        const livesChildren = Array.prototype.slice.call(livesEl.children);
        livesChildren.forEach(el => {
          el.classList.remove('heart-grey');
          el.classList.add('heart-red');
        });
      }
    };

    this.handleClick = (rndEl, img, hole) => {
      this.isMouse = (rndEl[0] === 'mouse');

      if (this.isMouse) {
        this.score += 10;
        scoreEl.textContent = this.score;
      } else {
        this.checkLives(--this.lives);
      }

      if (!this.lives) {
        clearTimeout(this.timerId);
        this.isRunning = false;
      }

      hole.removeChild(img);
    };

    this.createEl = () => {
      if (!this.isRunning) return;

      if (this.score === 50) this.time = 1111;

      const holesEl = document.querySelectorAll('.hole');
      holesEl.forEach(el => el.innerHTML = '');
      
      const emoji = Object.entries(data.emoji);
      const holes = data.holes;
      const rndHole = holes[Math.floor(Math.random() * holes.length)];
      let rndEl = emoji[Math.floor(Math.random() * emoji.length)];
      
      if (rndEl[0] !== 'mouse') {
        this.counter++;
      } else {
        this.counter = 0;
      }
      
      if (this.counter > 3) {
        this.counter = 0;
        rndEl = emoji[0];
      }
      
      const img = document.createElement('img');
      img.src = `./images/emoji/${rndEl[rndEl.length - 1]}.png`;
      img.classList.add('emoji');
      const hole = document.getElementsByClassName(rndHole)[0];
      hole.appendChild(img);

      this.timerId = setTimeout(() => {
          this.createEl();
      }, this.time);

      img.addEventListener('click', () => this.handleClick(rndEl, img, hole));
    };

    this.start = () => {
      if (this.timerId) {
        clearTimeout(this.timerId);
      }
      this.score = 0;
      scoreEl.textContent = this.score;
      this.lives = 3;
      this.checkLives(this.lives);
      this.isRunning = true;
      this.time = 2000;
      this.createEl();
    };

	}
}

const game = new Game(0, 3, false, false, 2000);

start.addEventListener('click', game.start);
question.addEventListener('click', showRules);
rulesOk.addEventListener('click', hideRules);
