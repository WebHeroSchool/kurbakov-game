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
const lives = document.getElementById('lives');
const main = document.getElementById('main');
const score = document.getElementById('score');
const start = document.getElementById('start');

// Main class
class Game {
	constructor(score, lives, isRunning, isMouse) {
		this.score = score;
		this.lives = lives;
		this.isRunning = isRunning;
		this.isMouse = isMouse;
    this.counter = 0;

    this.checkLives = this.checkLives.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.createEl = this.createEl.bind(this);
    this.start = this.start.bind(this);
	}

  checkLives(hearts) {
    if (hearts !== 3) {
      lives.children[hearts].classList.remove('heart-red');
      lives.children[hearts].classList.add('heart-grey');
    } else {
      const livesChildren = Array.prototype.slice.call(lives.children);
      livesChildren.forEach(el => {
        el.classList.remove('heart-grey');
        el.classList.add('heart-red');
      });
    }
  }

	handleClick(rndEl, timerId) {
		this.isMouse = (rndEl[0] === 'mouse');

    if (this.isMouse) {
      this.score += 10;
      score.textContent = this.score;
    } else {
      this.checkLives(--this.lives);
    }

    main.innerHTML = null;

    if (!this.lives) {
      clearTimeout(timerId);
      const test = document.createElement('div');
      test.style.textAlign = 'center';
      main.appendChild(test);
      test.textContent = 'Game Over!!!';
      this.isRunning = false;
    }
	}

	createEl() {
    if (!this.isRunning) return;

    main.innerHTML = null;

    const test = document.createElement('div');
    test.style.textAlign = 'center';
    main.appendChild(test);
    
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

    test.textContent = `${rndEl[0]} ${rndHole}`;
		
    const img = document.createElement('img');
    img.src = `./images/emoji/${rndEl[rndEl.length - 1]}.png`;
    img.classList.add('emoji', rndHole);
    main.appendChild(img);

    const timerId = setTimeout(() => {
        this.createEl();
    }, 2000);

    img.addEventListener('click', () => this.handleClick(rndEl, timerId));
	}

	start() {
    this.score = 0;
    score.textContent = this.score;
    this.lives = 3;
    this.checkLives(this.lives);
    this.isRunning = true;
    this.createEl();
	}
}

const game = new Game(0, 3, false, false);

start.addEventListener('click', game.start);
