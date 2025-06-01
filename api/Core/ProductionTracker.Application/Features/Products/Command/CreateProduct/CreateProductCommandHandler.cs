using MediatR;
using ProductionTracker.Application.Interfaces.UnitOfWorks;
using ProductionTracker.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Application.Features.Products.Command.CreateProduct
{
    public class CreateProductCommandHandler : IRequestHandler<CreateProductCommandRequest, Unit>
    {
        private readonly IUnitOfWork _unitOfWork;


        public CreateProductCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Unit> Handle(CreateProductCommandRequest request, CancellationToken cancellationToken)
        {
            var writeRepository = _unitOfWork.GetWriteRepository<Product>();
            await writeRepository.AddAsync(new Product
            {
                Name = request.Name,
                Code = request.Code,
                UnitPrice = request.UnitPrice
            });

            await _unitOfWork.SaveAsync();

            return Unit.Value;
        }
    }
}
