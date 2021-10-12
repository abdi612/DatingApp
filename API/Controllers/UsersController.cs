using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize] // authorization required for all request
    public class UsersController : BaseApiControllor
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            _mapper = mapper;
            _userRepository = userRepository;

        }

        // get all users 
        // make the get methos asynchonus so multiple threads can run at the same time 
        //while wait for db to retun result

        // async will help us not block a thread, it gives us multi thread
        // it also make it scalibale
        // if you are make a data call always make it async 
        // we use thread tasks

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            // we also need to use a async method of todolist
            var users = await _userRepository.GetMembersAsync();
            return Ok(users);
        }

        // api/users/3

        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            return await _userRepository.GetMemberAsync(username);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto){
           // this gives a user from token user used to authunticate when logged in
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _userRepository.GetUserByUsernameAsync(username);
// memberUpdateDto  allow to map the data with needing to break one by 
// e.g. user.City = memberUpdateDto.City
// the mapper will automaticly find the match field and will map it for us.
            _mapper.Map(memberUpdateDto,user);

            _userRepository.Update(user);

            if(await _userRepository.SaveAllAsync()) return NoContent();
            return BadRequest("Failed to update user");

        }
    }
}