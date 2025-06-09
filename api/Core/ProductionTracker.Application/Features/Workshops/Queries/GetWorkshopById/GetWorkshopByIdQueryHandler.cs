using MediatR;
using ProductionTracker.Application.Bases;
using ProductionTracker.Application.Features.Products.BusinessRules;
using ProductionTracker.Application.Features.Products.Queries.GetProductById;
using ProductionTracker.Application.Features.Workshops.BusinessRules;
using ProductionTracker.Application.Interfaces.AutoMapper;
using ProductionTracker.Application.Interfaces.UnitOfWorks;
using ProductionTracker.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Application.Features.Workshops.Queries.GetWorkshopById
{
    public class GetWorkshopByIdQueryHandler : BaseHandler, IRequestHandler<GetWorkshopByIdQueryRequest, GetWorkshopByIdQueryResponse>
    {
        private readonly IMapper mapper;
        private readonly WorkshopBusinessRules workshopBusinessRules;
        public GetWorkshopByIdQueryHandler(IUnitOfWork unitOfWork, IMapper mapper, WorkshopBusinessRules workshopBusinessRules) : base(unitOfWork)
        {
            this.mapper = mapper;
            this.workshopBusinessRules = workshopBusinessRules;
        }

        public async Task<GetWorkshopByIdQueryResponse> Handle(GetWorkshopByIdQueryRequest request, CancellationToken cancellationToken)
        {
            var workshopRepository = unitOfWork.GetReadRepository<Workshop>();

            var workshop = await workshopBusinessRules.EnsureWorkshopExists(request.Id);

            var response = mapper.Map<GetWorkshopByIdQueryResponse, Workshop>(workshop);

            return response;
        }
    }
}
