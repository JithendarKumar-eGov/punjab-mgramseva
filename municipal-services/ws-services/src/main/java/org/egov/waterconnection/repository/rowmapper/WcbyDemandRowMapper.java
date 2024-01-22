package org.egov.waterconnection.repository.rowmapper;

import org.egov.waterconnection.web.models.WaterConnectionByDemandGenerationDate;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class WcbyDemandRowMapper implements ResultSetExtractor<List<WaterConnectionByDemandGenerationDate>> {
    @Override
    public List<WaterConnectionByDemandGenerationDate> extractData(ResultSet rs) throws SQLException, DataAccessException {
        List<WaterConnectionByDemandGenerationDate> waterDemandGenerationDateResponseList = new ArrayList<WaterConnectionByDemandGenerationDate>();
        WaterConnectionByDemandGenerationDate waterDemandGenerationDateResponse = new WaterConnectionByDemandGenerationDate();
        while (rs.next()) {
            String taxperiodto = rs.getString("taxperiodto");
            if (!taxperiodto.isEmpty()) {
                waterDemandGenerationDateResponse.setDate(Long.valueOf(taxperiodto));
                waterDemandGenerationDateResponse.setCount(Integer.valueOf(rs.getString("count")));
            }
            waterDemandGenerationDateResponseList.add(waterDemandGenerationDateResponse);
        }
        return waterDemandGenerationDateResponseList;
    }
}
