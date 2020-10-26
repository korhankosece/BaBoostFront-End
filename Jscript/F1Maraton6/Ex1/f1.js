const url = 'https://ergast.com/api/f1/seasons.json?limit=';

export const f1manager = {

    getseasons: async (limit) => {
        let result = await fetch(url + limit)
            .then((res) => res.json())
            .then((data) => data.MRData)
        return result;
    }
}




