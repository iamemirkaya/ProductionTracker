using MediatR;
using ProductionTracker.Application.Bases;
using ProductionTracker.Application.Features.Products.BusinessRules;
using ProductionTracker.Application.Features.Products.Command.CreateProduct;
using ProductionTracker.Application.Features.Workshops.BusinessRules;
using ProductionTracker.Application.Interfaces.ImageService;
using ProductionTracker.Application.Interfaces.UnitOfWorks;
using ProductionTracker.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Application.Features.Workshops.Command.CreateWorkshop
{
    public class CreateWorkshopCommandHandler : BaseHandler, IRequestHandler<CreateWorkshopCommandRequest, Unit>
    {
        private readonly WorkshopBusinessRules workshopBusinessRules;

        public CreateWorkshopCommandHandler(IUnitOfWork unitOfWork, WorkshopBusinessRules workshopBusinessRules) : base(unitOfWork)
        {
            this.workshopBusinessRules = workshopBusinessRules;

        }

        public async Task<Unit> Handle(CreateWorkshopCommandRequest request, CancellationToken cancellationToken)
        {
            await workshopBusinessRules.EnsureWorkshopNameIsUnique(request.Name);


            var writeRepository = unitOfWork.GetWriteRepository<Workshop>();
            await writeRepository.AddAsync(new Workshop
            {
                Name = request.Name,
                WorkerCount = request.WorkerCount,
            });

            await unitOfWork.SaveAsync();

            return Unit.Value;
        }
    }
}
