import {f1manager} from './f1sd.js'

var secilenid = localStorage.getItem('season');

f1manager.getrounds(secilenid).then((rounds) => {

    for (let i = 0; i < rounds.length; i++) {
        $("#roundsselect").append(
        "<option>"+ rounds[i] + "</option>"
        )
    }
});


let firstround = 1;
let lastjsondata = [];

f1manager.getraces(secilenid, firstround).then((data) => {
    lastjsondata = data.RaceTable.Races[0].Results;
    appendmanager.appendtable(lastjsondata);
})


const appendmanager = {

    appendtable: (data) => {

        $("tbody tr").remove();
        data.forEach(element => {

            $("tbody").append(`
                <tr>
            <td>`+ element.position + `</td>
            <td>`+ element.Driver?.givenName + ` ` + element.Driver?.familyName + `</td>
            <td>`+ element.Constructor?.nationality + `</td>
            <td>`+ element.FastestLap?.Time?.time + `</td>
            <td>`+ element.FastestLap?.AverageSpeed?.speed + `</td>
            <td><a href='`+ element.Constructor?.url + `' target='_blank'>` + element.Constructor?.url + `</a></td>
            </tr>`
            )
        });
    }
}

$('select').change(function () {
    firstround = $('#roundsselect').val();
    f1manager.getraces(secilenid, firstround).then((data) => {
        lastjsondata = data.RaceTable.Races[0].Results;
        appendmanager.appendtable(lastjsondata);
    })

})