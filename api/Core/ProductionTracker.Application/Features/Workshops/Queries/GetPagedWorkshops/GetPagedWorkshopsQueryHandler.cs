using MediatR;
using ProductionTracker.Application.Bases;
using ProductionTracker.Application.DTOs;
using ProductionTracker.Application.Interfaces.AutoMapper;
using ProductionTracker.Application.Interfaces.UnitOfWorks;
using ProductionTracker.Domain.Entities;
using System.Linq.Expressions;

namespace ProductionTracker.Application.Features.Workshops.Queries.GetPagedWorkshops
{
    public class GetPagedWorkshopsQueryHandler : BaseHandler, IRequestHandler<GetPagedWorkshopsQueryRequest, PagedResponse<GetPagedWorkshopsQueryResponse>>
    {
        private readonly IMapper mapper;
        public GetPagedWorkshopsQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
            : base(unitOfWork)
        {
            this.mapper = mapper;
        }

        public async Task<PagedResponse<GetPagedWorkshopsQueryResponse>> Handle(GetPagedWorkshopsQueryRequest request, CancellationToken cancellationToken)
        {
            var workshopRepository = unitOfWork.GetReadRepository<Workshop>();

            Expression<Func<Workshop, bool>>? predicate = null;
            if (!string.IsNullOrWhiteSpace(request.SearchTerm))
            {
                predicate = workshop => workshop.Name.Contains(request.SearchTerm);
            }

            var workshops = await workshopRepository.GetAllByPagingAsync(
                predicate: predicate, 
                currentPage: request.Page,
                pageSize: request.PageSize
            );

            var totalCount = await workshopRepository.CountAsync(predicate);

            var mappedWorkshops = mapper.Map<GetPagedWorkshopsQueryResponse, Workshop>(workshops);

            return new PagedResponse<GetPagedWorkshopsQueryResponse>(
                mappedWorkshops,
                totalCount,
                request.Page,
                request.PageSize
            );
        }
    }
}
