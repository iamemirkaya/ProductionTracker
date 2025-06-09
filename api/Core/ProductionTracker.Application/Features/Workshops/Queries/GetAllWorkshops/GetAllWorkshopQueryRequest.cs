﻿using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Application.Features.Workshops.Queries.GetAllWorkshops
{
    public class GetAllWorkshopQueryRequest : IRequest<IList<GetAllWorkshopsQueryResponse>>
    {
    }
}
