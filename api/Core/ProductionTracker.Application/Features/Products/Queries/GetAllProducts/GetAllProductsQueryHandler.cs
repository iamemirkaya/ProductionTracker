using MediatR;
using ProductionTracker.Application.Bases;
using ProductionTracker.Application.Interfaces.AutoMapper;
using ProductionTracker.Application.Interfaces.UnitOfWorks;
using ProductionTracker.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Application.Features.Products.Queries.GetAllProducts
{
    public class GetAllProductsQueryHandler
        : BaseHandler, IRequestHandler<GetAllProductsQueryRequest, IList<GetAllProductsQueryResponse>>
    {
        public GetAllProductsQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
            : base(unitOfWork, mapper)
        {
        }

        public async Task<IList<GetAllProductsQueryResponse>> Handle(
            GetAllProductsQueryRequest request,
            CancellationToken cancellationToken)
        {
            // Read repository'yi al ve ürünleri getir
            var productRepository = unitOfWork.GetReadRepository<Product>();
            var products = await productRepository.GetAllAsync();

            // AutoMapper aracılığıyla DTO'ya dönüştür
            var mappedProducts = mapper.Map<IList<GetAllProductsQueryResponse>>(products);

            return mappedProducts;
        }
    }
}
