const toggleit = document.getElementById("toggleit");
const drop = document.getElementById("drop");

toggleit.addEventListener("click", () => {
  drop.classList.toggle("hidden");
});

drop.querySelectorAll("li").forEach(item => {
  item.addEventListener("click", () => {
    toggleit.textContent = item.textContent;
    drop.classList.add("hidden");
  });
});

document.addEventListener("click", e => {
  if (!toggleit.contains(e.target) && !drop.contains(e.target)) {
    drop.classList.add("hidden");
  }
});

const form = document.getElementById("jobForm");
const jobList = document.getElementById("jobList");

let editMode = false;
let rowBeingEdited = null;
let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

function saveJobsToStorage() {
  localStorage.setItem("jobs", JSON.stringify(jobs));
}

function renderJobs() {
  jobList.innerHTML = "";
  jobs.forEach((job, index) => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td class="border px-4 py-2">${job.title}</td>
      <td class="border px-4 py-2">${job.postedon}</td>
      <td class="border px-4 py-2">${job.applybefore}</td>
      <td class="border px-4 py-2">${job.level}</td>
      <td class="border px-4 py-2">${job.education}</td>
      <td class="border px-4 py-2">${job.salary}</td>
      <td class="border px-8 py-2 text-center flex flex-col gap-3">
        <button class="h-10 w-25 text-white text-xl bg-indigo-600 hover:bg-indigo-900 edit-btn rounded" data-index="${index}">Edit</button>
        <button class="h-10 w-25 text-white text-xl bg-red-600 hover:bg-red-900 delete-btn rounded" data-index="${index}">Delete</button>
      </td>
    `;
    jobList.appendChild(newRow);
  });
}

form.addEventListener("submit", e => {
  e.preventDefault();

  const job = {
    title: form.elements["title"].value,
    postedon: form.elements["postedon"].value,
    applybefore: form.elements["applybefore"].value,
    level: document.getElementById("toggleit").textContent.trim(),
    education: form.elements["education"].value,
    salary: form.elements["salary"].value,
  };

  if (editMode && rowBeingEdited !== null) {
    jobs[rowBeingEdited] = job;
    editMode = false;
    rowBeingEdited = null;
    form.querySelector('button[type="submit"]').textContent = "Add Job";
  } else {
    jobs.push(job);
  }

  saveJobsToStorage();
  renderJobs();

  form.reset();
  document.getElementById("toggleit").textContent = "Job Level";
});

jobList.addEventListener("click", (e) => {
  const index = e.target.dataset.index;
  const job = jobs[index];

  if (e.target.classList.contains("edit-btn")) {
    form.elements["title"].value = job.title;
    form.elements["postedon"].value = job.postedon;
    form.elements["applybefore"].value = job.applybefore;
    document.getElementById("toggleit").textContent = job.level;
    form.elements["education"].value = job.education;
    form.elements["salary"].value = job.salary;

    editMode = true;
    rowBeingEdited = index;
    form.querySelector('button[type="submit"]').textContent = "Update Job";
  }

  if (e.target.classList.contains("delete-btn")) {
    jobs.splice(index, 1);
    saveJobsToStorage();
    renderJobs();

    if (editMode && rowBeingEdited == index) {
      editMode = false;
      rowBeingEdited = null;
      form.reset();
      form.querySelector('button[type="submit"]').textContent = "Add Job";
      document.getElementById("toggleit").textContent = "Job Level";
    }
  }
});

// Render jobs on initial load
renderJobs();
