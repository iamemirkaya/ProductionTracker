using MediatR;
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

namespace ProductionTracker.Application.Features.Products.Command.UpdateProduct
{
    public class UpdateProductCommandHandler : BaseHandler, IRequestHandler<UpdateProductCommandRequest, Unit>
    {
        private readonly IImageService imageService;
        private readonly ProductBusinessRules productBusinessRules;

        public UpdateProductCommandHandler(IUnitOfWork unitOfWork, ProductBusinessRules productBusinessRules, IImageService imageService)
            : base(unitOfWork)
        {
            this.productBusinessRules = productBusinessRules;
            this.imageService = imageService;
        }

        public async Task<Unit> Handle(UpdateProductCommandRequest request, CancellationToken cancellationToken)
        {
            var writeRepository = unitOfWork.GetWriteRepository<Product>();

            var product = await productBusinessRules.EnsureProductExists(request.Id);


            if (request.File is not null)
            {
                var uploadResult = await imageService.UpdateImageAsync(request.File, product.PublicId!);

                product.ImageUrl = uploadResult.SecureUrl.ToString();
                product.PublicId = uploadResult.PublicId;
            }

            product.Name = request.Name;
            product.Code = request.Code;
            product.UnitPrice = request.UnitPrice;
            product.StockQuantity = request.StockQuantity;

            await writeRepository.UpdateAsync(product);
            await unitOfWork.SaveAsync();

            return Unit.Value;
        }
    }
}
