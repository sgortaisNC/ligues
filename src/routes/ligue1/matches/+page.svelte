<script>
    import matches from "../l1.json";
    console.log(matches.matches);
    const journees = matches.matches; 
    let restant = [];
    journees.forEach(journee => {
        journee.forEach(match => {
            if(match.homeScore === null){
                restant.push(match);
            }
        });
    });
</script>
<h1>Liste</h1>
{#each restant as match}
    <p>{match.home} - {match.ext}</p>
{/each}
<style></style>