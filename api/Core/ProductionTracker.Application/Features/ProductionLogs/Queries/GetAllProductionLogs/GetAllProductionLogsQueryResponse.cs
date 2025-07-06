using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Application.Features.ProductionLogs.Queries.GetAllProductionLogs
{
    public class GetAllProductionLogsQueryResponse
    {

        public Guid Id { get; set; }
        public string ShiftName { get; set; }

        public string WorkshopName { get; set; }

        public string ProductName { get; set; }

        public DateOnly dateOnly { get; set; }

        public int AbsenceCount { get; set; }

        public int ProducedQuantity { get; set; }
    }
}
