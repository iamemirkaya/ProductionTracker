using ProductionTracker.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Domain.Entities
{
    public class ProductionLog : EntityBase
    {
        public Guid WorkshopId { get; set; }
        public Workshop Workshop { get; set; }

        public Guid ShiftId { get; set; }
        public Shift Shift { get; set; }

        public Guid ProductId { get; set; }

        public Product Product { get; set; }

        public DateOnly dateOnly { get; set; }

        public int AbsenceCount { get; set; }
    }
}
