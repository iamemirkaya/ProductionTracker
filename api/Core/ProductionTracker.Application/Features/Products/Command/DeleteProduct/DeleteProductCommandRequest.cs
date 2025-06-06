﻿using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Application.Features.Products.Command.DeleteProduct
{
    public class DeleteProductCommandRequest : IRequest<Unit>
    {
        public Guid Id { get; set; }
    }
}
