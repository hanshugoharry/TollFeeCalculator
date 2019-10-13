using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TollFeeCalculator
{
    public class Truck : IVehicle
    {
        public string GetVehicleType()
        {
            return "Truck";
        }
        public bool isTollFree()
        {
            return false;
        }
    }
}
