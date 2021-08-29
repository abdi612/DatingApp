using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly DataContext _context;
        public UsersController(DataContext context)
        {
            _context = context;
        }

        // get all users 
        // make the get methos asynchonus so multiple threads can run at the same time 
        //while wait for db to retun result

        // async will help us not block a thread, it gives us multi thread
        // it also make it scalibale
        // if you are make a data call always make it async 
        // we use thread tasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            // we also need to use a async method of todolist
            var users = await _context.Users.ToListAsync();

            return users;
        }

        // api/users/3

        [HttpGet("{Id}")]
        public async Task<ActionResult<AppUser>> GetUser(int id)
        {
            return await _context.Users.FindAsync(id);
        }
    }
}