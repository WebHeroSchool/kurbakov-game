// Data
const data = {
  emoji: {
    mouse: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/155/mouse-face_1f42d.png',
    panda: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/155/panda-face_1f43c.png',
    bear: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/155/bear-face_1f43b.png',
    fox: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/155/fox-face_1f98a.png',
    cat: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/155/cat-face_1f431.png',
    cow: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/155/cow-face_1f42e.png',
    lion: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/155/lion-face_1f981.png',
    pig: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/155/pig-nose_1f43d.png',
    koala: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/155/koala_1f428.png',
    rabbit: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/155/rabbit-face_1f430.png',
    tiger: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/155/tiger-face_1f42f.png',
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

    this.handleClick = this.handleClick.bind(this);
    this.createEl = this.createEl.bind(this);
    this.start = this.start.bind(this);
	}

	handleClick(rndEl, timerId) {
		this.isMouse = (rndEl[0] === 'mouse') ? true : false;

    if (this.isMouse) {
      this.score += 10;
      score.textContent = this.score;
    } else {
      this.lives--;
      switch(this.lives) {
        case 2:
          lives.children[2].classList.remove('heart-red');
          lives.children[2].classList.add('heart-grey');
        break;
        case 1:
          lives.children[1].classList.remove('heart-red');
          lives.children[1].classList.add('heart-grey');
        break;
        case 0:
          lives.children[0].classList.remove('heart-red');
          lives.children[0].classList.add('heart-grey');
        break;
      }
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
    img.src = rndEl[rndEl.length - 1];
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
    this.isRunning = true;
    this.createEl();
	}
}

const game = new Game(0, 3, false, false);

start.addEventListener('click', game.start);