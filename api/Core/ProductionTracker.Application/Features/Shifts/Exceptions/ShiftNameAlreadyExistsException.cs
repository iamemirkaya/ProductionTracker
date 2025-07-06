using ProductionTracker.Application.Bases;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Application.Features.Shifts.Exceptions
{
    public class ShiftNameAlreadyExistsException : BaseException
    {
        public ShiftNameAlreadyExistsException() : base("Bu isimde bir Vardiya zaten mevcut.") { }
    }
}
