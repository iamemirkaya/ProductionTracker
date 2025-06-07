using ProductionTracker.Application.Interfaces.AutoMapper;
using ProductionTracker.Application.Interfaces.UnitOfWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Application.Bases
{
    public class BaseHandler
    {
        public readonly IUnitOfWork unitOfWork;

        public BaseHandler(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;

        }
    }
}
