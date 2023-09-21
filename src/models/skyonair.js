const { get } = require('../db/pool-manager');
config_skyonair = require('../config/dbconfig-skyonair'),
sql = require('mssql');

class SkyOnAirModel {
    async getRacesTab(entity) {
        let result = '';
        try {

            const pool = await get('skyonairpool', config_skyonair);

            result = await pool.request()
                .input('meetingDate', entity.date)
                .execute('spGetRacesTAB'); 
                
        } catch (error) {
            console.log(error);
        }

        return result;
    }
}

module.exports = {
    SkyOnAirModel: SkyOnAirModel
};
