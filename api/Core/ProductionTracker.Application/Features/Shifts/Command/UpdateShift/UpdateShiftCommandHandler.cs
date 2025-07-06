using MediatR;
using ProductionTracker.Application.Bases;
using ProductionTracker.Application.Features.Shifts.BusinessRules;
using ProductionTracker.Application.Features.Workshops.BusinessRules;
using ProductionTracker.Application.Interfaces.UnitOfWorks;
using ProductionTracker.Domain.Entities;

namespace ProductionTracker.Application.Features.Shifts.Command.UpdateShift
{
    public class UpdateShiftCommandHandler : BaseHandler, IRequestHandler<UpdateShiftCommandRequest, Unit>
    {
        private readonly ShiftBusinessRules shiftBusinessRules;

        public UpdateShiftCommandHandler(IUnitOfWork unitOfWork, ShiftBusinessRules shiftBusinessRules)
            : base(unitOfWork)
        {
            this.shiftBusinessRules = shiftBusinessRules; ;
        }

        public async Task<Unit> Handle(UpdateShiftCommandRequest request, CancellationToken cancellationToken)
        {
            var writeRepository = unitOfWork.GetWriteRepository<Shift>();

            var shift = await shiftBusinessRules.EnsureShiftExists(request.Id);

            shift.Name = request.Name;
            shift.Id = request.Id;
            shift.ShiftMinute = request.ShiftMinute;
            shift.EndTime = request.EndTime;
            shift.StartTime = request.StartTime;
            await writeRepository.UpdateAsync(shift);
            await unitOfWork.SaveAsync();

            return Unit.Value;
        }
    }
}
