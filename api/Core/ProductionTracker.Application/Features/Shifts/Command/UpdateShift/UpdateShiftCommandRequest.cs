using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Application.Features.Shifts.Command.UpdateShift
{
    public class UpdateShiftCommandRequest : IRequest<Unit>
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

        public int ShiftMinute { get; set; }

        public string StartTime { get; set; }
        public string EndTime { get; set; }
    }
}
