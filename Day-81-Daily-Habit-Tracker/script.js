const habitInput = document.getElementById("habitInput");
const addHabitBtn = document.getElementById("addHabitBtn");
const habitList = document.getElementById("habitList");

// Add new habit
addHabitBtn.addEventListener("click", () => {
    const habitText = habitInput.value.trim();
    if (habitText === "") {
        alert("Please enter a habit!");
        return;
    }

    const li = document.createElement("li");

    // Create a checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    // Habit text span
    const span = document.createElement("span");
    span.textContent = habitText;

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.style.marginLeft = "10px";

    // Mark as completed when checkbox clicked
    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            span.style.textDecoration = "line-through";
            span.style.color = "green";
        } else {
            span.style.textDecoration = "none";
            span.style.color = "black";
        }
    });

    // Delete habit
    deleteBtn.addEventListener("click", () => {
        habitList.removeChild(li);
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    habitList.appendChild(li);

    habitInput.value = "";
});
