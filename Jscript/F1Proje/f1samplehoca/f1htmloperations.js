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
let lastjsondata = [];

f1manager.getraces(firstyear, firstround).then((data) => {
    lastjsondata = data.RaceTable.Races[0].Results;
    appendmanager.appendtable(lastjsondata);
})

const appendmanager = {
    appendtable: (data) => {

        $("tbody tr").remove();
        data.forEach(element => {

            $("tbody").append(
                `<tr>
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
    firstyear = $('#yearsselect').val();
    firstround = $('#roundsselect').val();
    f1manager.getraces(firstyear, firstround).then((data) => {
        lastjsondata = data.RaceTable.Races[0].Results;
        appendmanager.appendtable(lastjsondata);
    })

})

let lastclickcolumn = '';
$(document).on('click', 'th', function () {

    let sortcolumn = $(this).attr('value');
    let sorteddata = [];

    if (sortcolumn == lastclickcolumn) {
        sorteddata = _.orderBy(lastjsondata, [sortcolumn], ['desc']);
        lastclickcolumn = '';
    }
    else {
        sorteddata = _.orderBy(lastjsondata, [sortcolumn], ['asc']);
        lastclickcolumn = sortcolumn;
    }

    appendmanager.appendtable(sorteddata);

})


$(document).on('click', '#searchbtn', function () {

    let searchword = $('#searchtext').val();
    let result = lastjsondata.filter(q => q.Driver.givenName.toLowerCase().startsWith(searchword.toLowerCase()));

    appendmanager.appendtable(result);

})






// var users = [
//     { 'user': 'fred',   'age': 48 },
//     { 'user': 'barney', 'age': 36 },
//     { 'user': 'fred',   'age': 40 },
//     { 'user': 'barney', 'age': 34 }
//   ];

//   _.sortBy(users, [function(o) { return o.user; }]);
//   // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]

//   _.sortBy(users, ['user', 'age']);
  // => objects for [['barney', 34], ['barney', 36], ['fred', 40], ['fred', 48]]
