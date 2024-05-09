function mySearch()
{
    var taskName = document.getElementById("myInput").value;
    outerArea = document.getElementById("showTask");
    localStorage.setItem("tn", JSON.stringify(taskName))
    document.getElementById("myInput").value = "";

    var innerArea = document.createElement("div");
    innerArea.innerHTML = `<div class="form-check">
    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
    <label class="form-check-label" for="flexCheckDefault">
      ${taskName}
    </label>
    </div>`;
    outerArea.appendChild(innerArea);
    const userData = JSON.parse(localStorage.getItem('tn'));
};

window.onbeforeunload = function() {
    localStorage.setItem("tn", taskName);
};

window.onload = function() {
    var name = localStorage.getItem("tn");
    if (name !== null) $('#loadTask').val(name);
    alert(name);
};