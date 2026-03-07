const cardsContainer = document.getElementById("cardsContainer");
const loadingSpinner = document.getElementById("loadingSpinner");
const allBtn = document.getElementById("allBtn");
const openBtn = document.getElementById("openBtn");
const closedBtn = document.getElementById("closedBtn");
const allSection = document.getElementById("allSection");
const openSection = document.getElementById("openSection");
const closedSection = document.getElementById("closedSection");

let allIssues = [];


function showLoading() {
  loadingSpinner.classList.remove("hidden");
  cardsContainer.innerHTML = "";
}

function hideLoading() {
  loadingSpinner.classList.add("hidden");
}



const buttons = document.querySelectorAll(".toggle-btn");

buttons.forEach(button => {

  button.addEventListener("click", () => {

    buttons.forEach(btn => {
      btn.classList.remove("bg-blue-700","text-white");
      btn.classList.add("bg-white");
    });

    button.classList.add("bg-blue-700","text-white");
    button.classList.remove("bg-white");

    const type = button.dataset.type;

    if (type === "all") {
      displayIssues(allIssues);
    }

    else if (type === "open") {
      const openIssues = allIssues.filter(issue => issue.status === "open");
      displayIssues(openIssues);
    }

    else if (type === "closed") {
      const closedIssues = allIssues.filter(issue => issue.status === "closed");
      displayIssues(closedIssues);
    }

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

        card.classList.add(issue.status === "open"
          ? "border-green-500"
          : "border-purple-500");

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
                <div>${issue.status === "open" ? "Open" : "Closed"}</div>
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

        cardsContainer.appendChild(card);

    });

}











