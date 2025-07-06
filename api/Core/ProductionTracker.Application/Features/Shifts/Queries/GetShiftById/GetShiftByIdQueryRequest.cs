using MediatR;
using ProductionTracker.Application.Features.Shifts.Queries.GetAllShifts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Application.Features.Shifts.Queries.GetShiftById
{
    public class GetShiftByIdQueryRequest : IRequest<GetAllShiftsQueryResponse>
    {
        public Guid Id { get; set; }
    }
}
