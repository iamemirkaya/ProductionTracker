using MediatR;
using ProductionTracker.Application.Features.Products.Queries.GetAllProducts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Application.Features.Products.Queries.GetProductById
{
    public class GetProductByIdQueryRequest : IRequest<GetProductByIdQueryResponse>
    {
        public Guid Id { get; set; }
    }
}
