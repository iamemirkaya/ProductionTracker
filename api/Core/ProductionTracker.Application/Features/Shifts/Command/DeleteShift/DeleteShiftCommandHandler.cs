using MediatR;
using ProductionTracker.Application.Features.Workshops.BusinessRules;
using ProductionTracker.Application.Interfaces.UnitOfWorks;
using ProductionTracker.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Application.Features.Shifts.Command.DeleteShift
{
    public class DeleteShiftCommandHandler : IRequestHandler<DeleteShiftCommandRequest, Unit>
    {
        private readonly IUnitOfWork unitOfWork;

        public DeleteShiftCommandHandler(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public async Task<Unit> Handle(DeleteShiftCommandRequest request, CancellationToken cancellationToken)
        {
            var shift = await unitOfWork.GetReadRepository<Shift>().GetByIdAsync(request.Id);

            await unitOfWork.GetWriteRepository<Shift>().SoftDeleteAsync(shift);

            await unitOfWork.SaveAsync();

            return Unit.Value;
        }
    }
}
