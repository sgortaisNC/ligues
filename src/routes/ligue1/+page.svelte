<script>
    import {onMount} from 'svelte';
    import Menu from '../../components/menu.svelte';
    import * as data from "./l1.json";
    
    
    const nbMaxJ = 34;
    let ptsRelegation = 0;
    let ptsEurope = 0;
    let ptsLDC = 0;
    let ptsPremier = 0;  
    
    
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
            clubs[match.ext].results.push('V');
            clubs[match.home].results.push('D');
            let diff = match.extScore  - match.homeScore;
            clubs[match.ext].diff += diff;
            clubs[match.home].diff -= diff;
        } else if (match.extScore === match.homeScore){
            clubs[match.ext].pts += 1;
            clubs[match.home].pts += 1;
            clubs[match.ext].results.push('N');
            clubs[match.home].results.push('N');
        } else{
            clubs[match.home].pts += 3;
            clubs[match.home].results.push('V');
            clubs[match.ext].results.push('D');
            let diff = match.homeScore - match.extScore;
            clubs[match.ext].diff -= diff;
            clubs[match.home].diff += diff;
        };
        
        console.log(clubs[match.ext].results.length)
        if(clubs[match.ext].results.length > 5){
            clubs[match.ext].results.shift();
        }
        if(clubs[match.home].results.length > 5){
            clubs[match.home].results.shift();
        }
    }
    
    let classement = [];
    
    let clubs = {
        "OGC NICE": {name: 'OGC NICE', pts: 0, joues: 0, diff: 0, maxPts: 0,results: []},
        "PARIS SAINT-GERMAIN": {name: 'PARIS SAINT-GERMAIN', pts: 0, joues: 0, diff: 0, maxPts: 0,results: []},
        "AS MONACO": {name: 'AS MONACO', pts: 0, joues: 0, diff: 0, maxPts: 0,results: []},
        "LOSC LILLE": {name: 'LOSC LILLE', pts: 0, joues: 0, diff: 0, maxPts: 0,results: []},
        "STADE BRESTOIS 29": {name: 'STADE BRESTOIS 29', pts: 0, joues: 0, diff: 0, maxPts: 0,results: []},
        "FC NANTES": {name: 'FC NANTES', pts: 0, joues: 0, diff: 0, maxPts: 0,results: []},
        "STADE DE REIMS": {name: 'STADE DE REIMS', pts: 0, joues: 0, diff: 0, maxPts: 0,results: []},
        "OLYMPIQUE DE MARSEILLE": {name: 'OLYMPIQUE DE MARSEILLE', pts: 0, joues: 0, diff: 0, maxPts: 0,results: []},
        "STADE RENNAIS FC": {name: 'STADE RENNAIS FC', pts: 0, joues: 0, diff: 0, maxPts: 0,results: []},
        "TOULOUSE FC": {name: 'TOULOUSE FC', pts: 0, joues: 0, diff: 0, maxPts: 0,results: []},
        "HAVRE ATHLETIC CLUB": {name: 'HAVRE ATHLETIC CLUB', pts: 0, joues: 0, diff: 0, maxPts: 0,results: []},
        "FC LORIENT": {name: 'FC LORIENT', pts: 0, joues: 0, diff: 0, maxPts: 0,results: []},
        "RC STRASBOURG ALSACE": {name: 'RC STRASBOURG ALSACE', pts: 0, joues: 0, diff: 0, maxPts: 0,results: []},
        "MONTPELLIER HÉRAULT SC": {name: 'MONTPELLIER HÉRAULT SC', pts: -1, joues: 0, diff: 0, maxPts: 0,results: []},
        "RC LENS": {name: 'RC LENS', pts: 0, joues: 0, diff: 0, maxPts: 0,results: []},
        "FC METZ": {name: 'FC METZ', pts: 0, joues: 0, diff: 0, maxPts: 0,results: []},
        "OLYMPIQUE LYONNAIS": {name: 'OLYMPIQUE LYONNAIS', pts: 0, joues: 0, diff: 0, maxPts: 0,results: []},
        "CLERMONT FOOT 63": {name: 'CLERMONT FOOT 63', pts: 0, joues: 0, diff: 0, maxPts: 0,results: []}
    };
        
    data.matches.forEach((journee) => {
        journee.forEach(match => {
            doMatch(match);
        });
    });
    
    classement = Object.values(clubs); 
    
    classement.sort((a, b) => {return b.pts - a.pts || b.diff - a.diff });
    
    classement.forEach(team => {
        team.maxPts = team.pts + (3*(nbMaxJ - team.joues));
        team.sgs = {
            v5: team.results.filter(x => x === "V").length,
            n5: team.results.filter(x => x === "N").length,
        }
    })
    ptsRelegation = classement[16].pts + (3 * (nbMaxJ - classement[16].joues));
    ptsEurope = classement[5].pts + (3 * (nbMaxJ - classement[5].joues));        
    ptsLDC = classement[4].pts + (3 * (nbMaxJ - classement[4].joues));
    ptsPremier = classement[1].pts + (3 * (nbMaxJ - classement[1].joues));
</script>
<Menu />
<table cellpadding="13" cellspacing="0">
    <thead>
        <tr>
            <td>#</td>
            <td>Nom</td>
            <td>Pts</td>
            <td>GA</td>
            <td>J</td>
            <td>Max</td>
            <td>Est.</td>
            <td>Forme</td>
            <td>SGS</td>
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
        <td>
            {#each club.results as res }
            <div class="dot {res}"></div>
            {/each}
        </td>
        <td>{ 
            (
            (((club.sgs.v5*3+ club.sgs.n5) / 5 ) / (club.pts / club.joues)) 
            * (1 + (club.sgs.v5 * 1.15))
            * (1 + (club.sgs.n5 * 1.05))
            ).toFixed(2) }</td>
        </tr>
        {/each}
    </tbody>
</table>


<style>   
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
    
    .dot{
        width: 10px;
        height: 10px;
        border-radius: 50%;
        display: inline-block;
        margin: 0 2px;
    }
    .dot.V{
        background-color: green;
    }
    .dot.D{
        background-color: red;
    }
    .dot.N{
        background-color: grey;
    }
    
</style>
