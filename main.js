let newTaskBtn =document.getElementById('newTask');
let taskInput = document.getElementById('taskInput');

let tasks = []

newTaskBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    addTask();
});

function addTask(){
    let text = taskInput.value.trim();

    if (text){
        tasks.push({text: text, completed: false});
        taskInput.value= "";
        updateTaskList();
    }
    console.log(tasks);
    
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
   li.addEventListener("change", ()=>toggleTestComplete(i))
      tasklist.appendChild(li)
    })
}