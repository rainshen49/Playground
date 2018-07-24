using System;
using System.Reflection;

namespace String
{
    [Obsolete("This class is obsolete soon!")]
    [Beta]
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
            TypeInfo ti = typeof(Program).GetTypeInfo();
            foreach(var attr in ti.GetCustomAttributes())
                Console.WriteLine(attr.GetType().Name);
        }
    }
    public class BetaAttribute: Attribute{

    }
}
