<script>
    import matches from "../l1.json";
    const journees = matches.matches; 
    let restant = [];
    journees.forEach((journee,index) => {

        journee.forEach((match,mIndex) => {
            if(match.homeScore === null || match.extScore === null){
                restant.push({
                    journee: index,
                    matchIndex: mIndex,
                    match: match
                });
            }
        });
    });

    async function sendHome(e){
        matches.matches[e.target.dataset.j][e.target.dataset.i].homeScore = parseInt(this.value);

        const response = await fetch('/bo/bo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Specify that you're sending JSON
            },
            body: JSON.stringify(matches), // Convert JSON to a string
        });
    }
    async function sendAway(e){
        matches.matches[e.target.dataset.j][e.target.dataset.i].extScore = parseInt(this.value);
        const response = await fetch('/bo/bo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Specify that you're sending JSON
            },
            body: JSON.stringify(matches), // Convert JSON to a string
        });
    }
    
</script>
<div class="grid">
<h1>Liste</h1>
{#each restant as match}
    <p>{match.journee}.{match.matchIndex} <br> {match.match.home} 
        <input type="number" data-j={match.journee} data-i={match.matchIndex} value={match.match.homeScore} on:change={sendHome}>
        -
        <input type="number" data-j={match.journee} data-i={match.matchIndex} value={match.match.extScore} on:change={sendAway}>
        {match.match.ext}
    </p>
{/each}

</div>

<style>
    .grid{
        display: grid;
        place-items: center;
    }
    p{
        width: 100vw;
        text-align: center;
    }
    input{
        width: 75px;
        height: 50px;
    }
</style>