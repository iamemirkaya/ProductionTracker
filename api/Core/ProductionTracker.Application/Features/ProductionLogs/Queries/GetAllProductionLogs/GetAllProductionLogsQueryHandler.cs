using MediatR;
using Microsoft.EntityFrameworkCore;
using ProductionTracker.Application.Bases;
using ProductionTracker.Application.Common.Extensions;
using ProductionTracker.Application.Interfaces.AutoMapper;
using ProductionTracker.Application.Interfaces.UnitOfWorks;
using ProductionTracker.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Application.Features.ProductionLogs.Queries.GetAllProductionLogs
{
    public class GetAllProductionLogsQueryHandler : BaseHandler, IRequestHandler<GetAllProductionLogsQueryRequest, IList<GetAllProductionLogsQueryResponse>>
    {
        private readonly IMapper mapper;
        public GetAllProductionLogsQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
            : base(unitOfWork)
        {
            this.mapper = mapper;
        }

        public async Task<IList<GetAllProductionLogsQueryResponse>> Handle(GetAllProductionLogsQueryRequest request, CancellationToken cancellationToken)
        {
            var productionLogRepository = unitOfWork.GetReadRepository<ProductionLog>();

            Expression<Func<ProductionLog, bool>> predicate = p =>
                (!request.ShiftId.HasValue || p.ShiftId == request.ShiftId) &&
                (!request.WorkshopId.HasValue || p.WorkshopId == request.WorkshopId) &&
                (!request.ProductId.HasValue || p.ProductId == request.ProductId) &&
                (!request.DateOnly.HasValue || p.dateOnly == request.DateOnly);

            var productions = await productionLogRepository.GetAllAsync(
                predicate: predicate,
                include: q => q
                    .Include(p => p.Shift)
                    .Include(p => p.Workshop)
                    .Include(p => p.Product));
            var result = mapper.Map<GetAllProductionLogsQueryResponse, ProductionLog>(productions);
            return result;
        }
    }
}
