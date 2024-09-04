---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
---

<h2>Number of expected lives saved via donations</h2>
<table id="impactTable">
  <thead>
    <tr>
      <th>Rank</th>
      <th>Name</th>
      <th>Lives</th>
      <th>Donated</th>
      <th>Cost/life</th>
      <th>Net Worth</th>
    </tr>
  </thead>
  <tbody>
    <!-- Table body will be populated by JavaScript -->
  </tbody>
</table>

<script>
document.addEventListener('DOMContentLoaded', function() {
  // This is where you'd fetch data from an API or external source
  // For now, we'll use dummy data
  const data = [
    { rank: 1, name: "Dustin Moskovitz", impact: "16,000K", donated: "$0.8B", costPerLife: "$50", netWorth: "$5.5B" },
    { rank: 2, name: "Cari Tuna", impact: "16,000K", donated: "$0.8B", costPerLife: "$50", netWorth: "$5.5B" },
    { rank: 3, name: "Bill Gates", impact: "7,000K", donated: "$38B", costPerLife: "$5429", netWorth: "$127B" },
    { rank: 4, name: "Vitalik Buterin", impact: "6,800K", donated: "$1.6B", costPerLife: "$235", netWorth: "$0.9B" },
    { rank: 5, name: "Melinda Gates", impact: "6,440K", donated: "$36B", costPerLife: "$5590", netWorth: "$5.8B" },
    { rank: 6, name: "Warren Buffet", impact: "5,700K", donated: "$32.1B", costPerLife: "$5592", netWorth: "$114.2B" }
  ];

  const tableBody = document.querySelector("#impactTable tbody");
  
  data.forEach(person => {
    const row = tableBody.insertRow();
    row.insertCell(0).textContent = person.rank;
    row.insertCell(1).textContent = person.name;
    row.insertCell(2).textContent = person.impact;
    row.insertCell(3).textContent = person.donated;
    row.insertCell(4).textContent = person.costPerLife;
    row.insertCell(5).textContent = person.netWorth;
  });
});
</script>

Impact List is a project that aims to build and maintain a list which ranks the top ~100 living people by their positive impact on the world via donations. 

The goal is to make the list popular enough to increase the status awarded to those who rank highly, bring more awareness to the importance of donation effectiveness, and ultimately cause people to donate more effectively and/or donate more money to effective causes.

See [this description of the project](https://forum.effectivealtruism.org/posts/LCJa4AAi7YBcyro2H/proposal-impact-list-like-the-forbes-list-except-for-impact) for details.

We're actively seeking volunteers to help with the project. Join [the discord](https://discord.gg/6GNre8U2ta) to see how you can get involved. 

Keep up with the latest developments by following us on [Twitter](https://twitter.com/impactlist_) or [Github](https://github.com/impactlist). Email elliotolds at gmail with any questions.



<!-- 
A simple mockup (with fake data -- [full demo here](https://billionaires-git-impact-ideopunk.vercel.app/)):
![il](impactlist.png) 
-->



