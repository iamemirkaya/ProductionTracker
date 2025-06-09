using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Application.Features.Workshops.Command.UpdateWorkshop
{
    public class UpdateWorkshopCommandRequest : IRequest<Unit>
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

        public int WorkerCount { get; set; }
    }
}
