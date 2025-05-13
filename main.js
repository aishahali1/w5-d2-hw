let newTaskBtn =document.getElementById('newTask');
let taskInput = document.getElementById('taskInput');

let tasks = []

newTaskBtn.addEventListener("click",(e)=>{
    addTask();
});
const saveTasks =()=>{
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function addTask(){
    let text = taskInput.value.trim();

    if (text){
        tasks.push({text: text, completed: false});
        taskInput.value= "";
        updateTaskList();
        updateStats();
        saveTasks()
    }
    console.log(tasks);
    
}
    const toggleTaskComplete =(i)=>{
        tasks[i].completed = !tasks[i].completed;
        updateTaskList();
        updateStats();
        saveTasks();
    }

    const deletTask =(i)=>{
        tasks.splice(i,1);
        updateTaskList();
        updateStats();
        saveTasks();
    }
    const editTask =(i)=>{
        taskInput.value= tasks[i].text;
        tasks.splice(i,1);
        updateTaskList();
        updateStats();
        saveTasks();
    }
   const updateStats=()=>{
    let completedtasks = tasks.filter(task => task.completed).length;
    let totaltasks = tasks.length
    let progress = (completedtasks/totaltasks)*100;
    let progressBar = document.getElementById('progress');
    let progressNumbers = document.getElementById('numbers');
    progressBar.style.width = `${progress}%`;
    progressNumbers.innerText = `${completedtasks}/${totaltasks}`
   }
function updateTaskList(){
    let tasklist = document.getElementById('tasklist');

    tasks.forEach(task, i=>{
      let li = document.createElement("li");
      li.innerHTML = ` 
      <div class="taskItem">
      <div class="task" ${tasks.completed ? 'completed' : ''}>
      <input type="checkbox" class="checkbox
      ${task.completed ? "checked" : ""}">
      <p>${task.text}</p>
      </div> 
      <div class="icons">
      <img src="./images/editIcon.svg" onClick="editTask(${i})">
       <img src="./images/deleteIcon.svg" onClick="deleteTask(${i})">
      </div>  
       </div>
      `;
   li.addEventListener("change", ()=>toggleTaskComplete(i))
      tasklist.appendChild(li)
    })
}