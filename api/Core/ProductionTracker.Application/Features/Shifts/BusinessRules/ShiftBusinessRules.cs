using ProductionTracker.Application.Bases;
using ProductionTracker.Application.Features.Shifts.Exceptions;
using ProductionTracker.Application.Interfaces.UnitOfWorks;
using ProductionTracker.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Application.Features.Shifts.BusinessRules
{
    public class ShiftBusinessRules : BaseRules
    {
        private readonly IUnitOfWork unitOfWork;

        public ShiftBusinessRules(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }
        public async Task EnsureShiftNameIsUnique(string name)
        {
            var exists = await unitOfWork.GetReadRepository<Shift>()
                .AnyAsync(p => p.Name.ToLower() == name.ToLower());

            if (exists)
                throw new ShiftNameAlreadyExistsException();
        }


        public async Task<Shift> EnsureShiftExists(Guid id)
        {
            var shift = await unitOfWork.GetReadRepository<Shift>().GetByIdAsync(id);

            if (shift == null)
                throw new ShiftNotFoundException();

            return shift;
        }
    }
}