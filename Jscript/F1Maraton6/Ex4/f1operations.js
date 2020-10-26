import { f1manager } from './f1.js'

let limit = 100;
let lastjsondata = [];

f1manager.getconstructors(limit).then((data) => {
    lastjsondata = data.ConstructorTable.Constructors;
    appendmanager.appendtable(lastjsondata);
})

const appendmanager = {
    appendtable: (data) => {

        $("tbody tr").remove();
        data.forEach(element => {

            $("tbody").append(
                `<tr>
            <td>`+ element.constructorId + `</td>
            <td><a href='`+ element.url + `' target='_blank'>` + element.url + `</a></td>
            <td>`+ element.name + `</td>
            <td>`+ element.nationality + `</td>
            </tr>`
            )
        });       
    }
}


$('#limitbtn').click(function () {
    let limitdata = $('#limittext').val()
    f1manager.getconstructors(limitdata).then((data) => {
        appendmanager.appendtable(data.ConstructorTable.Constructors);
    })
})


