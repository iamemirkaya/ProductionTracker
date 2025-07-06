using CloudinaryDotNet.Actions;
using MediatR;
using ProductionTracker.Application.Bases;
using ProductionTracker.Application.Interfaces.UnitOfWorks;
using ProductionTracker.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Application.Features.ProductionLogs.Command.CreateProductionLogs
{
    public class CreateProductionLogCommandHandler : BaseHandler, IRequestHandler<CreateProductionLogCommandRequest, Unit>
    {
        public CreateProductionLogCommandHandler(IUnitOfWork unitOfWork) : base(unitOfWork)
        {

        }

        public async Task<Unit> Handle(CreateProductionLogCommandRequest request, CancellationToken cancellationToken)
        {
            var writeRepository = unitOfWork.GetWriteRepository<ProductionLog>();
            await writeRepository.AddAsync(new ProductionLog
            {
                ShiftId = request.ShiftId,
                AbsenceCount = request.AbsenceCount,
                dateOnly = request.dateOnly,
                ProducedQuantity = request.ProducedQuantity,
                ProductId = request.ProductId,
                WorkshopId = request.WorkshopId,
            });

            await unitOfWork.SaveAsync();

            return Unit.Value;
        }
    }
}
