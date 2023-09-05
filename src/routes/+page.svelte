<script>
    import axios from "axios";
    import {onMount} from 'svelte';



    let api_key = '842afe9284cf43acb8efb6faa9505c0f'; // Remplacez par votre clé API
    let clubs = [];
    let nbMaxJ = 36;
    axios.get('https://api.football-data.org/v4/competitions/FL1/standings', {
        withCredentials: false,
        headers: {'X-Auth-Token': api_key}
    }).then(response => {
        const datas = response.data.standings[0].table;

        for (const data of datas) {
            const line = {
                name: data.team.shortName,
                pts: data.points,
                joues: data.playedGames,
                diff: data.goalDifference,
                maxPts: 0
            };
            line.maxPts = line.pts + (3 * (nbMaxJ - line.joues))
            clubs = [...clubs, line];
        }
        //
        // ptsRelegation = clubs[16].pts + (3 * (nbMaxJ - clubs[16].joues));
        // ptsEurope = clubs[5].pts + (3 * (nbMaxJ - clubs[5].joues));
        // ptsLDC = clubs[4].pts + (3 * (nbMaxJ - clubs[4].joues));
        // ptsPremier = clubs[1].pts + (3 * (nbMaxJ - clubs[1].joues));
        console.log(clubs)
    }).catch(err => {
        console.log(err);
    });


    onMount(() => {
        console.log('The component has been mounted');
    });
</script>

<a href="/ligue1">Ligue 1</a>
<a href="/ligue2">Ligue 2</a>

{#each clubs as club}
    {club.name}
{/each}
