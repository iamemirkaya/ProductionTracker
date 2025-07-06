using MediatR;
using ProductionTracker.Application.Bases;
using ProductionTracker.Application.DTOs;
using ProductionTracker.Application.Interfaces.AutoMapper;
using ProductionTracker.Application.Interfaces.UnitOfWorks;
using ProductionTracker.Domain.Entities;


namespace ProductionTracker.Application.Features.Workshops.Queries.GetAllWorkshops
{
    public class GetAllWorkshopsQueryHandler : BaseHandler, IRequestHandler<GetAllWorkshopQueryRequest, PagedResponse<GetAllWorkshopsQueryResponse>>
    {
        private readonly IMapper mapper;
        public GetAllWorkshopsQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
            : base(unitOfWork)
        {
            this.mapper = mapper;
        }

        public async Task<PagedResponse<GetAllWorkshopsQueryResponse>> Handle(GetAllWorkshopQueryRequest request, CancellationToken cancellationToken)
        {
            var workshopRepository = unitOfWork.GetReadRepository<Workshop>();

            var workshops = await workshopRepository.GetAllByPagingAsync(
                currentPage: request.Page,
                pageSize: request.PageSize
            );

            var totalCount = await workshopRepository.CountAsync();

            var mappedWorkshops = mapper.Map<GetAllWorkshopsQueryResponse, Workshop>(workshops);

            return new PagedResponse<GetAllWorkshopsQueryResponse>(
                mappedWorkshops,
                totalCount,
                request.Page,
                request.PageSize
            );
        }
    }
}
