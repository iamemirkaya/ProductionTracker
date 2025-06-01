using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Application.Features.Products.Queries.GetAllProducts
{
    public class GetAllProductsQueryResponse
    {
        public string Name { get; set; }

        public string Code { get; set; }

        public decimal UnitPrice { get; set; }
    }
}
