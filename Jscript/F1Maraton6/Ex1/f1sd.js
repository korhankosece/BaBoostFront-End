const url = 'https://ergast.com/api/f1/';

export const f1manager = {

    getraces: async (secilenid, round) => {
        let result = await fetch(url + secilenid + '/' + round + '/results.json')
            .then((res) => res.json())
            .then((data) => data.MRData)

        return result;
    },
    getrounds: async (secilenid) => {

        let rounds = await f1manager.getraces(secilenid, 1).then((res) => {
            let totalrounds = res.total;
            return totalrounds;
        });

        let returnrounds = [];

        for (let i = 1; i <= rounds; i++) {
            returnrounds.push(i);
        }

        return returnrounds;
    }

}