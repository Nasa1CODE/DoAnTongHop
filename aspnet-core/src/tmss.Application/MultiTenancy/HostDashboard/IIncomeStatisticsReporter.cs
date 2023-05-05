using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using tmss.MultiTenancy.HostDashboard.Dto;

namespace tmss.MultiTenancy.HostDashboard
{
    public interface IIncomeStatisticsService
    {
        Task<List<IncomeStastistic>> GetIncomeStatisticsData(DateTime startDate, DateTime endDate,
            ChartDateInterval dateInterval);
    }
}