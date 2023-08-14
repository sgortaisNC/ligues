<script>
    import { onMount } from 'svelte';
    import axios from 'axios';
    import { load } from 'cheerio';
    
    const nbMaxJ = 38;
    let ptsRelegation = 0;
    let ptsL1 = 0;
    
    const url = 'https://www.ligue2.fr/classement';
    
    /**
    * @type {any[]}
    */
    let clubs = [];
    
    onMount(async function () {
        const response = await axios.get(url)
        const html = response.data;
        const $ = load(html);
        
        $('.GeneralStats-item--club .desktop-item').each(function() {
            const name = $(this).text().trim();
            const line = {
                name: name,
                pts: $(this).parent().next().text(),
                joues: $(this).parent().next().next().text(),
                diff: $(this).parent().next().next().next().next().next().next().next().next().text(),
                maxPts: 0
            };
            line.maxPts = parseInt(line.pts) + ( 3 * (nbMaxJ - parseInt(line.joues)))
            clubs = [...clubs, line];            
        });
        ptsRelegation = parseInt(clubs[16].pts) + ( 3 * (nbMaxJ - parseInt(clubs[16].joues)));
        ptsL1 = parseInt(clubs[3].pts) + ( 3 * (nbMaxJ - parseInt(clubs[3].joues)));
    });
    
    
    
</script>

<div class="textcenter">
    <a href="/ligue1">L1</a>
</div>
<table cellpadding="13" cellspacing="0">
    <thead>
        <tr>
            <td>#</td>
            <td>Name</td>
            <td>Pts</td>
            <td>GA</td>
            <td>J</td>
        </tr>
    </thead>
    <tbody>
        {#each clubs as club, index}
        <tr class='
        {club.pts <= clubs[16].maxPts ? "releguable " : ""} 
        {club.maxPts < clubs[15].pts ? "relegue " : ""} 
        {club.pts > ptsL1 ? "europe " : ""}
        {club.maxPts >= clubs[16].pts ? "europable " : ""} 
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
        <td>{club.diff}</td>
        <td>{club.joues}</td>
    </tr> 
    {/each}
</tbody>
</table>


<style>
    .textcenter{
        text-align: center;
    }
    thead td{
        font-weight: bold;
    }
    table{
        width: 100%;
        height: 100vh;
    }
    tbody tr:nth-child(odd){
        background: #eee;
    }
    tbody tr:nth-last-child(3),
    tbody tr:nth-last-child(2),
    tbody tr:nth-last-child(1){
        background-color: rgb(255, 187, 187);
    }
    table tbody tr.releguable td:first-child{
        background-color: rgba(255,0,0,0.2);
    }
    table tbody tr.relegue td:first-child{
        background-color: red; 
    }
    table tbody tr.europable td:first-child{
        background-color: rgba(25, 88, 0, 0.4);
    }
    table tbody tr.europe td:first-child{
        background-color: rgba(25, 88, 0, 0.8) !important;
    }
    table tbody tr.top td:first-child{
        background-color: rgba(214, 200, 3, 0.8);
    }
    table tbody tr.ldcable td:first-child{
        background-color: rgba(0, 0, 210, 0.4);
    }
    table tbody tr.ldc td:first-child{
        background-color: rgba(0, 0, 210, 0.8) !important;
    }
</style>
