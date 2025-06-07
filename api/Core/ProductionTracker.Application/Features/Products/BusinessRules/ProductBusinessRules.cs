using ProductionTracker.Application.Bases;
using ProductionTracker.Application.Features.Products.Exceptions;
using ProductionTracker.Application.Interfaces.UnitOfWorks;
using ProductionTracker.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Application.Features.Products.BusinessRules
{
    public class ProductBusinessRules : BaseRules
    {
        private readonly IUnitOfWork unitOfWork;

        public ProductBusinessRules(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public async Task<Product> EnsureProductExists(Guid id)
        {
            var product = await unitOfWork.GetReadRepository<Product>().GetByIdAsync(id);

            if (product == null)
                throw new ProductNotFoundException();

            return product;
        }

        public async Task EnsureProductNameIsUnique(string name)
        {
            var exists = await unitOfWork.GetReadRepository<Product>()
                .AnyAsync(p => p.Name.ToLower() == name.ToLower());

            if (exists)
                throw new ProductNameAlreadyExistsException();
        }
    }
}
