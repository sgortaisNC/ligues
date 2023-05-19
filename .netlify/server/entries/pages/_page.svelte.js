import { c as create_ssr_component, d as each, e as escape } from "../../chunks/index2.js";
import "cheerio";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "thead.svelte-2vfhg4 td.svelte-2vfhg4{font-weight:bold}table.svelte-2vfhg4.svelte-2vfhg4{width:100%;height:100vh}tbody.svelte-2vfhg4 tr.svelte-2vfhg4:nth-child(odd){background:#eee}tbody.svelte-2vfhg4 tr.svelte-2vfhg4:nth-last-child(4),tbody.svelte-2vfhg4 tr.svelte-2vfhg4:nth-last-child(3),tbody.svelte-2vfhg4 tr.svelte-2vfhg4:nth-last-child(2),tbody.svelte-2vfhg4 tr.svelte-2vfhg4:nth-last-child(1){background-color:rgb(255, 187, 187)}table.svelte-2vfhg4 tbody tr.releguable td.svelte-2vfhg4:first-child{background-color:rgba(255,0,0,0.2)}table.svelte-2vfhg4 tbody tr.relegue td.svelte-2vfhg4:first-child{background-color:red}table.svelte-2vfhg4 tbody tr.europable td.svelte-2vfhg4:first-child{background-color:rgba(25, 88, 0, 0.4)}table.svelte-2vfhg4 tbody tr.europe td.svelte-2vfhg4:first-child{background-color:rgba(25, 88, 0, 0.8) !important}table.svelte-2vfhg4 tbody tr.top td.svelte-2vfhg4:first-child{background-color:rgba(214, 200, 3, 0.8)}table.svelte-2vfhg4 tbody tr.ldcable td.svelte-2vfhg4:first-child{background-color:rgba(0, 0, 210, 0.4)}table.svelte-2vfhg4 tbody tr.ldc td.svelte-2vfhg4:first-child{background-color:rgba(0, 0, 210, 0.8) !important}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ptsEurope = 0;
  let ptsLDC = 0;
  let ptsPremier = 0;
  let clubs = [];
  $$result.css.add(css);
  return `<table cellpadding="13" cellspacing="0" class="svelte-2vfhg4"><thead class="svelte-2vfhg4"><tr><td class="svelte-2vfhg4">#</td>
            <td class="svelte-2vfhg4">Name</td>
            <td class="svelte-2vfhg4">Pts</td>
            <td class="svelte-2vfhg4">Peut finir 1er</td>
            <td class="svelte-2vfhg4">Peut faire la LDC</td>
            <td class="svelte-2vfhg4">Peut faire l&#39;europe</td>
            <td class="svelte-2vfhg4">L1 la saison pro validé</td></tr></thead>
    <tbody class="svelte-2vfhg4">${each(clubs, (club, index) => {
    return `<tr class="${"" + escape(club.pts <= clubs[16].maxPts ? "releguable " : "", true) + " " + escape(club.maxPts < clubs[16].pts ? "relegue " : "", true) + " " + escape(club.pts >= ptsEurope ? "europe " : "", true) + " " + escape(club.maxPts >= clubs[4].pts ? "europable " : "", true) + " " + escape(club.pts >= ptsLDC ? "ldc " : "", true) + " " + escape(club.maxPts >= clubs[2].pts ? "ldcable " : "", true) + " " + escape(club.pts >= clubs[1].maxPts ? "top " : "", true) + " svelte-2vfhg4"}"><td class="svelte-2vfhg4">${escape(index + 1)}</td>
        <td class="svelte-2vfhg4">${escape(club.name)}</td>
        <td class="svelte-2vfhg4">${escape(club.pts)}</td>
        <td class="svelte-2vfhg4">${escape(club.maxPts >= clubs[0].pts ? "Oui " : "Non")} ${club.pts >= ptsPremier ? `- Validé` : ``}</td>
        <td class="svelte-2vfhg4">${escape(club.maxPts >= clubs[2].pts ? "Oui " : "Non")} ${club.pts >= ptsLDC ? `- Validé` : ``}</td>
        <td class="svelte-2vfhg4">${escape(club.maxPts >= clubs[4].pts ? "Oui " : "Non")} ${club.pts >= ptsEurope ? `- Validé` : ``}</td>
        <td class="svelte-2vfhg4">${escape(club.pts <= clubs[16].maxPts ? "Non" : "Oui")}</td>
        
    </tr>`;
  })}</tbody>
</table>`;
});
export {
  Page as default
};
