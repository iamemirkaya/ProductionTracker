using ProductionTracker.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Domain.Entities
{
    public class Shift : EntityBase
    {
        public string Name { get; set; }

        public int ShiftMinute { get; set; }

        public string StartTime { get; set; } 
        public string EndTime { get; set; }

        public ICollection<ProductionLog> ProductionLogs { get; set; }
    }
}
