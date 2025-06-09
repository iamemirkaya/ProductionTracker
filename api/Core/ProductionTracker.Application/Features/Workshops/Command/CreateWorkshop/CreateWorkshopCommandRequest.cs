using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Application.Features.Workshops.Command.CreateWorkshop
{
    public class CreateWorkshopCommandRequest : IRequest<Unit>
    {
        public string Name { get; set; }

        public int WorkerCount { get; set; }
    }
}
