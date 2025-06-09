using ProductionTracker.Application.Bases;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Application.Features.Workshops.Exceptions
{
    public class WorkshopNameAlreadyExistsException : BaseException
    {
        public WorkshopNameAlreadyExistsException() : base("Bu isimde bir Atölye zaten mevcut.") { }
    }
}
