using MediatR;
using ProductionTracker.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Application.Features.ProductionLogs.Command.CreateProductionLogs
{
    public class CreateProductionLogCommandRequest : IRequest<Unit>
    {
        public Guid WorkshopId { get; set; }

        public Guid ShiftId { get; set; }

        public Guid ProductId { get; set; }

        public DateOnly dateOnly { get; set; }

        public int AbsenceCount { get; set; }

        public int ProducedQuantity { get; set; }
    }
}
