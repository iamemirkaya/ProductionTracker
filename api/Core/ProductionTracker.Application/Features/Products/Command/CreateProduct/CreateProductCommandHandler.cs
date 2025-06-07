using MediatR;
using ProductionTracker.Application.Bases;
using ProductionTracker.Application.Features.Products.BusinessRules;
using ProductionTracker.Application.Interfaces.AutoMapper;
using ProductionTracker.Application.Interfaces.ImageService;
using ProductionTracker.Application.Interfaces.Repositories;
using ProductionTracker.Application.Interfaces.UnitOfWorks;
using ProductionTracker.Domain.Entities;


namespace ProductionTracker.Application.Features.Products.Command.CreateProduct
{
    public class CreateProductCommandHandler : BaseHandler, IRequestHandler<CreateProductCommandRequest, Unit>
    {
        private readonly IImageService imageService;
        private readonly ProductBusinessRules productBusinessRules;

        public CreateProductCommandHandler(IUnitOfWork unitOfWork, ProductBusinessRules productBusinessRules, IImageService imageService) : base(unitOfWork)
        {
            this.productBusinessRules = productBusinessRules;
            this.imageService = imageService;
        }

        public async Task<Unit> Handle(CreateProductCommandRequest request, CancellationToken cancellationToken)
        {

            await productBusinessRules.EnsureProductNameIsUnique(request.Name);

            var uploadResult = await imageService.AddImageAsync(request.File);

            var writeRepository = unitOfWork.GetWriteRepository<Product>();
            await writeRepository.AddAsync(new Product
            {
                 Code = request.Code,
                 Name = request.Name,
                 StockQuantity = request.StockQuantity,
                 UnitPrice = request.UnitPrice,
                ImageUrl = uploadResult.SecureUrl.ToString(),
                PublicId = uploadResult.PublicId
            });

            await unitOfWork.SaveAsync();

            return Unit.Value;
        }
    }
}