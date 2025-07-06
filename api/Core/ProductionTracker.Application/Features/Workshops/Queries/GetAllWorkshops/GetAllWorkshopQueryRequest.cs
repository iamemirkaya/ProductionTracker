using MediatR;
using ProductionTracker.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Application.Features.Workshops.Queries.GetAllWorkshops
{
    public class GetAllWorkshopQueryRequest : IRequest<PagedResponse<GetAllWorkshopsQueryResponse>>
    {

        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 5;

    }
}
