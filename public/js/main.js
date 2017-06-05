// http://epbyminw3375.minsk.epam.com:3000/
window.onload = function() {

    addTeams();
    addSelectTeamListener();
    addFlipListener();
    addBackListener();

}

var addTeams = function() {
    $.get("teamslist", function(data) {
        var teams = data.files;
        var name;

        var teamList = document.getElementById('teamList');
        teams.forEach(function(element, index, array) {
            name = array[index].slice(0, element.length - 5);

            var teamName = document.createElement("li");
            teamName.classList.add('teamName');
            teamName.innerHTML = name;

            teamList.appendChild(teamName);
        })
    });
}

var addSelectTeamListener = function() {
    document.getElementById('teamList').addEventListener('click', function(e) {
        var target = e.target;

        if (target.className == 'teamName') {
            document.getElementById('selector').classList.add('hidden');
            addPeople(target.innerHTML);
        }
    })
}

var addFlipListener = function() {
    document.getElementById('container').addEventListener('click', function(e) {
        var target = e.target;

        if (target.className == 'front' || target.className == 'back') {
            console.log(target);
            target.parentElement.parentElement.classList.toggle('active');
        }
    })
}

var addPeople = function(teamName) {

    $.getJSON(`json/${teamName}.json`, function(data) {
        var names = document.getElementsByClassName('name');
        var people = data.people;
        while (people.length > 0) {
            var target = Math.floor(Math.random() * people.length);
            var current = people.splice(target, 1);
            addElement(current);
        }
    })
    document.getElementById('back').classList.toggle('hidden');
}

var addElement = function(firstName) {
    var card = document.createElement("div");
    card.classList.add('card');
    var flipper = document.createElement("div");
    flipper.classList.add('flipper');
    var front = document.createElement("div");
    front.classList.add('front');
    var back = document.createElement("div");
    back.classList.add('back');
    var name = document.createElement("p");
    name.classList.add('name');

    name.innerHTML = firstName;
    back.appendChild(name);
    flipper.appendChild(front);
    flipper.appendChild(back);
    card.appendChild(flipper);

    document.getElementById('container').appendChild(card);
}

var addBackListener = function() {
    document.getElementById('back').addEventListener('click', function(e) {
        document.getElementById('back').classList.toggle('hidden');
        document.getElementById('container').innerHTML = '';
        document.getElementById('selector').classList.toggle('hidden');
    })
}