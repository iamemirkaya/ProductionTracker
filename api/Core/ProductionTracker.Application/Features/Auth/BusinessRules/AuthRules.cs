using Microsoft.AspNetCore.Identity;
using ProductionTracker.Application.Bases;
using ProductionTracker.Application.Features.Auth.Exceptions;
using ProductionTracker.Application.Interfaces.UserServices;
using ProductionTracker.Domain.Entities;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Application.Features.Auth.BusinessRules
{
    public class AuthRules : BaseRules
    {
        private readonly IUserReadService _userReadRepository;
        private readonly RoleManager<Role> _roleManager;

        public AuthRules(IUserReadService userReadRepository, RoleManager<Role> roleManager)
        {
            _userReadRepository = userReadRepository;
            _roleManager = roleManager;
        }
        public async Task UserShouldNotExist(string email)
        {
            var user = await _userReadRepository.GetUserByEmailAsync(email);
            if (user is not null)
                throw new UserAlreadyExistException();
        }

        public async Task RoleShouldExist(string roleName)
        {
            var role = await _roleManager.FindByNameAsync(roleName);
            if (role == null)
            {
                throw new RoleNotFoundException();
            }
        }

        public Task EmailOrPasswordShouldNotBeInvalid(User? user, bool checkPassword)
        {
            if (user is null || !checkPassword) throw new EmailOrPasswordShouldNotBeInvalidException();
            return Task.CompletedTask;
        }
    }
}
