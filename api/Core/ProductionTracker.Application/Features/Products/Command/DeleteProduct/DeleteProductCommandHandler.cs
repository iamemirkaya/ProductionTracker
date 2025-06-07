using MediatR;
using Microsoft.AspNetCore.Http;
using ProductionTracker.Application.Bases;
using ProductionTracker.Application.Features.Products.BusinessRules;
using ProductionTracker.Application.Interfaces.ImageService;
using ProductionTracker.Application.Interfaces.UnitOfWorks;
using ProductionTracker.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Application.Features.Products.Command.DeleteProduct
{
    public class DeleteProductCommandHandler : IRequestHandler<DeleteProductCommandRequest, Unit>
    {

        private readonly IUnitOfWork unitOfWork;
        private readonly ProductBusinessRules productBusinessRules;
        private readonly IImageService imageService;

        public DeleteProductCommandHandler(IUnitOfWork unitOfWork, ProductBusinessRules productBusinessRules, IImageService imageService)
        {
            this.unitOfWork = unitOfWork;
            this.productBusinessRules = productBusinessRules;
            this.imageService = imageService;
        }

        public async Task<Unit> Handle(DeleteProductCommandRequest request, CancellationToken cancellationToken)
        {

            var product = await productBusinessRules.EnsureProductExists(request.Id);

            if (!string.IsNullOrWhiteSpace(product.PublicId))
            {
                await imageService.DeleteImageAsync(product.PublicId);
            }

            await unitOfWork.GetWriteRepository<Product>().SoftDeleteAsync(product);

            await unitOfWork.SaveAsync();

            return Unit.Value;
        }

    }
}
