---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
---

<h2>Number of expected lives saved via donations</h2>
<table id="impactTable">
  <thead>
    <tr>
      <th data-type="number">Rank</th>
      <th data-type="string">Name</th>
      <th data-type="number">Lives</th>
      <th data-type="number">Donated</th>
      <th data-type="number">Cost/Life</th>
      <th data-type="number">Net Worth</th>
    </tr>
  </thead>
  <tbody>
    <!-- Table body will be populated by JavaScript -->
  </tbody>
</table>

<script>
document.addEventListener('DOMContentLoaded', function() {
  // Load data from _data/people.yml
  const data = [
    {% for person in site.people %}
      {
        name: "{{ person.title }}",
        impact: "{{ person.impact }}",
        donated: "{{ person.donated }}",
        netWorth: "{{ person.netWorth }}"
      }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ];

  // Function to parse dollar amounts
  function parseDollarAmount(value) {
    const numericValue = parseFloat(value.replace(/[$,]/g, ""));
    if (value.includes('B')) return numericValue * 1e9;
    if (value.includes('M')) return numericValue * 1e6;
    if (value.includes('K')) return numericValue * 1e3;
    return numericValue;
  }

  // Sort data by impact
  data.sort((a, b) => parseDollarAmount(b.impact) - parseDollarAmount(a.impact));

  // Assign ranks with tie handling
  let previousRank = 0;
  let previousImpact = Infinity;
  let tieCount = 0;

  data.forEach((person, index) => {
    const personImpact = parseDollarAmount(person.impact);
    if (personImpact < previousImpact) {
      person.rank = previousRank + tieCount + 1;
      previousImpact = personImpact;
      previousRank = person.rank;
      tieCount = 0;
    } else if (personImpact === previousImpact) {
      person.rank = previousRank;
      tieCount++;
    } else if (personImpact > previousImpact) {
        // throw exception
        throw new Error("Person impact is greater than previous impact");
    }
  });

  const table = document.getElementById('impactTable');
  const headers = table.querySelectorAll('th');
  const tableBody = table.querySelector('tbody');

  // Populate the table
  function populateTable(data) {
    tableBody.innerHTML = '';
    data.forEach(person => {
      const row = tableBody.insertRow();
      row.insertCell(0).textContent = person.rank;
      
      // Create a link for the person's name
      const nameCell = row.insertCell(1);
      const nameLink = document.createElement('a');
      nameLink.href = `/${person.name.replace(/\s+/g, '_')}`;
      nameLink.textContent = person.name;
      nameCell.appendChild(nameLink);
      
      row.insertCell(2).textContent = person.impact;
      row.insertCell(3).textContent = person.donated;
      
      // Calculate and display costPerLife
      const impact = parseDollarAmount(person.impact);
      const donated = parseDollarAmount(person.donated);
      const costPerLife = Math.round(donated / impact);
      row.insertCell(4).textContent = `$${costPerLife.toLocaleString()}`;
      
      row.insertCell(5).textContent = person.netWorth;
    });
  }

  // Updated sortTable function
  function sortTable(column, type, asc) {
    const direction = asc ? 1 : -1;
    data.sort((a, b) => {
      let aVal, bVal;
      switch (column) {
        case 0: aVal = a.rank; bVal = b.rank; break;
        case 1: aVal = a.name; bVal = b.name; break;
        case 2: aVal = parseDollarAmount(a.impact); bVal = parseDollarAmount(b.impact); break;
        case 3: aVal = parseDollarAmount(a.donated); bVal = parseDollarAmount(b.donated); break;
        case 4: 
          aVal = parseDollarAmount(a.donated) / parseDollarAmount(a.impact);
          bVal = parseDollarAmount(b.donated) / parseDollarAmount(b.impact);
          break;
        case 5: aVal = parseDollarAmount(a.netWorth); bVal = parseDollarAmount(b.netWorth); break;
      }

      if (type === 'string') {
        return direction * aVal.localeCompare(bVal);
      } else {
        return direction * (aVal - bVal);
      }
    });

    populateTable(data);
  }

  // Updated click event listener for headers
  headers.forEach((header, index) => {
    header.dataset.asc = 'true'; // Initialize the dataset attribute for sort direction

    header.addEventListener('click', () => {
      const type = header.getAttribute('data-type');

      // Remove existing sort classes from all headers
      headers.forEach(h => h.classList.remove('sort-asc', 'sort-desc'));

      // Toggle sort direction based on the current state
      const isAsc = header.dataset.asc === 'true';
      const newAsc = !isAsc; // Toggle the current sort direction
      header.dataset.asc = newAsc.toString(); // Save the new sort direction in the dataset

      if (newAsc) {
        header.classList.add('sort-asc');
      } else {
        header.classList.add('sort-desc');
      }

      sortTable(index, type, newAsc);
    });
  });

  // Initial state
  headers[2].classList.add('sort-desc');
  sortTable(2, 'number', false);
  populateTable(data);
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



