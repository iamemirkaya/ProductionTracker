using MediatR;
using Microsoft.AspNetCore.Identity;
using ProductionTracker.Application.Bases;
using ProductionTracker.Application.Features.Auth.BusinessRules;
using ProductionTracker.Application.Interfaces.UnitOfWorks;
using ProductionTracker.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Application.Features.Auth.Command.Register
{
    public class RegisterCommandHandler : BaseHandler, IRequestHandler<RegisterCommandRequest, Unit>
    {
        private readonly AuthRules authRules;
        private readonly UserManager<User> userManager;
        private readonly RoleManager<Role> roleManager;

        public RegisterCommandHandler(RoleManager<Role> roleManager, AuthRules authRules, UserManager<User> userManager, IUnitOfWork unitOfWork) : base(unitOfWork)
        {
            this.authRules = authRules;
            this.userManager = userManager;
            this.roleManager = roleManager;

        }

        public async Task<Unit> Handle(RegisterCommandRequest request, CancellationToken cancellationToken)
        {
            await authRules.UserShouldNotExist(request.Email);

            await authRules.RoleShouldExist(request.RoleName);

            var user = new User
            {
                UserName = request.Email,
                Email = request.Email,
                FullName = request.FullName
            };

            var result = await userManager.CreateAsync(user, request.Password);
            if (!result.Succeeded)
            {
                throw new Exception("Kullanıcı oluşturulurken hata meydana geldi.");
            }
            var roleResult = await userManager.AddToRoleAsync(user, request.RoleName);
            if (!roleResult.Succeeded)
            {
                throw new Exception($"Rol atama sırasında hata meydana geldi. {string.Join(", ", roleResult.Errors.Select(e => e.Description))}");
            }

            return Unit.Value;
        }
    }
}
