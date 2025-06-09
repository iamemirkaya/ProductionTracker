using MediatR;
using ProductionTracker.Application.Bases;
using ProductionTracker.Application.Interfaces.AutoMapper;
using ProductionTracker.Application.Interfaces.UnitOfWorks;
using ProductionTracker.Domain.Entities;


namespace ProductionTracker.Application.Features.Workshops.Queries.GetAllWorkshops
{
    public class GetAllWorkshopsQueryHandler : BaseHandler, IRequestHandler<GetAllWorkshopQueryRequest, IList<GetAllWorkshopsQueryResponse>>
    {
        private readonly IMapper mapper;
        public GetAllWorkshopsQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
            : base(unitOfWork)
        {
            this.mapper = mapper;
        }

        public async Task<IList<GetAllWorkshopsQueryResponse>> Handle(GetAllWorkshopQueryRequest request, CancellationToken cancellationToken)
        {
            var workshopRepository = unitOfWork.GetReadRepository<Workshop>();
            var workshops = await workshopRepository.GetAllAsync();



            return mapper.Map<GetAllWorkshopsQueryResponse, Workshop>(workshops);
        }
    }
}
