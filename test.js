document.getElementById("clearLocalStorageButton").addEventListener("click", function() 
{
    localStorage.clear();
    document.getElementById("showTask").innerHTML = "";
});

document.addEventListener("DOMContentLoaded", loadTasksFromLocalStorage);

function loadTasksFromLocalStorage() 
{
    var storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        var tasks = JSON.parse(storedTasks);
        var outerArea = document.getElementById("showTask");
        outerArea.innerHTML = ""; 

        tasks.forEach(function(task, index) {
            addTaskToUI(task, index);
        });
    }
}

function addTaskToUI(task, index) 
{
    var outerArea = document.getElementById("showTask");
    var innerArea = document.createElement("div");
    innerArea.innerHTML = `
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="task_${index}" ${task.completed ? 'checked' : ''}>
            <label class="form-check-label" for="task_${index}">
                ${task.name}
            </label>
        </div>`;
    outerArea.appendChild(innerArea);

    document.getElementById(`task_${index}`).addEventListener("change", function() {
        removeTask(index);
    });
}

function toAdd() 
{
    var taskName = document.getElementById("myInput").value;
    if (!taskName) return;
    var storedTasks = localStorage.getItem("tasks");
    var tasks = storedTasks ? JSON.parse(storedTasks) : [];

    tasks.push({ name: taskName, completed: false }); 
    localStorage.setItem("tasks", JSON.stringify(tasks));
    document.getElementById("myInput").value = "";

    addTaskToUI({ name: taskName, completed: false }, tasks.length - 1);
}

function removeTask(index) 
{
    var taskElement = document.getElementById(`task_${index}`);
    taskElement.parentElement.remove();

    var storedTasks = JSON.parse(localStorage.getItem("tasks"));
    storedTasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(storedTasks));
}
