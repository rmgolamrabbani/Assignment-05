const cardsContainer = document.getElementById("cardsContainer");
const loadingSpinner = document.getElementById("loadingSpinner");
const allBtn = document.getElementById("allBtn");
const openBtn = document.getElementById("openBtn");
const closedBtn = document.getElementById("closedBtn");
const allSection = document.getElementById("allSection");
const openSection = document.getElementById("openSection");
const closedSection = document.getElementById("closedSection");
const issueCount = document.getElementById("issueCount");
const searchInput = document.getElementById("searchInput");
const buttons = document.querySelectorAll(".toggle-btn");
const issueModal = document.getElementById("issueModal");
const modalTitle = document.getElementById("modalTitle");
const modalStatus = document.getElementById("modalStatus");
const modalPriority = document.getElementById("modalPriority");
const modalLabels = document.getElementById("modalLabels");
const modalDescription = document.getElementById("modalDescription");
const modalAuthor = document.getElementById("modalAuthor");
const modalDate = document.getElementById("modalDate");
const assignee = document.getElementById("assignee");

let allIssues = [];


function showLoading() {
    loadingSpinner.classList.remove("hidden");
    cardsContainer.innerHTML = "";
}

function hideLoading() {
    loadingSpinner.classList.add("hidden");
}





buttons.forEach(button => {

    button.addEventListener("click", () => {

        showLoading();

        buttons.forEach(btn => {
            btn.classList.remove("bg-blue-700", "text-white");
            btn.classList.add("bg-white");
        });

        button.classList.add("bg-blue-700", "text-white");
        button.classList.remove("bg-white");

        const type = button.dataset.type;

        if (type === "all") {
            displayIssues(allIssues);
        } else if (type === "open") {
            const openIssues = allIssues.filter(issue => issue.status === "open");
            displayIssues(openIssues);
        } else if (type === "closed") {
            const closedIssues = allIssues.filter(issue => issue.status === "closed");
            displayIssues(closedIssues);
        }

        hideLoading();
    });

});




async function loadIssues() {

    showLoading();

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();

    //   displayIssues(data.data);

    allIssues = data.data;
    displayIssues(allIssues);

    hideLoading();

}

loadIssues();

function displayIssues(issues) {

    cardsContainer.innerHTML = "";

    issueCount.textContent = issues.length + " Issues";

    issues.forEach(issue => {

        const card = document.createElement("div");

        card.classList.add(
            "card",
            "bg-base-100",
            "shadow-sm",
            "py-2",
            "border-t-4"
        );

        // conditionally add border color

        card.classList.add(issue.status === "open" ?
            "border-green-500" :
            "border-purple-500");

        let priorityClass = "";

        if (issue.priority === "high") {
            priorityClass = "bg-red-100 text-red-400";
        } else if (issue.priority === "medium") {
            priorityClass = "bg-yellow-100 text-yellow-400";
        } else {
            priorityClass = "bg-green-100 text-green-400";
        }


        card.innerHTML = `
         <figure class="justify-between px-4 py-2">
                <div>${issue.status === "open" ? "<img src='assets/Open-Status.png' alt='Open'>" : "<img src='assets/Closed- Status .png' alt='Closed'> "}</div>
                <div class=" ${priorityClass} px-4 rounded-2xl">${issue.priority}</div>
              </figure>

              <div class="card-body py-2 px-4">
               <div>
                <h2 class="text-[18px] font-semibold">${issue.title}</h2>
                <p class="line-clamp-2 opacity-60">${issue.description}</p>
              </div>

                <div class="card-actions flex">
                  <div class="badge badge-outline bg-red-100 text-red-400 px-4 rounded-2xl">
                  <i class="fa-solid fa-bug"></i> ${issue.labels?.[0] || ""}
                  </div>

                  <div class="badge badge-outline bg-yellow-100 text-yellow-400 px-4 rounded-2xl">
                  <i class="fa-solid fa-life-ring"></i> ${issue.labels?.[1] || ""}
                  </div>
                </div>

              </div>

              <hr class="border-t border-base-300 mt-2">

              <div class="card-footer flex justify-between items-center px-4 py-2">
                <div class="flex flex-col gap-2 opacity-60">
                  <p class="text-sm">${issue.author}</p>
                  <p><time>${issue.createdAt}</time></p>
                </div>
              </div>
        `;

        card.addEventListener("click", () => {
  openModal(issue);
});

        cardsContainer.appendChild(card);

    });

}



async function loadIssueDetails(id) {

    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);

    const data = await res.json();

    const issue = data.data;

    showIssueModal(issue);

}



function showIssueModal(issue) {

    document.getElementById("modalTitle").textContent = issue.title;

    document.getElementById("modalDescription").textContent =
        issue.description;

    document.getElementById("modalStatus").textContent =
        "Status: " + issue.status;

    document.getElementById("modalPriority").textContent =
        "Priority: " + issue.priority;

    document.getElementById("modalAuthor").textContent =
        "Author: " + issue.author;

    document.getElementById("modalDate").textContent =
        "Created: " + new Date(issue.createdAt).toLocaleDateString();

    const labelsContainer = document.getElementById("modalLabels");

    labelsContainer.innerHTML = "";

    issue.labels.forEach(label => {

        const span = document.createElement("span");

        span.className = "badge badge-outline";

        span.textContent = label;

        labelsContainer.appendChild(span);

    });

        modal.showModal();

}

searchInput.addEventListener("input", async () => {
    const searchText = searchInput.value.trim(); // .trim() বাড়তি স্পেস সরিয়ে ফেলে

    // যদি সার্চ বক্স খালি থাকে, তবে আগের লোড হওয়া সব ইস্যু (allIssues) দেখাবে
    if (searchText === "") {
        displayIssues(allIssues);
        return;
    }

    // সার্চ বক্স খালি না থাকলে API কল করবে
    try {
        const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`);
        const data = await res.json();
        
        if (data.data) {
            displayIssues(data.data);
        }
    } catch (error) {
        console.error("Search failed:", error);
    }
});



function openModal(issue){

  modalTitle.textContent = issue.title;
  modalStatus.textContent = "" + issue.status;
  modalPriority.textContent = "Priority: " + issue.priority;
  modalLabels.textContent = " " + issue.labels.join(" , ");
  modalDescription.textContent = issue.description;
  modalAuthor.textContent = ".Opened by " + issue.author;
  modalDate.textContent = "." + issue.createdAt;
  assignee.textContent = "Assignee: " + issue.assignee;
 
  if (issue.priority === "high") {
    modalPriority.className = "bg-red-500 text-white px-3 py-1 rounded-3xl";
  } else if (issue.priority === "medium") {
    modalPriority.className = "bg-yellow-500 text-white px-3 py-1 rounded-3xl";
  } else {
    modalPriority.className = "bg-green-500 text-white px-3 py-1 rounded-3xl";
  }

  if (issue.status === "open") {
    modalStatus.className = "bg-green-500 text-white px-3  rounded-3xl";
  } else {
    modalStatus.className = "bg-purple-500 text-white px-3  rounded-3xl";
  }



  issueModal.showModal();

}





