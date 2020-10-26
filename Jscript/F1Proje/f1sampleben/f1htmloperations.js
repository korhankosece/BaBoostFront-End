import { f1manager } from './f1.js'

//Yılların selecte append olduğu alan
let years = f1manager.getyears();
for (let i = 0; i < years.length; i++) {
    $("#yearsselect").append(`
    <option>`+ years[i] + `</option>
    `)
}

// Roundların append olduğu alan
f1manager.getrounds(2005).then((rounds) => {

    for (let i = 0; i < rounds.length; i++) {
        $("#roundsselect").append(`
        <option>`+ rounds[i] + `</option>
        `)
    }
});

//table içeriğinin append olduğu alan
let firstyear = 2004;
let firstround = 1;

f1manager.getraces(firstyear, firstround).then((data) => {
    appendmanager.appendtable(data.RaceTable.Races[0].Results);
})

const appendmanager = {
    appendtable: (data) => {

        $("tbody tr").remove();
        data.forEach(element => {
            $("tbody").append(
                `<tr>
            <td>`+ element.position + `</td>
            <td>`+ element.Driver.givenName + ` ` + element.Driver.familyName + `</td>
            <td>`+ element.Constructor.nationality + `</td>
            <td>`+ element.FastestLap.Time.time + `</td>
            <td>`+ element.FastestLap.AverageSpeed.speed + `</td>
            <td><a href='`+ element.Constructor.url + `' target='_blank'>` + element.Constructor.url + `</a></td>
            </tr>`
            )
        });


    }
}

$('select').change(function () {
    let selectedyearid = $('#yearsselect').val();
    let selectedroundid = $('#roundsselect').val();
    f1manager.getraces(selectedyearid, selectedroundid).then((data) => {
        appendmanager.appendtable(data.RaceTable.Races[0].Results);
    })

})


$("#search").click(function () {
    let search = $("#input1").val()
    let selectedyearid = $('#yearsselect').val();
    let selectedroundid = $('#roundsselect').val();
    let data1 = []
    f1manager.getraces(selectedyearid, selectedroundid).then((data) => {
        for (let i = 0; i < data.RaceTable.Races[0].Results.length; i++) {
            if (data.RaceTable.Races[0].Results[i].Driver.givenName.toLowerCase().includes(search) || data.RaceTable.Races[0].Results[i].Driver.familyName.toLowerCase().includes(search)) {
                data1.push(data.RaceTable.Races[0].Results[i])
            }
        }
        appendmanager.appendtable(data1)
    })
})


$("#count").click(function () {
    let numberinput = $("#input2").val()
    let selectedyearid = $('#yearsselect').val();
    let selectedroundid = $('#roundsselect').val();
    f1manager.getraces(selectedyearid, selectedroundid).then((data) => {
        appendmanager.appendtable(data.RaceTable.Races[0].Results.slice(0, numberinput));
    })
})


var sortnames = false
$("#sort").click(function () {
    f1manager.getraces(selectedyearid, selectedroundid).then((data) => {
        if (sortnames == false) {
            let orderdata = _.orderBy(data.RaceTable.Races[0].Results, ["Driver.givenName"], ["asc"])
            appendmanager.appendtable(orderdata);
            sortnames = true
        } else {
            let orderdata = _.orderBy(data.RaceTable.Races[0].Results, ["Driver.givenName"], ["desc"])
            appendmanager.appendtable(orderdata);
            sortnames = false
        }
    })
})



// data.forEach is not a function

