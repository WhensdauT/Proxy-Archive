const params =
new URLSearchParams(window.location.search);

const agentId =
params.get("id");

fetch("../data/characters.json")
.then(response => response.json())
.then(characters => {

    const agent =
    characters.find(
        character =>
        character.id === agentId
    );

    if(!agent){

        document.getElementById(
            "agentPage"
        ).innerHTML =
        "<h1>Agent not found</h1>";

        return;
    }

    const days =
    Math.floor(
        (
            new Date() -
            new Date(agent.lastBanner)
        )
        /
        86400000
    );

    document.getElementById(
        "agentPage"
    ).innerHTML = `

        <div class="agent-card">

            <img
                class="agent-image"
                src="../${agent.image}"
                alt="${agent.name}"
            >

            <div class="agent-info">

                <h1>${agent.name}</h1>

                <p>
                    <strong>Faction:</strong>
                    ${agent.faction}
                </p>

                <p>
                    <strong>Rank:</strong>
                    ${agent.rank}
                </p>

                <p>
                    <strong>Attribute:</strong>
                    ${agent.attribute}
                </p>

                <p>
                    <strong>Specialty:</strong>
                    ${agent.specialty}
                </p>

                <p>
                    <strong>Last Banner:</strong>
                    ${agent.lastBanner}
                </p>

                <p class="days">

                    ${days} days
                    without rerun

                </p>

                <a
                    class="back-btn"
                    href="../index.html"
                >
                    ← Back
                </a>

            </div>

        </div>
    `;
});
