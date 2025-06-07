using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Application.Features.Products.Command.CreateProduct
{
    public class CreateProductCommandRequest : IRequest<Unit>
    {
        public string Name { get; set; }

        public string Code { get; set; }

        public decimal UnitPrice { get; set; }

        public IFormFile File { get; set; } = null!;

        public int StockQuantity { get; set; }
    }
}
