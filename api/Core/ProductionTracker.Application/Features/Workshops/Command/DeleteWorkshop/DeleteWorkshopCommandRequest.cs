using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Application.Features.Workshops.Command.DeleteWorkshop
{
    public class DeleteWorkshopCommandRequest : IRequest<Unit>
    {
        public Guid Id { get; set; }
    }
}
