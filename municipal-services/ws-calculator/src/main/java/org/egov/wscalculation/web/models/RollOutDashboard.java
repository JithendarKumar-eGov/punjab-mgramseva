package org.egov.wscalculation.web.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RollOutDashboard {

    private Long id;
    private String tenantid;
    private String projectcode;
    private String zone;
    private String circle;
    private String division;
    private String subdivision;
    private String section;
    private int activeUsersCount;
    private double totalAdvance;
    private double totalPenalty;
    private int totalConnections;
    private int activeConnections;
    private String lastDemandGenDate;
    private int demandGeneratedConsumerCount;
    private double totalDemandAmount;
    private double collectionTillDate;
    private String lastCollectionDate;
    private int expenseCount;
    private int countOfElectricityExpenseBills;
    private int noOfPaidExpenseBills;
    private String lastExpenseTxnDate;
    private double totalAmountOfExpenseBills;
    private double totalAmountOfElectricityBills;
    private double totalAmountOfPaidExpenseBills;
    private String dateRange;
    private Long createdTime;
}
