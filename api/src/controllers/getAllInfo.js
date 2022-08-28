const getApiInfo = require('./getApiInfo')
const getDBInfo = require('./getDBInfo')

module.exports = {
    videogames: async function(req, res, next){
        try {
            const {search} = req.query
            if(!search){
                let data = await getApiInfo()
                let myData = await getDBInfo()
                if(!myData || myData.length === 0){
                    if(!data || data.length === 0){
                        return res.status(404).json({msg: "Oops, this game does not exist"})
                    }
                    return res.json(data)
                }
                let totalData = data.concat(myData)
                return res.json(totalData)
            }

            let data = await getApiInfo(search)
            let myData = await getDBInfo(search)
            if(!myData || myData.length === 0){
                if(!data || data.length === 0){
                    return res.status(404).json({msg: "Oops, this game does not exist"})
                }
                return res.json(data)
            }
            let totalData = [...myData, ...data]
            let totalDataSlice = totalData.slice(0, 15)
                return res.json(totalDataSlice)
        } catch (error) {
            return next(error)
        }
    }
}