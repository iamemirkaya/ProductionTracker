using MediatR;
using ProductionTracker.Application.Features.Workshops.BusinessRules;
using ProductionTracker.Application.Interfaces.ImageService;
using ProductionTracker.Application.Interfaces.UnitOfWorks;
using ProductionTracker.Domain.Entities;


namespace ProductionTracker.Application.Features.Workshops.Command.DeleteWorkshop
{
    public class DeleteWorkshopCommandHandler : IRequestHandler<DeleteWorkshopCommandRequest, Unit>
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly WorkshopBusinessRules workshopBusinessRules;


        public DeleteWorkshopCommandHandler(IUnitOfWork unitOfWork, WorkshopBusinessRules workshopBusinessRules, IImageService imageService)
        {
            this.unitOfWork = unitOfWork;
            this.workshopBusinessRules = workshopBusinessRules;

        }

        public async Task<Unit> Handle(DeleteWorkshopCommandRequest request, CancellationToken cancellationToken)
        {
            var workshop = await workshopBusinessRules.EnsureWorkshopExists(request.Id);

            await unitOfWork.GetWriteRepository<Workshop>().SoftDeleteAsync(workshop);

            await unitOfWork.SaveAsync();

            return Unit.Value;
        }
    }
}
