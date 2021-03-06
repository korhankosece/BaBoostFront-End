const url = 'https://ergast.com/api/f1/';

export const f1manager = {

    getraces: async (year, round, limit) => {
        let result = await fetch(url + year + '/' + round + '/driverStandings.json?limit=' + limit)
            .then((res) => res.json())
            .then((data) => data.MRData)
        return result;
    },
    getyears: () => {
        var d = new Date();
        var fullyear = d.getFullYear();
        let years = [];
        for (let i = 1950; i < fullyear; i++) {
            years.push(i);
        }
        return years;
    },
    getrounds: async (year,limit) => {
        let rounds = await f1manager.getraces(year,1,limit).then((res) => {
            let totalrounds = res.total
            return totalrounds;
        });

        let returnrounds = []
        for (let i = 1; i <= rounds;i++){
            returnrounds.push(i);
        }
        return returnrounds
    }

}




