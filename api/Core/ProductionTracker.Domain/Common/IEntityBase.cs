﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Domain.Common
{
    public interface IEntityBase
    {
        Guid Id { get; set; }
        bool IsDeleted { get; set; }
    }
}
