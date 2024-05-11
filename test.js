document.getElementById("clearLocalStorageButton").addEventListener("click", function() {
    localStorage.clear();
    document.getElementById("showTask").innerHTML = "";
});

document.addEventListener("DOMContentLoaded", function() {
    loadTasksFromLocalStorage();
});

function loadTasksFromLocalStorage() {
    var storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        var tasks = JSON.parse(storedTasks);
        var outerArea = document.getElementById("showTask");
        outerArea.innerHTML = ""; 

        tasks.forEach(function(task, index) {
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
                updateTaskCompletionStatus(index, this.checked);
            });

            innerArea.addEventListener("click", function() {
                removeTask(index);
            });
        });
    }
}

function toAdd() {
    var taskName = document.getElementById("myInput").value;
    var storedTasks = localStorage.getItem("tasks");
    var tasks = storedTasks ? JSON.parse(storedTasks) : [];

    tasks.push({ name: taskName, completed: false }); 
    localStorage.setItem("tasks", JSON.stringify(tasks));
    document.getElementById("myInput").value = "";

    var outerArea = document.getElementById("showTask");
    var innerArea = document.createElement("div");
    var index = tasks.length - 1;
    innerArea.innerHTML = `
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="task_${index}">
            <label class="form-check-label" for="task_${index}">
                ${taskName}
            </label>
        </div>`;
    outerArea.appendChild(innerArea);

    document.getElementById(`task_${index}`).addEventListener("change", function() {
        updateTaskCompletionStatus(index, this.checked);
    });

    innerArea.addEventListener("click", function() {
        removeTask(index);
    });
};

function updateTaskCompletionStatus(index, completed) {
    var storedTasks = JSON.parse(localStorage.getItem("tasks"));
    storedTasks[index].completed = completed;
    localStorage.setItem("tasks", JSON.stringify(storedTasks));
}

function removeTask(index) {
    var storedTasks = JSON.parse(localStorage.getItem("tasks"));
    storedTasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(storedTasks));
    loadTasksFromLocalStorage(); 
}
