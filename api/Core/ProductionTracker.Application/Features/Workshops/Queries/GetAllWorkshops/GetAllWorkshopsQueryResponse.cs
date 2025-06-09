using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Application.Features.Workshops.Queries.GetAllWorkshops
{
    public class GetAllWorkshopsQueryResponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

        public int WorkerCount { get; set; }
    }
}
