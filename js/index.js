import {
  keyCode, enKey, ruKey, enKeyShift, ruKeyShift,
} from './data.js';

const capsLock = [false, true];
const language = [enKey, ruKey];
const caseShift = [enKeyShift, ruKeyShift];

let shiftPressed = false;
let altPressed = false;
let ctrlPressed = false;
let cursorStart = 0;
let attr;

const body = document.getElementById('body');
const script = document.getElementById('script');
const textAreaSample = '<textarea class="textarea"></textarea>';
body.insertAdjacentHTML('afterbegin', textAreaSample);
const textArea = document.querySelector('.textarea');
const paragraph = '<p class="p">Keyboard was created in Windows OS</p>'
+ '<p class="p">To change language push Ctrl + Alt</p>';
script.insertAdjacentHTML('beforebegin', paragraph);

if (localStorage.getItem('lang') !== null) {
  language.reverse();
  caseShift.reverse();
}

function drawKeyBoard(lang) {
  if (document.getElementById('key_board') !== null) document.getElementById('key_board').remove();
  let keyBoard = '<div id="key_board" class="keyboard"><div>';
  for (let i = 0; i < lang.length; i += 1) {
    if (keyCode[i] === 'Backspace') {
      keyBoard += `<button class="button other-button" data-key="${keyCode[i]}">${lang[i]}</button></div>`;
    } else if (keyCode[i] === 'Tab') {
      keyBoard += `<div><button class="button other-button" data-key="${keyCode[i]}">${lang[i]}</button>`;
    } else if (keyCode[i] === 'CapsLock') {
      keyBoard += `</div><div><button class="button other-button" data-key="${keyCode[i]}">${lang[i]}</button>`;
    } else if (keyCode[i] === 'Enter') {
      keyBoard += `<button class="button other-button" data-key="${keyCode[i]}">${lang[i]}</button></div>`;
    } else if (keyCode[i] === 'ShiftLeft') {
      keyBoard += `<div><button class="button other-button" data-key="${keyCode[i]}">${lang[i]}</button>`;
    } else if (keyCode[i] === 'ShiftRight') {
      keyBoard += `<button class="button other-button" data-key="${keyCode[i]}">${lang[i]}</button>`;
    } else if (keyCode[i] === 'ControlLeft') {
      keyBoard += `<div><button class="button another-button" data-key="${keyCode[i]}">Ctrl</button>`;
    } else if (keyCode[i] === 'AltLeft') {
      keyBoard += `<button class="button another-button" data-key="${keyCode[i]}">Alt</button>`;
    } else if (keyCode[i] === 'Space') {
      keyBoard += `<button class="button space-button" data-key="${keyCode[i]}">Space</button>`;
    } else if (keyCode[i] === 'ControlRight') {
      keyBoard += `<button class="button another-button" data-key="${keyCode[i]}">Ctrl</button>`;
    } else if (keyCode[i] === 'ArrowUp') {
      keyBoard += `<button class="button" data-key="${keyCode[i]}">▲</button>`;
    } else if (keyCode[i] === 'Delete') {
      keyBoard += `<button class="button another-button" data-key="${keyCode[i]}">${lang[i]}</button></div>`;
    } else if (keyCode[i] === 'ArrowLeft') {
      keyBoard += `<button class="push-arrows">_______</button><button class="button" data-key="${keyCode[i]}">◄</button>`;
    } else if (keyCode[i] === 'ArrowDown') {
      keyBoard += `<button class="button" data-key="${keyCode[i]}"">▼</button>`;
    } else if (keyCode[i] === 'ArrowRight') {
      keyBoard += `<button class="button" data-key="${keyCode[i]}"">►</button></div>`;
    } else {
      keyBoard += `<button class="button" data-key="${keyCode[i]}">${lang[i]}</button>`;
    }
  }
  keyBoard += '</div>';
  textArea.insertAdjacentHTML('afterend', keyBoard);
}
drawKeyBoard(language[0]);

function curSta() {
  textArea.selectionStart = cursorStart;
  textArea.selectionEnd = cursorStart;
}

function backSpaceHandler() {
  if (textArea.selectionStart) {
    cursorStart = textArea.selectionStart - 1;
    textArea.value = `${textArea.value.slice(0, textArea.selectionStart - 1)}${textArea.value.slice(textArea.selectionEnd)}`;
    curSta();
  }
}

function tabHandler() {
  cursorStart = textArea.selectionStart + 4;
  textArea.value = `${textArea.value.slice(0, textArea.selectionStart)}    ${textArea.value.slice(textArea.selectionEnd)}`;
  curSta();
}

function capsLockToggler() {
  capsLock.reverse();
  if (capsLock[0]) {
    language.map((a) => {
      for (let i = 0; i < a.length; i += 1) {
        if (a[i].length === 1) a[i] = a[i].toUpperCase();
      }
      return language;
    });
    caseShift.map((a) => {
      for (let i = 0; i < a.length; i += 1) {
        if (a[i].length === 1) a[i] = a[i].toLowerCase();
      }
      return caseShift;
    });
  } else {
    language.map((a) => {
      for (let i = 0; i < a.length; i += 1) {
        if (a[i].length === 1) a[i] = a[i].toLowerCase();
      }
      return language;
    });
    caseShift.map((a) => {
      for (let i = 0; i < a.length; i += 1) {
        if (a[i].length === 1) a[i] = a[i].toUpperCase();
      }
      return caseShift;
    });
  }
  drawKeyBoard(language[0]);
}

function enterHandler() {
  cursorStart = textArea.selectionStart + 1;
  textArea.value = `${textArea.value.slice(0, textArea.selectionStart)}\n${textArea.value.slice(textArea.selectionEnd)}`;
  curSta();
}

function spaceHandler() {
  cursorStart = textArea.selectionStart + 1;
  textArea.value = `${textArea.value.slice(0, textArea.selectionStart)} ${textArea.value.slice(textArea.selectionEnd)}`;
  curSta();
}

function delHandler() {
  cursorStart = textArea.selectionStart;
  textArea.value = `${textArea.value.slice(0, textArea.selectionStart)}${textArea.value.slice(textArea.selectionEnd + 1)}`;
  curSta();
}

function arrowHandler(param) {
  cursorStart = textArea.selectionStart + 1;
  if (param === 'ArrowUp') {
    textArea.value = `${textArea.value.slice(0, textArea.selectionStart)}▲${textArea.value.slice(textArea.selectionEnd + 1)}`;
  } else if (param === 'ArrowLeft') {
    textArea.value = `${textArea.value.slice(0, textArea.selectionStart)}◄${textArea.value.slice(textArea.selectionEnd + 1)}`;
  } else if (param === 'ArrowDown') {
    textArea.value = `${textArea.value.slice(0, textArea.selectionStart)}▼${textArea.value.slice(textArea.selectionEnd + 1)}`;
  } else {
    textArea.value = `${textArea.value.slice(0, textArea.selectionStart)}►${textArea.value.slice(textArea.selectionEnd + 1)}`;
  }
  curSta();
}

function reverseLanguage() {
  language.reverse();
  caseShift.reverse();
  if (language[0][0] === 'ё') {
    localStorage.setItem('lang', 'ru');
  } else {
    localStorage.removeItem('lang');
  }
  drawKeyBoard(language[0]);
}

document.onkeydown = (ev) => {
  ev.preventDefault();
  if (document.querySelector(`.button[data-key="${ev.code}"]`)) {
    if (shiftPressed && (ev.code === 'ControlLeft' || ev.code === 'ControlRight')) {
      shiftPressed = false;
      drawKeyBoard(language[0]);
    }
    if (ctrlPressed && ev.code !== 'AltLeft') {
      ctrlPressed = false;
      document.querySelector(`.button[data-key="${attr}"]`).classList.remove('button-active');
    }
    textArea.focus();
    document.querySelector(`.button[data-key="${ev.code}"]`).classList.add('button-active');
    if (ev.code === 'Backspace') {
      backSpaceHandler();
    } else if (ev.code === 'Tab') {
      tabHandler();
    } else if (ev.code === 'CapsLock') {
      capsLockToggler();
    } else if (ev.code === 'Enter') {
      enterHandler();
    } else if (ev.code === 'ShiftLeft' || ev.code === 'ShiftRight') {
      if (document.querySelector(`.button[data-key="${attr}"]` !== null)) {
        document.querySelector(`.button[data-key="${attr}"]`).classList.remove('button-active');
      }
      shiftPressed = true;
      drawKeyBoard(caseShift[0]);
      document.querySelector(`.button[data-key="${ev.code}"]`).classList.add('button-active');
    } else if (ev.code === 'ControlLeft' || ev.code === 'ControlRight') {
      ctrlPressed = true;
    } else if (ev.code === 'AltLeft') {
      altPressed = true;
      if (ctrlPressed && altPressed) {
        reverseLanguage();
        document.querySelector(`.button[data-key="${ev.code}"]`).classList.add('button-active');
      }
    } else if (ev.code === 'Space') {
      spaceHandler();
    } else if (ev.code === 'Delete') {
      delHandler();
    } else if (ev.code === 'ArrowUp' || ev.code === 'ArrowLeft' || ev.code === 'ArrowDown' || ev.code === 'ArrowRight') {
      arrowHandler(ev.code);
    } else {
      cursorStart = textArea.selectionStart + 1;
      textArea.value = `${textArea.value.slice(0, textArea.selectionStart)}${ev.key}${textArea.value.slice(textArea.selectionEnd)}`;
      curSta();
    }
  }
};

document.onkeyup = (ev) => {
  ev.preventDefault();
  if (document.querySelector(`.button[data-key="${ev.code}"]`)) {
    document.querySelector(`.button[data-key="${ev.code}"]`).classList.remove('button-active');
    if (ev.code === 'AltLeft') {
      altPressed = false;
    } else if (ev.code === 'ShiftLeft' || ev.code === 'ShiftRight') {
      shiftPressed = false;
      drawKeyBoard(language[0]);
    } else if (ev.code === 'ControlLeft' || ev.code === 'ControlRight') {
      ctrlPressed = false;
    }
  }
};

document.addEventListener('click', (ev) => {
  if (ev.target.getAttribute('data-key')) {
    textArea.focus();
    if (shiftPressed && (ev.target.getAttribute('data-key') === 'ControlLeft' || ev.target.getAttribute('data-key') === 'ControlRight')) {
      shiftPressed = false;
      drawKeyBoard(language[0]);
    }
    if (ctrlPressed && ev.target.getAttribute('data-key') !== 'AltLeft') {
      ctrlPressed = false;
      document.querySelector(`.button[data-key="${attr}"]`).classList.remove('button-active');
    }
    if (ev.target.getAttribute('data-key') === 'Backspace') {
      backSpaceHandler();
    } else if (ev.target.getAttribute('data-key') === 'Tab') {
      tabHandler();
    } else if (ev.target.getAttribute('data-key') === 'CapsLock') {
      capsLockToggler();
    } else if (ev.target.getAttribute('data-key') === 'Enter') {
      enterHandler();
    } else if (ev.target.getAttribute('data-key') === 'ShiftLeft' || ev.target.getAttribute('data-key') === 'ShiftRight') {
      attr = ev.target.getAttribute('data-key');
      if (!shiftPressed) {
        shiftPressed = true;
        drawKeyBoard(caseShift[0]);
        document.querySelector(`.button[data-key="${attr}"]`).classList.add('button-active');
      } else {
        shiftPressed = false;
        drawKeyBoard(language[0]);
        document.querySelector(`.button[data-key="${attr}"]`).classList.remove('button-active');
      }
    } else if (ev.target.getAttribute('data-key') === 'ControlLeft' || ev.target.getAttribute('data-key') === 'ControlRight') {
      attr = ev.target.getAttribute('data-key');
      if (!ctrlPressed) {
        ctrlPressed = true;
        document.querySelector(`.button[data-key="${attr}"]`).classList.add('button-active');
      } else {
        ctrlPressed = false;
        document.querySelector(`.button[data-key="${attr}"]`).classList.remove('button-active');
      }
    } else if (ev.target.getAttribute('data-key') === 'AltLeft') {
      altPressed = true;
      if (ctrlPressed && altPressed) {
        reverseLanguage();
        ctrlPressed = false;
        altPressed = false;
        document.querySelector(`.button[data-key="${attr}"]`).classList.remove('button-active');
      }
    } else if (ev.target.getAttribute('data-key') === 'Space') {
      spaceHandler();
    } else if (ev.target.getAttribute('data-key') === 'Delete') {
      delHandler();
    } else if (ev.target.getAttribute('data-key') === 'ArrowUp'
    || ev.target.getAttribute('data-key') === 'ArrowLeft'
    || ev.target.getAttribute('data-key') === 'ArrowDown'
    || ev.target.getAttribute('data-key') === 'ArrowRight') {
      arrowHandler(ev.target.getAttribute('data-key'));
    } else {
      const sym = ev.target.innerText;
      cursorStart = textArea.selectionStart + 1;
      textArea.value = `${textArea.value.slice(0, textArea.selectionStart)}${sym}${textArea.value.slice(textArea.selectionEnd)}`;
      curSta();
    }
  }
});

//  ||
