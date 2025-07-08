using MediatR;
using ProductionTracker.Application.DTOs;
using ProductionTracker.Application.Features.Workshops.Queries.GetAllWorkshops;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Application.Features.Workshops.Queries.GetPagedWorkshops
{
    public class GetPagedWorkshopsQueryRequest : IRequest<PagedResponse<GetPagedWorkshopsQueryResponse>>
    {
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 5;

        public string? SearchTerm { get; set; }
    }
}
