using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Application.Features.Auth.Command.Logout
{
    public class LogoutCommandRequest : IRequest<Unit>
    {
    }
}
