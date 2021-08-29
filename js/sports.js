const buttonClick =() => {
    const inputField = document.getElementById("input-field");
    const inputText = inputField.value;
    inputField.value = "";

    if (inputText.length == "") {
        
    } else {
        const title = document.getElementById("heading")
        title.classList.remove("d-none")
        const url = (`https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${inputText}`)
        fetch(url)
            .then(res => res.json())
            .then(data => displayTeam(data.teams));

    }
}

const displayTeam = teams => {
    console.log(teams);

    const searchResult = document.getElementById("team");
   
    searchResult.textContent = "";
    teams.forEach(team => {
    
        const div = document.createElement("div")
        div.innerHTML = `
        <div onClick="loadTeamDetails('${team.strTeam}')" class=" h-100 border border-warning"  >
          
           
            <img width="200px"  src="${team.strTeamBadge}" " alt="..." />
            <div class="card-body">
            <h5 class="card-title">Name:  ${team.strTeam}</h5>
           
          
        </div>
        </div>
        `;
        searchResult.appendChild(div)
    });
}

const loadTeamDetails = team => {
    
    const url = (`https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${team}`)
    fetch(url)
        .then(res => res.json())
        .then(data => displayTeamDetails(data.teams[0]));
        


}

const displayTeamDetails = teamDetails => {
    window.scrollTo(0,0)
    console.log(teamDetails);
    const teamDetailsDiv = document.getElementById("teamDetails");
    teamDetailsDiv.textContent = "";
    const div = document.createElement("div")
    div.innerHTML = `
   
        <img  src="${teamDetails.strStadiumThumb}" class="card-img-top" alt="..." />
       
        <img width="100px" src="${teamDetails.strTeamBadge}" " alt="..." />
        <div class="card-body">
        <h5 class="card-title"><b>Name:</b>  ${teamDetails.strTeam}</h5>
        <p class=""><b>Alternate:</b> ${teamDetails.strAlternate}</p>
        
        <p class=""><b>Country:</b> ${teamDetails.strCountry}</p>
        <p class=""><b>Stadium:</b> ${teamDetails.strStadium}</p>
        <p class=""><b>Stadium Location:</b> ${teamDetails.strStadiumLocation}</p>
        <p class=""><b>Sport:</b> ${teamDetails.strSport}</p>
        <p class=""><b>League:</b> ${teamDetails.strLeague}, ${teamDetails.strLeague2}, ${teamDetails.strLeague3}, ${teamDetails.strLeague4}, ${teamDetails.strLeague5}, ${teamDetails.strLeague6}, ${teamDetails.strLeague7}</p>
      
    </div>
    </div>
    `;
    teamDetailsDiv.appendChild(div);
}