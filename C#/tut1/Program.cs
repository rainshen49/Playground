using System;
using System.IO;
using System.Collections.Generic;
using System.Threading.Tasks;
using static System.Math;

namespace TeleprompterConsole
{
    class Program
    {
        static void Main(string[] args)
        {
            RunTeleprompter().Wait();
        }
        static IEnumerable<string> ReadFrom(string file){
            string line;
            using (var reader = File.OpenText(file)){
                while((line = reader.ReadLine())!=null){
                    var words = line.Split(' ');
                    foreach (var word in words)
                    {
                        yield return word + ' ';
                    }
                    yield return Environment.NewLine;
                }
            }
        }
        private static async Task ShowTeleprompter(TeleprompterConfig config){
            var words = ReadFrom("sampleQuotes.txt");
            foreach (var line in words)
            {
                Console.Write(line);
                if (!string.IsNullOrWhiteSpace(line))
                {
                    await Task.Delay(config.delay);
                }
            }
            config.SetDone();
        }
        private static async Task GetInput(TeleprompterConfig config){
            Action work = ()=>{
                do{
                    var key = Console.ReadKey(true);
                    // Console.WriteLine(key.KeyChar);
                    if (key.KeyChar == '>')
                    {
                        config.UpdateDelay(-10);
                    }
                    else if (key.KeyChar == '<')
                    {
                        config.UpdateDelay(10);
                    }
                }while(!config.Done);
            };
            await Task.Run(work);
        }
        private static async Task RunTeleprompter(){
            var config = new TeleprompterConfig();
            var displayTask = ShowTeleprompter(config);
            var speedTask = GetInput(config);
            await Task.WhenAny(displayTask,speedTask);
        }
    }
}
