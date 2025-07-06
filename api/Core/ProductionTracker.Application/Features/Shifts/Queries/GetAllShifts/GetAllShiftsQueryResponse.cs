using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Application.Features.Shifts.Queries.GetAllShifts
{
    public class GetAllShiftsQueryResponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

        public int ShiftMinute { get; set; }

        public string StartTime { get; set; }
        public string EndTime { get; set; }
    }
}
