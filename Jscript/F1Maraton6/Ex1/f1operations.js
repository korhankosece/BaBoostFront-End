import { f1manager } from './f1.js'

let limit = 100;
let lastjsondata = [];

f1manager.getseasons(limit).then((data) => {
    lastjsondata = data.SeasonTable.Seasons;
    appendmanager.appendtable(lastjsondata);
})

const appendmanager = {
    appendtable: (data) => {

        $("tbody tr").remove();
        data.forEach(element => {

            $("tbody").append(
                `<tr>
            <td id='` + element.season + `'>`+ element.season + `</td>
            <td><a href='`+ element.url + `' target='_blank'>` + element.url + `</a></td>
            </tr>`
            )
        });       
    }
}


$('#limitbtn').click(function () {
    let limitdata = $('#limittext').val()
    f1manager.getseasons(limitdata).then((data) => {
        appendmanager.appendtable(data.SeasonTable.Seasons);
    })
})


$(document).on("click", "td", function () {
    var seasonid = $(this).attr("id");
    localStorage.setItem("season",seasonid);
    window.open('seasondetail.html','_blank');
})

