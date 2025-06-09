using FluentValidation;
using ProductionTracker.Application.Features.Products.Command.CreateProduct;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Application.Features.Workshops.Command.CreateWorkshop
{
    public class CreateWorkshopCommandValidator : AbstractValidator<CreateWorkshopCommandRequest>
    {
        public CreateWorkshopCommandValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Name cannot be empty.")
                .MaximumLength(100).WithMessage("Name must be at most 100 characters long.");

        }
    }
}
