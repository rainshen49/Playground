using System;
using System.Threading.Tasks;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Collections.Generic;
using System.Runtime.Serialization.Json;

namespace WebAPIClient
{
    class Program
    {
        static void Main(string[] args)
        {
            var repositories = ProcessRepositories().Result;
            foreach(var rep in repositories){
                Console.WriteLine(rep.Name);
                Console.WriteLine(rep.Description);
                Console.WriteLine(rep.GitHubHomeUrl);
                Console.WriteLine(rep.Homepage);
                Console.WriteLine(rep.Watchers);
                Console.WriteLine(rep.LastPush);
                Console.WriteLine();
            }
        }

        private static async Task<List<Repository>> ProcessRepositories(){
            var client = new HttpClient();
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/vnd.github.v3+json"));
            client.DefaultRequestHeaders.Add("User-Agent", ".NET Foundation Repository Reporter");
            var serializer = new DataContractJsonSerializer(typeof(List<Repository>));
            var streamTask = client.GetStreamAsync("https://api.github.com/orgs/dotnet/repos");
            var repositories = serializer.ReadObject(await streamTask) as List<Repository>;
            return repositories;
        }
    }
}
