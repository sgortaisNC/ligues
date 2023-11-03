<script>
    import {onMount} from 'svelte';
    import * as data from "./l1.json";
    
    const nbMaxJ = 34;
    let ptsRelegation = 0;
    let ptsEurope = 0;
    let ptsLDC = 0;
    let ptsPremier = 0;  
    
    
    /**
	 * @param {{ home: any; extScore: number; homeScore: number; ext: any; }} match
	 */
    function doMatch(match){
        if (match.homeScore === null) return false;
        if(clubs[match.home] === undefined){
            alert(match.home);
        }
        if(clubs[match.ext] === undefined){
            alert(match.ext);
        }
        clubs[match.home].joues += 1;
        clubs[match.ext].joues += 1;

        if (match.extScore > match.homeScore){
            clubs[match.ext].pts += 3;
            let diff = match.extScore  - match.homeScore;
            clubs[match.ext].diff += diff;
            clubs[match.home].diff -= diff;
        } else if (match.extScore === match.homeScore){
            clubs[match.ext].pts += 1;
            clubs[match.home].pts += 1;
        } else{
            clubs[match.home].pts += 3;
            let diff = match.homeScore - match.extScore;
            clubs[match.ext].diff -= diff;
            clubs[match.home].diff += diff;
        };

    }
    
    let classement = [];
    
    let clubs = {
        "OGC NICE": {name: 'OGC NICE', pts: 0, joues: 0, diff: 0, maxPts: 0},
        "PARIS SAINT-GERMAIN": {name: 'PARIS SAINT-GERMAIN', pts: 0, joues: 0, diff: 0, maxPts: 0},
        "AS MONACO": {name: 'AS MONACO', pts: 0, joues: 0, diff: 0, maxPts: 0},
        "LOSC LILLE": {name: 'LOSC LILLE', pts: 0, joues: 0, diff: 0, maxPts: 0},
        "STADE BRESTOIS 29": {name: 'STADE BRESTOIS 29', pts: 0, joues: 0, diff: 0, maxPts: 0},
        "FC NANTES": {name: 'FC NANTES', pts: 0, joues: 0, diff: 0, maxPts: 0},
        "STADE DE REIMS": {name: 'STADE DE REIMS', pts: 0, joues: 0, diff: 0, maxPts: 0},
        "OLYMPIQUE DE MARSEILLE": {name: 'OLYMPIQUE DE MARSEILLE', pts: 0, joues: 0, diff: 0, maxPts: 0},
        "STADE RENNAIS FC": {name: 'STADE RENNAIS FC', pts: 0, joues: 0, diff: 0, maxPts: 0},
        "TOULOUSE FC": {name: 'TOULOUSE FC', pts: 0, joues: 0, diff: 0, maxPts: 0},
        "HAVRE ATHLETIC CLUB": {name: 'HAVRE ATHLETIC CLUB', pts: 0, joues: 0, diff: 0, maxPts: 0},
        "FC LORIENT": {name: 'FC LORIENT', pts: 0, joues: 0, diff: 0, maxPts: 0},
        "RC STRASBOURG ALSACE": {name: 'RC STRASBOURG ALSACE', pts: 0, joues: 0, diff: 0, maxPts: 0},
        "MONTPELLIER HÉRAULT SC": {name: 'MONTPELLIER HÉRAULT SC', pts: -1, joues: 0, diff: 0, maxPts: 0},
        "RC LENS": {name: 'RC LENS', pts: 0, joues: 0, diff: 0, maxPts: 0},
        "FC METZ": {name: 'FC METZ', pts: 0, joues: 0, diff: 0, maxPts: 0},
        "OLYMPIQUE LYONNAIS": {name: 'OLYMPIQUE LYONNAIS', pts: 0, joues: 0, diff: 0, maxPts: 0},
        "CLERMONT FOOT 63": {name: 'CLERMONT FOOT 63', pts: 0, joues: 0, diff: 0, maxPts: 0}
    };
    
    onMount(function () {
        
        const j1 = data.matches[1 - 1];         
        
        data.matches.forEach((journee) => {
            journee.forEach(match => {
                doMatch(match);
            });
        });

        classement = Object.values(clubs); 

        classement.sort((a, b) => {return b.pts - a.pts || b.diff - a.diff });

        classement.forEach(team => {
            team.maxPts = team.pts + (3*(nbMaxJ - team.joues));
        })

        ptsRelegation = classement[16].pts + (3 * (nbMaxJ - classement[16].joues));
        ptsEurope = classement[5].pts + (3 * (nbMaxJ - classement[5].joues));        
        ptsLDC = classement[4].pts + (3 * (nbMaxJ - classement[4].joues));
        ptsPremier = classement[1].pts + (3 * (nbMaxJ - classement[1].joues));
    });
</script>

<div class="textcenter">
    <a href="/ligue2">L2</a>
</div>
<table cellpadding="13" cellspacing="0">
    <thead>
        <tr>
            <td>#</td>
            <td>Name</td>
            <td>Pts</td>
            <td>GA</td>
            <td>J</td>
            <td>Max</td>
            <td>Est.</td>
        </tr>
    </thead>
    <tbody>
        {#each classement as club, index}
        <tr class='
        {club.pts <= classement[15].maxPts ? "releguable " : ""} 
        {club.maxPts < classement[15].pts ? "relegue " : ""} 
        {club.pts > ptsEurope ? "europe " : ""}
        {club.maxPts >= classement[5].pts ? "europable " : ""} 
        {club.pts > ptsLDC ? "ldc " : ""}
        {club.maxPts >= classement[2].pts ? "ldcable " : ""} 
        '>
        
        <td>
            {index + 1 }
        </td>
        <td>
            {club.name}
        </td>
        <td>
            {club.pts}
        </td>
        <td>{club.diff > 0 ? "+" : ''}{club.diff}</td>
        <td>{club.joues}</td>
        <td>{club.maxPts}</td>
        <td>{Math.round(club.pts + club.pts / club.joues * (nbMaxJ - club.joues))}</td>
    </tr>
    {/each}
</tbody>
</table>


<style>
    .textcenter {
        text-align: center;
    }
    
    thead td {
        font-weight: bold;
    }
    
    table {
        width: 100%;
        height: 100vh;
    }
    
    tbody tr:nth-child(odd) {
        background: #eee;
    }
    
    tbody tr:nth-last-child(3),
    tbody tr:nth-last-child(2),
    tbody tr:nth-last-child(1) {
        background-color: rgb(255, 187, 187);
    }
    
    table tbody tr.releguable td:first-child {
        background-color: rgba(255, 0, 0, 0.2);
    }
    
    table tbody tr.relegue td:first-child {
        background-color: red;
    }
    
    table tbody tr.europable td:first-child {
        background-color: rgba(25, 88, 0, 0.4);
    }
    
    table tbody tr.europe td:first-child {
        background-color: rgba(25, 88, 0, 0.8) !important;
    }
    
    table tbody tr.top td:first-child {
        background-color: rgba(214, 200, 3, 0.8);
    }
    
    table tbody tr.ldcable td:first-child {
        background-color: rgba(0, 0, 210, 0.4);
    }
    
    table tbody tr.ldc td:first-child {
        background-color: rgba(0, 0, 210, 0.8) !important;
    }
</style>
