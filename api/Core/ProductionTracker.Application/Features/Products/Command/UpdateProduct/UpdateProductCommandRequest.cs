using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Application.Features.Products.Command.UpdateProduct
{
    public class UpdateProductCommandRequest : IRequest<Unit>
    {
        public Guid Id { get; set; }                
        public string Name { get; set; }
        public string Code { get; set; }
        public decimal UnitPrice { get; set; }
        public int StockQuantity { get; set; }
        public IFormFile? File { get; set; }
    }
}
