using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.RazorPages;

public class About2Model : PageModel
{
    public string Message { get; set; }

    public void OnGet()
    {
        Message = "Your application description page.";
    }
}