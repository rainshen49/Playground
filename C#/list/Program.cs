using System;
using System.Collections.Generic;

namespace classes
{
    class Program
    {
        static void Main(string[] args){
            // Strings();
            // double third = 1.0/3.0;
            // decimal third2 = 1.0M/3.0M;
            // Console.WriteLine(third);
            // Console.WriteLine(third2);
            // Console.WriteLine(decimal.MaxValue);
            // Console.WriteLine(double.MaxValue);
            // Console.WriteLine(decimal.MinValue);
            // Console.WriteLine(double.MinValue);
            var account = new BankAccount("Rain",100);
            Console.WriteLine(account.Balance);            
            account.MakeDeposit(200,DateTime.Now,"Salary");
            Console.WriteLine(account.Balance);            
            account.MakeWithdrawal(100,DateTime.Now,"Food");
            Console.WriteLine(account.Balance);
            Console.WriteLine(account.GetAccountHistory());
        }
        public static void Strings()        
        {
            var names = new List<string>{"Rain","Ana","Felipe"};
            foreach (var name in names)
            {
                Console.WriteLine($"Hello {name.ToUpper()}!");
            }
            Console.WriteLine();
            names.Add("Marta");
            names.Remove("Ana");
            foreach (var name in names)
            {
                Console.WriteLine($"Hello {name.ToUpper()}!");
            }
            Console.WriteLine($"{names.Count}");
        }
    }
}
