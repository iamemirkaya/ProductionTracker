using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProductionTracker.Application.Features.Auth.Command.CreateRole;
using ProductionTracker.Application.Features.Auth.Command.Login;
using ProductionTracker.Application.Features.Auth.Command.Logout;
using ProductionTracker.Application.Features.Auth.Command.Register;

namespace ProductionTracker.Api.Controllers
{
    public class AuthController : BaseApiController
    {
        private readonly IMediator mediator;


        public AuthController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterCommandRequest request)
        {
            await mediator.Send(request);
            return StatusCode(StatusCodes.Status201Created);
        }

        [HttpPost("create-role")]
        public async Task<IActionResult> CreateRole(CreateRoleCommandRequest request)
        {
            await mediator.Send(request);
            return StatusCode(StatusCodes.Status201Created);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginCommandRequest request)
        {
            var response = await mediator.Send(request);
            return StatusCode(StatusCodes.Status200OK, response);
        }

        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            await mediator.Send(new LogoutCommandRequest());
            return Ok(new { Message = "Başarıyla çıkış yapıldı." });
        }
    }
}
