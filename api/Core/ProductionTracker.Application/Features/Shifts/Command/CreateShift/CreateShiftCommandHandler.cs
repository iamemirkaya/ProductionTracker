using MediatR;
using ProductionTracker.Application.Bases;
using ProductionTracker.Application.Features.Shifts.BusinessRules;
using ProductionTracker.Application.Interfaces.UnitOfWorks;
using ProductionTracker.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Application.Features.Shifts.Command.CreateShift
{
    public class CreateShiftCommandHandler : BaseHandler, IRequestHandler<CreateShiftCommandRequest, Unit>
    {
        private readonly ShiftBusinessRules shiftBusinessRules;
        public CreateShiftCommandHandler(IUnitOfWork unitOfWork, ShiftBusinessRules shiftBusinessRules) : base(unitOfWork)
        {
            this.shiftBusinessRules = shiftBusinessRules;
        }

        public async Task<Unit> Handle(CreateShiftCommandRequest request, CancellationToken cancellationToken)
        {
            await shiftBusinessRules.EnsureShiftNameIsUnique(request.Name);


            var writeRepository = unitOfWork.GetWriteRepository<Shift>();
            await writeRepository.AddAsync(new Shift
            {
                Name = request.Name,
                ShiftMinute = request.ShiftMinute,
                EndTime = request.EndTime,
                StartTime = request.StartTime
            });

            await unitOfWork.SaveAsync();

            return Unit.Value;
        }
    }
}
