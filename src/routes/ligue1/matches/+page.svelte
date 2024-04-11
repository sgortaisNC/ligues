<script>
    import matches from "../l1.json";
    const journees = matches.matches; 
    let restant = [];
    let currentJournee= 29;
    journees.forEach((journee,index) => {
        if (index === currentJournee - 1 ){
            journee.forEach((match,mIndex) => {
                restant.push({
                    journee: index,
                    matchIndex: mIndex,
                    match: match
                });
            });
        }
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
    <p>{match.match.home}
        <span> 
        <input type="number" data-j={match.journee} data-i={match.matchIndex} value={match.match.homeScore} on:change={sendHome}>
        -
        <input type="number" data-j={match.journee} data-i={match.matchIndex} value={match.match.extScore} on:change={sendAway}>
        </span>
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
        display: grid;
        grid-template-columns: repeat(3,1fr);
        align-items: center;
        font-size: 14px;
    }
    input{
        width: 75px;
        height: 50px;
    }
</style>