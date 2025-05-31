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

        public TimeSpan ShiftMinute { get; set; }

        public TimeOnly startTime { get; set; }

        public TimeOnly endTime { get; set; }
    }
}
