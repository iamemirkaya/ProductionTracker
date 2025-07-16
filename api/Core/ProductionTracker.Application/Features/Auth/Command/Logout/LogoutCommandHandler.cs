using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using ProductionTracker.Application.Bases;
using ProductionTracker.Application.Interfaces.UnitOfWorks;
using ProductionTracker.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Application.Features.Auth.Command.Logout
{
    public class LogoutCommandHandler : BaseHandler, IRequestHandler<LogoutCommandRequest, Unit>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly UserManager<User> _userManager;

        public LogoutCommandHandler(IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor, UserManager<User> userManager) : base(unitOfWork)
        {
            _httpContextAccessor = httpContextAccessor;
            _userManager = userManager;
        }

        public async Task<Unit> Handle(LogoutCommandRequest request, CancellationToken cancellationToken)
        {
            var userId = _httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
            {
                return Unit.Value;
            }

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return Unit.Value;
            }

            await _userManager.RemoveAuthenticationTokenAsync(user, "Default", "AccessToken");

            return Unit.Value;
        }
    }
}
