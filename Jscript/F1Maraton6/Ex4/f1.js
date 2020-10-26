const url = 'https://ergast.com/api/f1/constructors.json?limit=';

export const f1manager = {

    getconstructors: async (limit) => {
        let result = await fetch(url + limit)
            .then((res) => res.json())
            .then((data) => data.MRData)
        return result;
    }
}




