using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Application.Features.Workshops.Command.DeleteWorkshop
{
    public class DeleteWorkhsopCommandValidator : AbstractValidator<DeleteWorkshopCommandRequest>
    {
        public DeleteWorkhsopCommandValidator()
        {
            RuleFor(x => x.Id)
                .NotEmpty()
                .WithMessage("Id boş olamaz.");
        }
    }
}
