using MediatR;
using Microsoft.AspNetCore.Identity;
using ProductionTracker.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Application.Features.Auth.Command.CreateRole
{
    public class CreateRoleCommandHandler : IRequestHandler<CreateRoleCommandRequest, Unit>
    {
        private readonly RoleManager<Role> roleManager;

        public CreateRoleCommandHandler(RoleManager<Role> roleManager)
        {
            this.roleManager = roleManager;
        }

        public async Task<Unit> Handle(CreateRoleCommandRequest request, CancellationToken cancellationToken)
        {
            var roleName = "user";
            if (!await roleManager.RoleExistsAsync(roleName))
            {
                var role = new Role
                {
                    Id = Guid.NewGuid(),
                    Name = roleName,
                    NormalizedName = roleName.ToUpper(),
                    ConcurrencyStamp = Guid.NewGuid().ToString()
                };

                var result = await roleManager.CreateAsync(role);
                if (!result.Succeeded)
                {
                    throw new Exception("Rol oluşturulurken hata meydana geldi.");
                }
            }

            return Unit.Value;
        }
    }
}
