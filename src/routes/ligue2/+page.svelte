<script>
    import {onMount} from 'svelte';
    import axios from 'axios';
    import {load} from 'cheerio';
    import Menu from '../../components/menu.svelte';

    let ptsRelegation = 0;
    let ptsL1 = 0;
    let ptsPlayoff = 0;
    let nbMaxJ = 0;

    const url = 'https://www.ligue2.fr/classement';

    /**
     * @type {any[]}
     */
    let clubs = [];

    onMount(async function () {
        const response = await axios.get(url)
        const html = response.data;
        const $ = load(html);
        nbMaxJ = ($('.GeneralStats-item--club .desktop-item').length - 1) * 2;
        $('.GeneralStats-item--club .desktop-item').each(function () {
            const name = $(this).text().trim();
            const line = {
                name: name,
                pts: parseInt($(this).parent().next().text()),
                joues: parseInt($(this).parent().next().next().text()),
                diff: parseInt($(this).parent().next().next().next().next().next().next().next().next().text()),
                maxPts: 0
            };
            line.maxPts = line.pts + (3 * (nbMaxJ - line.joues));
            clubs = [...clubs, line];
        });
        ptsRelegation = clubs[16].pts + (3 * (nbMaxJ - clubs[16].joues));
        ptsPlayoff = clubs[4].pts + (3 * (nbMaxJ - clubs[4].joues))
        ptsL1 = clubs[1].pts + (3 * (nbMaxJ - clubs[1].joues));
    });


</script>
<Menu/>
<table cellpadding="13" cellspacing="0">
    <thead>
    <tr>
        <td>#</td>
        <td>Name</td>
        <td>Pts</td>
        <td>GA</td>
        <td>J</td>
        <td>Max</td>
        <td>Place Max</td>
    </tr>
    </thead>
    <tbody>
    {#each clubs as club, index}
        <tr class='
        {club.pts >= ptsL1 ? "ldc " : ""}
        {club.maxPts >= clubs[1].pts ? "ldcable " : ""} 
        {club.pts >= ptsPlayoff ? "europe " : ""}
        {club.pts <= clubs.length*2 ? "releguable " : ""}
        {club.maxPts < clubs[15].pts ? "relegue " : ""}
        {club.maxPts >= clubs[4].pts ? "europable " : ""} 
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
            <td>
                {clubs.findIndex((element) => element.pts <= club.maxPts) + 1 }
            </td>
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

    tbody tr:nth-last-child(4),
    tbody tr:nth-last-child(3),
    tbody tr:nth-last-child(2),
    tbody tr:nth-last-child(1) {
        background-color: rgb(255, 187, 187);
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

    table tbody tr.releguable td:first-child {
        background-color: rgba(255, 0, 0, 0.2);
    }
    table tbody tr.relegue td:first-child {
        background-color: red;
    }
</style>
