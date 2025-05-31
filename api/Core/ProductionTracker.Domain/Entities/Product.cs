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
    }
}
