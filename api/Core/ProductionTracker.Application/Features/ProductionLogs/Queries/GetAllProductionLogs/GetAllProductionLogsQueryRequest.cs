using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Application.Features.ProductionLogs.Queries.GetAllProductionLogs
{
    public class GetAllProductionLogsQueryRequest : IRequest<IList<GetAllProductionLogsQueryResponse>>
    {
        public Guid? ShiftId { get; set; }
        public Guid? WorkshopId { get; set; }
        public Guid? ProductId { get; set; }
        public DateOnly? DateOnly { get; set; }
    }
}
