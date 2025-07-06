using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Application.Features.Shifts.Command.DeleteShift
{
    public class DeleteShiftCommandRequest : IRequest<Unit>
    {
        public Guid Id { get; set; }
    }
}
