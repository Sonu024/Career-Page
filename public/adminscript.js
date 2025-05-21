const toggleit = document.getElementById("toggleit");
const drop = document.getElementById("drop");
const dropdownContainer = document.getElementById("dropdownContainer");
const form = document.getElementById("jobForm");
const jobList = document.getElementById("jobList");
const modal = document.getElementById("modal");
const editForm = document.getElementById("editForm");
const closeModal = document.getElementById("closeModal");

const modalToggleLevel = document.getElementById("modalToggleLevel");
const modalDropList = document.getElementById("modalDropList");
const modalDropdownContainer = document.getElementById("modalDropdownContainer");

const confirmModal = document.getElementById("confirmModal");
const confirmMessage = document.getElementById("confirmMessage");
const confirmYes = document.getElementById("confirmYes");
const confirmNo = document.getElementById("confirmNo");

let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
let currentEditIndex = null;
let deleteIndex = null;

// Dropdown for main form
toggleit.addEventListener("click", () => drop.classList.toggle("hidden"));
drop.querySelectorAll("li").forEach(item => {
  item.addEventListener("click", () => {
    toggleit.textContent = item.textContent;
    drop.classList.add("hidden");
  });
});
document.addEventListener("click", e => {
  if (!dropdownContainer.contains(e.target)) drop.classList.add("hidden");
});

// Dropdown for modal
modalToggleLevel.addEventListener("click", () => modalDropList.classList.toggle("hidden"));
modalDropList.querySelectorAll("li").forEach(item => {
  item.addEventListener("click", () => {
    modalToggleLevel.textContent = item.textContent;
    modalDropList.classList.add("hidden");
  });
});
document.addEventListener("click", e => {
  if (!modalDropdownContainer.contains(e.target)) modalDropList.classList.add("hidden");
});

// Load jobs to table
function loadJobs() {
  jobList.innerHTML = "";
  jobs.forEach((job, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="border px-4 py-2">${job.title}</td>
      <td class="border px-4 py-2">${job.postedon}</td>
      <td class="border px-4 py-2">${job.applybefore}</td>
      <td class="border px-4 py-2">${job.level}</td>
      <td class="border px-4 py-2">${job.opening}</td>
      <td class="border px-4 py-2">${job.education}</td>
      <td class="border px-4 py-2">${job.salary}</td>
      <td class="border px-4 py-2 text-center">
        <div class="flex">
          <button class="edit-btn bg-indigo-600 text-white rounded px-2 py-1 mr-2 hover:bg-indigo-900" data-index="${index}">Edit</button>
          <button class="delete-btn bg-red-600 text-white rounded px-2 py-1 hover:bg-red-900" data-index="${index}">Delete</button>
        </div>
      </td>
    `;
    jobList.appendChild(row);
  });
}
loadJobs();

// Add job
form.addEventListener("submit", e => {
  e.preventDefault();
  const job = {
    title: form.title.value,
    postedon: form.postedon.value,
    applybefore: form.applybefore.value,
    level: toggleit.textContent.trim(),
    opening: form.opening.value,
    education: form.education.value,
    salary: form.salary.value,
  };
  jobs.push(job);
  localStorage.setItem("jobs", JSON.stringify(jobs));
  form.reset();
  toggleit.textContent = "Job Level";
  loadJobs();
});

// Edit or delete buttons
jobList.addEventListener("click", e => {
  const index = e.target.dataset.index;

  if (e.target.classList.contains("edit-btn")) {
    currentEditIndex = index;
    const job = jobs[index];
    editForm.title.value = job.title;
    editForm.postedon.value = job.postedon;
    editForm.applybefore.value = job.applybefore;
    modalToggleLevel.textContent = job.level;
    editForm.opening.value = job.opening;
    editForm.education.value = job.education;
    editForm.salary.value = job.salary;
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  }

  if (e.target.classList.contains("delete-btn")) {
    deleteIndex = index;
    confirmMessage.textContent = `Are you sure you want to delete "${jobs[index].title}"?`;
    confirmModal.classList.remove("hidden");
    confirmModal.classList.add("flex");
  }
});

// Confirm delete
confirmYes.addEventListener("click", () => {
  if (deleteIndex !== null) {
    jobs.splice(deleteIndex, 1);
    localStorage.setItem("jobs", JSON.stringify(jobs));
    loadJobs();
  }
  confirmModal.classList.add("hidden");
  confirmModal.classList.remove("flex");
  deleteIndex = null;
});

confirmNo.addEventListener("click", () => {
  confirmModal.classList.add("hidden");
  confirmModal.classList.remove("flex");
  deleteIndex = null;
});

// Update job
editForm.addEventListener("submit", e => {
  e.preventDefault();
  jobs[currentEditIndex] = {
    title: editForm.title.value,
    postedon: editForm.postedon.value,
    applybefore: editForm.applybefore.value,
    level: modalToggleLevel.textContent.trim(),
    opening: editForm.opening.value,
    education: editForm.education.value,
    salary: editForm.salary.value,
  };
  localStorage.setItem("jobs", JSON.stringify(jobs));
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  loadJobs();
});

// Close edit modal
closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
});
