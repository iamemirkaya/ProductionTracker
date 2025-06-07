using ProductionTracker.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Domain.Entities
{
    public class Product : EntityBase
    {
        public string Name { get; set; }

        public string Code { get; set; }

        public decimal UnitPrice { get; set; }

        public string? ImageUrl { get; set; }

        public int StockQuantity { get; set; }

        public string? PublicId { get; set; }
    }
}
