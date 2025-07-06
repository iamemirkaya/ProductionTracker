using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Application.Features.Shifts.Command.CreateShift
{
    public class CreateShiftCommandValidator : AbstractValidator<CreateShiftCommandRequest>
    {
        public CreateShiftCommandValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Name cannot be empty.")
                .MaximumLength(100).WithMessage("Name must be at most 100 characters long.");


            RuleFor(x => x.ShiftMinute)
               .GreaterThan(0).WithMessage("Shift duration must be greater than zero.")
               .LessThanOrEqualTo(1440).WithMessage("Shift duration cannot exceed 24 hours (1440 minutes).");


            
        }
    }
}
