using ProductionTracker.Application.Bases;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductionTracker.Application.Features.Products.Exceptions
{
    public class ProductNameAlreadyExistsException : BaseException
    {
        public ProductNameAlreadyExistsException() : base("Bu isimde bir ürün zaten mevcut.") { }
    }
}
