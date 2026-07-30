const agentsContainer =
document.getElementById("agents");

const searchInput =
document.getElementById("search");

const sortSelect =
document.getElementById("sort");

let agents = [];

function daysSince(date){

const last = new Date(date);
const now = new Date();

return Math.floor(
(now - last) /
(1000*60*60*24)
);

}

function render(){

let filtered = [...agents];

filtered.forEach(a=>{
a.days = daysSince(a.lastBanner);
});

const search =
searchInput.value.toLowerCase();

filtered = filtered.filter(agent =>
agent.name.toLowerCase()
.includes(search)
);

if(sortSelect.value === "asc"){
filtered.sort((a,b)=>a.days-b.days);
}else{
filtered.sort((a,b)=>b.days-a.days);
}

agentsContainer.innerHTML="";

filtered.forEach(agent=>{

agentsContainer.innerHTML += `
<a href="characters/${agent.id}.html">

<div class="agent">

<img src="${agent.image}">

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

function renderTopWaiting(){

const top =
[...agents]
.map(a=>({
...a,
days:daysSince(a.lastBanner)
}))
.sort((a,b)=>b.days-a.days)
.slice(0,3);

document.getElementById("topWaiting")
.innerHTML = top.map(agent=>`
<div class="top-card">
# ${agent.name}
<br>
${agent.days} дней
</div>
`).join("");

}

fetch("data/characters.json")
.then(r=>r.json())
.then(data=>{

agents = data;

render();

});

searchInput.addEventListener(
"input",
render
);

sortSelect.addEventListener(
"change",
render
);
