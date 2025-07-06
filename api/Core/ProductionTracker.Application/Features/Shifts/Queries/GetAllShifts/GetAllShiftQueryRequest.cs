using MediatR;
using ProductionTracker.Application.Features.Workshops.Queries.GetAllWorkshops;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Application.Features.Shifts.Queries.GetAllShifts
{
    public class GetAllShiftQueryRequest : IRequest<IList<GetAllShiftsQueryResponse>>
    {
    }
}
