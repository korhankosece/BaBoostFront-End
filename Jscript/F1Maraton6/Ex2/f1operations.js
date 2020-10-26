import { f1manager } from './f1.js'

let limit = 10;
let lastjsondata = [];

f1manager.getdrivers(limit).then((data) => {
    lastjsondata = data.DriverTable.Drivers;
    appendmanager.appendtable(lastjsondata);
})

const appendmanager = {
    appendtable: (data) => {

        $("tbody tr").remove();
        data.forEach(element => {

            $("tbody").append(
                `<tr>
            <td>`+ element.driverId + `</td>
            <td><a href='`+ element.url + `' target='_blank'>` + element.url + `</a></td>
            <td>`+ element.givenName + ` ` + element.givenName + `</td>
            <td>`+ element.dateOfBirth + `</td>
            <td>`+ element.nationality + `</td>
            </tr>`
            )
        });       
    }
}


$('#limitbtn').click(function () {
    let limitdata = $('#limittext').val()
    f1manager.getdrivers(limitdata).then((data) => {
        appendmanager.appendtable(data.DriverTable.Drivers);
    })
})


