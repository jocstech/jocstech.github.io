const notes = ['c', 'db', 'd', 'eb', 'e', 'f', 'gb', 'g', 'ab', 'a', 'bb', 'b'];
const whites = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
const blacks = ['db', 'eb', 'gb', 'ab', 'bb'];
const key_letters_white = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];
const key_letters_black = ['s', 'd', 'g', 'h', 'j'];
const current_note = notes[0];
const sheet_1 = '1115566544332215544332554433211556654433221334554321123433445665432234322';


window.onload = function () {
    // self-execution
    let app = document.getElementById('app');
    app.appendChild(this.displayNote());
    app.appendChild(this.drawKeyborad());
    insertAllNoteAudio(notes);
    addMask();

    // listeners
    let keys = document.querySelectorAll('.key');
    keys.forEach(key => {
        key.addEventListener('click', () => {
            this.playNote(key.dataset.note);
        });
    });

    document.addEventListener('keydown', e => {
        const whiteKey = key_letters_white.indexOf(e.key);
        const blackKey = key_letters_black.indexOf(e.key);

        if (whiteKey > -1) {
            this.playNote(whites[whiteKey]);
        }

        if (blackKey > -1) {
            this.playNote(blacks[blackKey]);
        }

    });

    document.getElementById('start-btn').addEventListener('click', () => {
        // auto play
        this.playNoteSheet(sheet_1);
        document.querySelector('.mask').remove();
    });
};

function playNoteSheet(sheet) {
    let index = 0;
    let player = setInterval(() => {
        this.playNote(whites[sheet[index + 1]]);
        if (index >= sheet.length) {
            clearInterval(player); return;
        } else {
            index++;
        }
    }, 800);
}

function playNote(note) {
    if (note) {
        this.changeNote(note);
        document.querySelector(`.key.${note}`).classList.add('active');
        this.setTimeout(() => {
            document.querySelector(`.key.${note}`).classList.remove('active');
        }, 300);

        const note_audio = document.getElementById(note);
        note_audio.pause();
        note_audio.currentTime = 0;
        note_audio.play();

    }
}

function displayNote() {
    let display = document.createElement('div');
    display.className = 'display';
    display.innerHTML = current_note;
    return display;
}

function changeNote(note) {
    document.querySelector('.display').classList.add('changed');
    setTimeout(() => {
        document.querySelector('.display').classList.remove('changed');
    }, 300);


    this.current_note = note;
    document.querySelector('.display').innerHTML = note;
}

function drawKeyborad() {
    let piano = document.createElement('div');
    piano.className = 'piano';
    notes.forEach(note => {

        let key = document.createElement('div');
        key.setAttribute('data-note', note);
        key.className = note.length > 1 ? `key black ${note}` : `key white ${note}`;

        let keyNote = document.createElement('div');
        keyNote.className = 'name';
        keyNote.innerHTML = note;
        key.appendChild(keyNote);

        piano.appendChild(key);
    });

    return piano;
}

function addMask() {
    let mask = document.createElement('div');
    mask.className = 'mask';
    mask.innerHTML = '<div class="inner"><span>Click The Button To Play</span><button id="start-btn">Start</button></div>';
    document.body.appendChild(mask);
}

function insertAllNoteAudio(notes) {
    if (notes && notes.length) {
        notes.forEach(note => {
            let note_audio = document.createElement('audio');
            note_audio.id = note;
            note_audio.setAttribute('data-note', note);
            note_audio.src = `assets/sounds/${note}.mp3`;
            note_audio.setAttribute('autoplay', '');
            note_audio.setAttribute('muted', '');

            document.body.appendChild(note_audio);
        });
    }
}

