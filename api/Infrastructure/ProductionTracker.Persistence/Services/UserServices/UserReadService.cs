using Microsoft.EntityFrameworkCore;
using ProductionTracker.Application.Interfaces.UserServices;
using ProductionTracker.Domain.Entities;
using ProductionTracker.Persistence.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Persistence.Services.UserServices
{
    public class UserReadService : IUserReadService
    {
        private readonly AppDbContext _context;

        public UserReadService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.Email == email);
        }
    }
}
