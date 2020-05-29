let allUsers = [];
let currentUsers = [];
let usersSection = null;
let countUsers = null;
let searchData = null;
let form = null;
let statisticContainer = null;
let isSearching = false;

window.addEventListener('load', () => {
  getUsers();
  usersSection = document.querySelector('#usersSection');
  countUsers = document.querySelector('#countUsers');
  searchData = document.querySelector('#search');
  statisticContainer = document.querySelector('#statistic');

  form = document.querySelector('form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
  });
});

async function getUsers() {
  const res = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );

  const json = await res.json();

  allUsers = json.results.map((user) => {
    const { name, gender, dob, picture } = user;

    return {
      name,
      age: dob.age,
      picture,
      gender,
    };
  });

  render();
}

function render() {
  renderUsers(allUsers);
  activeSearch();
}

function activeSearch() {
  searchData.focus();
  searchData.addEventListener('keyup', (event) => {
    searchUsers(event.target.value);
  });
}

function renderUsers(list) {
  let userListHTML = '<ul id="usersList">';
  for (user of list) {
    let userHTML = `
      <li id="user">
        <ul>
          <li id="name">
            <img src="${user.picture.thumbnail}" />
            <p>${user.name.first} ${user.name.last}</p>
          </li>
          <li>${user.age}</li>
          <li>${user.gender}</li>
        </ul>
      </li>  
    `;

    userListHTML += userHTML;
  }

  userListHTML += '</ul>';
  usersSection.innerHTML = userListHTML;
  countUsers.textContent = list.length;

  getStatistic(list);
}

function searchUsers(data) {
  if (data === '') {
    renderUsers(allUsers);
    searchData.value = '';
  }

  data = data.toLowerCase();
  currentUsers = allUsers.filter((user) => {
    return (
      user.name.first.includes(data) ||
      user.name.last.includes(data) ||
      user.name.first.toLowerCase().includes(data) ||
      user.name.last.toLowerCase().includes(data)
    );
  });
  renderUsers(currentUsers);
}

function getStatistic(list) {
  let female = list.filter((user) => user.gender === 'female').length;
  let male = list.filter((user) => user.gender === 'male').length;
  let ages = list.reduce((acc, user) => {
    return (acc = acc + user.age);
  }, 0);

  renderStatistic(female, male, ages, (average = ages / list.length));
}

function renderStatistic(numFemale, numMale, ages, averega) {
  let numFormat = Intl.NumberFormat('pt-BR');
  statisticContainer.innerHTML = '';
  let ulHTML = `
    <ul>
      <li>Famele:</li>
      <li>Mele:</li>
      <li>Sum of Ages:</li>
      <li>Average Ages:</li>
    </ul>
    <ul>
      <li>${numFemale}</li>
      <li>${numMale}</li>
      <li>${numFormat.format(ages)}</li>
      <li>${numFormat.format(averega)}</li>
    </ul>
    `;

  statisticContainer.innerHTML += ulHTML;
}
