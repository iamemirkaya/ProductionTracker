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
    public class GetAllProductsQueryHandler: BaseHandler, IRequestHandler<GetAllProductsQueryRequest, IList<GetAllProductsQueryResponse>>
    {

        private readonly IMapper mapper;    
        public GetAllProductsQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
            : base(unitOfWork)
        {
            this.mapper = mapper;
        }

        public async Task<IList<GetAllProductsQueryResponse>> Handle(GetAllProductsQueryRequest request, CancellationToken cancellationToken)
        {
            var productRepository = unitOfWork.GetReadRepository<Product>();
            var products = await productRepository.GetAllAsync();

            

            return mapper.Map<GetAllProductsQueryResponse, Product>(products);
        }
    }
}
