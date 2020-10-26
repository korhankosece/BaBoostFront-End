import { f1manager } from './f1.js'

let years = f1manager.getyears();
for (let i = 0; i < years.length; i++) {
    $("#yearsselect").append(`
    <option>`+ years[i] + `</option>
    `)
}

f1manager.getrounds(1950).then((rounds) => {
    for (let i = 0; i < rounds.length; i++) {
        $("#roundsselect").append(`
        <option>`+ rounds[i] + `</option>
        `)
    }
})


let firstyear = 1950;
let firstround = 1;
let firstlimit = 100;
let lastjsondata = [];

f1manager.getraces(firstyear, firstround,firstlimit).then((data) => {
    lastjsondata = data.StandingsTable.StandingsLists[0].DriverStandings;
    appendmanager.appendtable(lastjsondata);
})

const appendmanager = {
    appendtable: (data) => {

        $("tbody tr").remove();
        data.forEach(element => {

            $("tbody").append(
                `<tr>
            <td>`+ element.Driver?.driverId + `</td>
            <td>`+ element.Driver?.givenName + ` ` + element.Driver?.familyName + `</td>
            <td>`+ element.Driver?.dateOfBirth + `</td>
            <td>`+ element.Driver?.nationality + `</td>
            <td>`+ element.points + `</td>
            <td><a href='`+ element.Driver?.url + `' target='_blank'>` + element.Driver?.url + `</a></td>
            </tr>`
            )
        });
    }
}


$('select').change(function () {
    firstyear = $('#yearsselect').val();
    firstround = $('#roundsselect').val();
    f1manager.getraces(firstyear, firstround,firstlimit).then((data) => {
        lastjsondata = data.StandingsTable.StandingsLists[0].DriverStandings;
        appendmanager.appendtable(lastjsondata);
    })

})


$('#limitbtn').click(function () {
    let limitdata = $('#limittext').val()
    appendmanager.appendtable(lastjsondata.slice(0,limitdata))
})


// $('#limitbtn').click(function () {
//     let limitdata = $('#limittext').val()
//     firstyear = $('#yearsselect').val();
//     firstround = $('#roundsselect').val();
//     f1manager.getraces(firstyear, firstround,limitdata).then((data) => {
//         appendmanager.appendtable(data.StandingsTable.StandingsLists[0].DriverStandings);
//     })
// })