using ProductionTracker.Application.Bases;
using ProductionTracker.Application.Features.Products.Exceptions;
using ProductionTracker.Application.Features.Workshops.Exceptions;
using ProductionTracker.Application.Interfaces.UnitOfWorks;
using ProductionTracker.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Application.Features.Workshops.BusinessRules
{
    public class WorkshopBusinessRules : BaseRules
    {
        private readonly IUnitOfWork unitOfWork;

        public WorkshopBusinessRules(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public async Task<Workshop> EnsureWorkshopExists(Guid id)
        {
            var workshop = await unitOfWork.GetReadRepository<Workshop>().GetByIdAsync(id);

            if (workshop == null)
                throw new WorkshopNotFoundException();

            return workshop;
        }


        public async Task EnsureWorkshopNameIsUnique(string name)
        {
            var exists = await unitOfWork.GetReadRepository<Workshop>()
                .AnyAsync(p => p.Name.ToLower() == name.ToLower());

            if (exists)
                throw new WorkshopNameAlreadyExistsException();
        }
    }
}
