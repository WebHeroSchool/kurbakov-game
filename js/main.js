// Elements
const livesEl = document.getElementById('lives');
const scoreEl = document.getElementById('score');
const endScoreEl = document.getElementById('endScore');
const start = document.getElementById('start');
const speed = document.getElementById('speed');
const star = document.getElementById('star');
const question = document.getElementById('question');
const rules = document.getElementById('rules');
const rulesOk = document.getElementById('rules-ok');
const end = document.getElementById('end');
const endOk = document.getElementById('end-ok');

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
  holes: [ 'hole-1', 'hole-2', 'hole-3', 'hole-4', 'hole-5' ],
  popups: [rules, end]
};

// Popups
const hidePopup = elem => {
  elem.classList.remove('active');
}

const hideAllPopups = popups => {
  popups.forEach(elem => hidePopup(elem));
}

const showPopup = elem => {
  hideAllPopups(data.popups);
  elem.classList.add('active');
  if (elem === data.popups[1]) {
    endScoreEl.textContent = scoreEl.textContent;
  }
};


// Main class
class Game {
	constructor(score, lives, isRunning, isMouse) {
		this.score = score;
		this.lives = lives;
		this.isRunning = isRunning;
		this.isMouse = isMouse;
    this.time = 2000;
    this.mouseCounter = 0;
    this.counter = 0;
    this.currentSpeed = 1;

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
        if (this.time !== 1200) this.mouseCounter++;
        if (this.mouseCounter >= 5) {
          star.classList.add('star');
          this.time -= 100;
          if (this.time >= 1200) {
            this.mouseCounter = 0;
            this.currentSpeed++;
            speed.textContent = this.currentSpeed;
          } else {
            this.time = 1200;
          }
        }
      } else {
        this.checkLives(--this.lives);
      }

      if (!this.lives) {
        clearTimeout(this.timerId);
        this.isRunning = false;
        showPopup(data.popups[1]);
      }

      hole.removeChild(img);
    };

    this.createEl = () => {
      if (!this.isRunning) return;

      if (!this.mouseCounter) star.classList.remove('star');

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

    this.reset = () => {
      if (this.timerId) {
        clearTimeout(this.timerId);
      }
      this.score = 0;
      scoreEl.textContent = this.score;
      this.lives = 3;
      this.checkLives(this.lives);
      this.time = 2000;
      this.mouseCounter = 0;
      this.counter = 0;
      this.currentSpeed = 1;
      speed.textContent = this.currentSpeed;
    }

    this.start = () => {
      this.isRunning = true;
      hideAllPopups(data.popups);
      this.reset();
      this.createEl();
    };

	}
}

const game = new Game(0, 3, false, false);

start.addEventListener('click', game.start);
question.addEventListener('click', () => showPopup(data.popups[0]));
rulesOk.addEventListener('click', () => hidePopup(data.popups[0]));
endOk.addEventListener('click', () => {
  hidePopup(data.popups[1]);
  game.reset();
});
