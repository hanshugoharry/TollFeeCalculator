using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TollFeeCalculator;

namespace WebApplication1Project.Model
{
    public class VehicleFactory
    {
        public static IVehicle Create(string vehicleType)
        {
            // Om det hade rört sig om väldigt många fler typer av fordonstyper så hade nog inte en switch varit det bästa sättet.

            switch (vehicleType)
            {
                case "Truck":
                    return new Truck();
                case "MotorBike":
                    return new Motorbike();  
                case "Tractor":
                    return new Tractor();
                case "Emergency":
                    return new Emergency();
                case "Diplomat":
                    return new Diplomat();
                case "Foreign":
                    return new Foreign();
                case "Military":
                    return new Military();
                default:
                    return new Car();

            }
        }
    }
}
