using MediatR;
using ProductionTracker.Application.Bases;
using ProductionTracker.Application.Features.Products.BusinessRules;
using ProductionTracker.Application.Features.Workshops.BusinessRules;
using ProductionTracker.Application.Interfaces.ImageService;
using ProductionTracker.Application.Interfaces.UnitOfWorks;
using ProductionTracker.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Application.Features.Workshops.Command.UpdateWorkshop
{
    public class UpdateWorkshopCommandHandler : BaseHandler, IRequestHandler<UpdateWorkshopCommandRequest, Unit>
    {

        private readonly WorkshopBusinessRules workshopBusinessRules;

        public UpdateWorkshopCommandHandler(IUnitOfWork unitOfWork, WorkshopBusinessRules workshopBusinessRules)
            : base(unitOfWork)
        {
            this.workshopBusinessRules = workshopBusinessRules;;
        }

        public async Task<Unit> Handle(UpdateWorkshopCommandRequest request, CancellationToken cancellationToken)
        {
            var writeRepository = unitOfWork.GetWriteRepository<Workshop>();

            var workshop = await workshopBusinessRules.EnsureWorkshopExists(request.Id);

            workshop.Name = request.Name;
            workshop.WorkerCount = request.WorkerCount; 
            
            await writeRepository.UpdateAsync(workshop);
            await unitOfWork.SaveAsync();

            return Unit.Value;
        }
    }
}
