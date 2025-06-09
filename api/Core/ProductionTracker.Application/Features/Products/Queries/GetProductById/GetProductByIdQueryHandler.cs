using MediatR;
using ProductionTracker.Application.Bases;
using ProductionTracker.Application.Features.Products.BusinessRules;
using ProductionTracker.Application.Features.Products.Queries.GetAllProducts;
using ProductionTracker.Application.Interfaces.AutoMapper;
using ProductionTracker.Application.Interfaces.UnitOfWorks;
using ProductionTracker.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Application.Features.Products.Queries.GetProductById
{
    public class GetProductByIdQueryHandler : BaseHandler, IRequestHandler<GetProductByIdQueryRequest, GetProductByIdQueryResponse>
    {
        private readonly IMapper mapper;
        private readonly ProductBusinessRules productBusinessRules;
        public GetProductByIdQueryHandler(IUnitOfWork unitOfWork, IMapper mapper, ProductBusinessRules productBusinessRules)
            : base(unitOfWork)
        {
            this.mapper = mapper;
            this.productBusinessRules = productBusinessRules;
        }

        public async Task<GetProductByIdQueryResponse> Handle(GetProductByIdQueryRequest request, CancellationToken cancellationToken)
        {
            var productRepository = unitOfWork.GetReadRepository<Product>();

            var product = await productBusinessRules.EnsureProductExists(request.Id);

            var response = mapper.Map<GetProductByIdQueryResponse, Product>(product);

            return response;
        }
    }
}
