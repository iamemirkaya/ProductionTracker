using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Application.Interfaces.UserServices
{
    public interface IUserWriteService
    {
        Task SoftDeleteUserAsync(Guid userId);
    }
}
