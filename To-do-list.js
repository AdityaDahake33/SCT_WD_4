 document.body.classList.toggle('dark-mode', localStorage.getItem('dark') === 'true');

    function toggleMode() {
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('dark', document.body.classList.contains('dark-mode'));
    }

    function addTask() {
      const taskInput = document.getElementById('taskInput');
      const datetimeInput = document.getElementById('datetimeInput');
      const categoryInput = document.getElementById('categoryInput');
      const taskList = document.getElementById('taskList');

      const taskText = taskInput.value.trim();
      const datetime = datetimeInput.value;
      const category = categoryInput.value;

      if (!taskText) return alert("Please enter a task");

      const li = document.createElement('li');

      const span = document.createElement('span');
      span.textContent = `${taskText} [${category}]`;

      const dateTag = document.createElement('div');
      dateTag.className = 'datetime';
      dateTag.textContent = datetime;

      const actions = document.createElement('div');
      actions.className = 'actions';

      const completeBtn = document.createElement('button');
      completeBtn.textContent = '✔';
      completeBtn.onclick = () => {
        span.classList.toggle('completed');
        saveTasks();
      };

      const editBtn = document.createElement('button');
      editBtn.textContent = '✎';
      editBtn.onclick = () => {
        const newTask = prompt("Edit your task:", span.textContent);
        if (newTask) {
          span.textContent = newTask;
          saveTasks();
        }
      };

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '🗑';
      deleteBtn.onclick = () => {
        li.remove();
        saveTasks();
      };

      actions.append(completeBtn, editBtn, deleteBtn);

      const taskContainer = document.createElement('div');
      taskContainer.append(span, dateTag);

      li.append(taskContainer, actions);
      taskList.appendChild(li);

      taskInput.value = '';
      datetimeInput.value = '';
      categoryInput.value = 'General';

      saveTasks();
    }

    function saveTasks() {
      const tasks = Array.from(document.getElementById('taskList').children).map(li => ({
        text: li.querySelector('span').textContent,
        date: li.querySelector('.datetime').textContent,
        completed: li.querySelector('span').classList.contains('completed')
      }));
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.forEach(task => {
        document.getElementById('taskInput').value = task.text.split(' [')[0];
        document.getElementById('categoryInput').value = task.text.split('[')[1]?.replace(']', '') || 'General';
        document.getElementById('datetimeInput').value = task.date;
        addTask();
        if (task.completed) {
          document.querySelectorAll('li:last-child span')[0].classList.add('completed');
        }
      });
    }

    loadTasks();