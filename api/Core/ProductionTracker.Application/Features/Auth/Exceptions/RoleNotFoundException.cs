using ProductionTracker.Application.Bases;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Application.Features.Auth.Exceptions
{
    public class RoleNotFoundException : BaseException
    {
        public RoleNotFoundException() : base("Böyle bir Role yok !") { }
    }
}
