using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Application.Features.Workshops.Queries.GetWorkshopById
{
    public class GetWorkshopByIdQueryRequest : IRequest<GetWorkshopByIdQueryResponse>
    {
        public Guid Id { get; set; }
    }
}
