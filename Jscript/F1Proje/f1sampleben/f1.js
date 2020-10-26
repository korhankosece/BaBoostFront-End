
const url = 'https://ergast.com/api/f1/';

export const f1manager = {

    getraces: async (year, round) => {
        let result = await fetch(url + year + '/' + round + '/results.json')
            .then((res) => res.json())
            .then((data) => data.MRData)

        return result;
    },
    getyears: () => {
        var d = new Date();
        var fullyear = d.getFullYear();
        let years = [];
        for (let i = 2004; i <= fullyear; i++) {
            years.push(i);
        }
        return years;
    },
    getrounds: async (year) => {
        
        let rounds = await f1manager.getraces(year, 1).then((res) => {
            let totalrounds = res.total;
            return totalrounds;
        });

        //mesela 20 round var. Bu durumda 20 lik bir dizi oluşturup kullanıcıya veriyorum
        let returnrounds = [];

        for (let i = 1; i <= rounds; i++) {
            returnrounds.push(i);
        }

        return returnrounds;
    }

}


// async function getraces2(year, round) {
//     let result = await fetch(url + year + '/' + round + '/results.json')
//         .then((res) => res.json())
//         .then((data) => {
//             return data;
//         })

//     return result;
// }


// f1manager.getrounds(2008).then((res) => {
//     console.log(res);
// })



