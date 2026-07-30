const agentsContainer =
document.getElementById("agents");

const searchInput =
document.getElementById("search");

const sortSelect =
document.getElementById("sort");

let agents = [];

function daysSince(date){

    const lastDate =
    new Date(date);

    const today =
    new Date();

    return Math.floor(
        (today - lastDate) /
        (1000 * 60 * 60 * 24)
    );
}

function renderTopWaiting(){

    const topAgents =
    [...agents]
    .map(agent => ({
        ...agent,
        days: daysSince(agent.lastBanner)
    }))
    .sort((a,b) => b.days - a.days)
    .slice(0,3);

    document.getElementById("topWaiting")
    .innerHTML =
    topAgents.map(agent => `

        <div class="top-card">

            <h3>${agent.name}</h3>

            <div class="days">
                ${agent.days} дней
            </div>

        </div>

    `).join("");
}

function renderAgents(){

    let filtered =
    [...agents];

    const search =
    searchInput.value.toLowerCase();

    filtered =
    filtered.filter(agent =>
        agent.name
        .toLowerCase()
        .includes(search)
    );

    filtered =
    filtered.map(agent => ({
        ...agent,
        days: daysSince(agent.lastBanner)
    }));

    if(sortSelect.value === "asc"){

        filtered.sort(
            (a,b) =>
            a.days - b.days
        );

    }else{

        filtered.sort(
            (a,b) =>
            b.days - a.days
        );

    }

    agentsContainer.innerHTML = "";

    filtered.forEach(agent => {

        agentsContainer.innerHTML += `

            <a
                href="characters/agent.html?id=${agent.id}"
                class="agent-link"
            >

                <div class="agent">

                    <img
                        src="${agent.image}"
                        alt="${agent.name}"
                    >

                    <h3>${agent.name}</h3>

                    <div class="days">
                        ${agent.days} дней
                    </div>

                </div>

            </a>

        `;
    });

    renderTopWaiting();
}

fetch("data/characters.json")
.then(response => response.json())
.then(data => {

    agents = data;

    renderAgents();

});

searchInput.addEventListener(
    "input",
    renderAgents
);

sortSelect.addEventListener(
    "change",
    renderAgents
);
