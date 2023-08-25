

const timer = {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
    longBreakInterval:4,
    sessions: 0,
};


let interval;

const buttonSound = new Audio('button-sound.mp3');
const mainButton = document.getElementById('js-btn');
mainButton.addEventListener('click', () => {
    buttonSound.play();
    const { action } = mainButton.dataset;
    if (action === 'start') {
        startTimer();
    } else {
        stopTimer();
    }
});

const modeButtons = document.querySelector('#js-mode-buttons');
modeButtons.addEventListener('click', handleMode);

function handleMode(event){
const {mode} = event.target.dataset;

    if(!mode) return;

    switchMode(mode);
    stopTimer();
}

function switchMode (mode) {
    timer.mode = mode;
    timer.remainingTime = {
        total: timer[mode] * 60,
        minutes: timer[mode],
        seconds:0,
    };

    document
        .querySelectorAll('button[data-mode]')
        .forEach(e => e.classList.remove('active'));
    document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
    document.body.style.backgroundColor = `var(--${mode})`;
    document
        .getElementById('js-progress')
        .setAttribute('max', timer.remainingTime.total);

    updateClock();
}

function getRemainingTime(endTime) {
    const currentTime = Date.parse(new Date ());
    const difference  = endTime - currentTime;

    const total = Number.parseInt(difference / 1000,10);
    const minutes = Number.parseInt((total/60)% 60, 10);
    const seconds = Number.parseInt(total % 60, 10);

    return {
        total,
        minutes,
        seconds,
    };
}

function startTimer() {
    let { total } = timer.remainingTime;
    const endTime = Date.parse(new Date ()) + total * 1000;

    if (timer.mode === 'pomodoro') timer.sessions++;


    mainButton.dataset.action = 'stop';
    mainButton.textContent = 'stop';
    mainButton.classList.add('active');

    interval = setInterval (function () {
        timer.remainingTime = getRemainingTime (endTime);
        updateClock ();

        total = timer.remainingTime.total;
        if (total <= 0) {
            clearInterval(interval);

            switch (timer.mode) {
                case 'pomodoro':
                    if (timer.sessions % timer.longBreakInterval === 0) {
                        switchMode('longBreak');
                    } else {
                        switchMode ('shortBreak');
                    }
                    break;
                default:
                    switchMode('pomodoro');
            }

            if (Notification.permission === 'granted') {
                const text =
                  timer.mode === 'pomodoro' ? 'Get back to work!' : 'Take a break!';
                new Notification(text);
              }

        document.querySelector(`[data-sound="${timer.mode}"]`).play();

            startTimer();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(interval);

    mainButton.dataset.action = 'start';
    mainButton.textContent = 'start';
    mainButton.classList.remove('active');
}


function updateClock(){
    const {remainingTime} = timer;
    const minutes = `${remainingTime.minutes}`.padStart(2,'0');
    const seconds = `${remainingTime.seconds}`.padStart(2,'0');

    const min = document.getElementById('js-minutes');
    const sec = document.getElementById('js-seconds');

    min.textContent = minutes;
    sec.textContent = seconds;

    const text = timer.mode === 'pomodoro' ? 'Get back to work!' : 'Take a break!';
    document.title = `${minutes}:${seconds} - ${text}`;

    const progress = document.getElementById('js-progress');
    progress.value = timer[timer.mode] * 60 - timer.remainingTime.total;
}

document.addEventListener('DOMContentLoaded', () => {
    if ('Notification' in window) {
        // If notification permissions have neither been granted or denied
        if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
          // ask the user for permission
          Notification.requestPermission().then(function(permission) {
            // If permission is granted
            if (permission === 'granted') {
              // Create a new notification
              new Notification(
                'Awesome! You will be notified at the start of each session'
              );
            }
          });
        }
      }
    
    switchMode('pomodoro');
  });



  // --------------- TODO LIST ---------------//

  let todoItems = [];

  localStorage.setItem('todoItemsRef', JSON.stringify(todoItems));

  function renderTodo(todo) {
    const list = document.querySelector('.js-todo-list');

    const item = document.querySelector(`[data-key='${todo.id}']`);

    if(todo.deleted) {
        item.remove();
        return
    }

    const isChecked = todo.checked ? 'done':'';
    const node = document.createElement("li");

    node.setAttribute('class', `todo-item ${isChecked}`);
    node.setAttribute('data-key', todo.id);
    node.innerHTML = `
    <input id="${todo.id}" type="checkbox"/>
    <label for="${todo.id}" class="tick js-tick"></label>
    <span>${todo.text}</span>
    <button class="delete-todo js-delete-todo">
    <svg><use href="#delete-icon"></use></svg>
    </button>
    `;

    if (item) {
        list.replaceChild(node,item);
    } else {
        list.append(node);
    }
  }



  function addTodo(text) {
    const todo = {
        text,
        checked: false,
        id: Date.now(),
    };

    todoItems.push(todo);
    renderTodo(todo);
  }

  const form = document.querySelector('.js-form');
  
  form.addEventListener('submit',event => {
    event.preventDefault();
    const input = document.querySelector('.js-todo-input');

    const text = input.value.trim();
    if (text !== '') {
        addTodo(text);
        input.value = '';
        input.focus();
    }
  });


const list = document.querySelector('.js-todo-list');
list.addEventListener('click', event => {
    if (event.target.classList.contains('js-tick')) {
        const itemKey = event.target.parentElement.dataset.key;
        toggleDone (itemKey);
    }

    if (event.target.classList.contains('js-delete-todo')) {
        const itemKey = event.target.parentElement.dataset.key;
        deleteTodo(itemKey);
    }
});

function toggleDone(key) {
    const index = todoItems.findIndex(item => item.id === Number(key));
    todoItems[index].checked = !todoItems[index].checked;
    renderTodo(todoItems[index]);
}

function deleteTodo (key) {
    const index = todoItems.findIndex(item => item.id === Number(key));
    const todo = {
        deleted: true,
        ...todoItems[index]
    };

    todoItems= todoItems.filter(item => item.id !== Number (key));
    renderTodo(todo);
}

document.addEventListener('DOMContentLoaded', () => {
    const ref = localStorage.getItem('todoItemsRef');
    if (ref) {
      todoItems = JSON.parse(ref);
      todoItems.forEach(t => {
        renderTodo(t);
      });
    }
  });