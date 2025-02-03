using System;
using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;
 
public class AccountController(DataContext context, ITokenServiceInterface tokenService): BaseApiController
{
    [HttpPost("register")] // account/register
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto) {
        if (await UserExist(registerDto.UserName))
        {
            return BadRequest("Username is taken");
        }
        return Ok();
        // using var hmac = new HMACSHA512();
    
        // var user = new AppUser {
        //     UserName = registerDto.UserName.ToLower(),
        //     PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
        //     PasswordSalt = hmac.Key
        // };

        // context.Users.Add(user);
        // await context.SaveChangesAsync();
        // return new UserDto
        // {
        //     UserName = user.UserName,
        //     Token = tokenService.CreateToken(user)
        // };
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto) {
        var user = await context.Users.Include(p => p.Photos).FirstOrDefaultAsync(contextUser => 
            contextUser.UserName == loginDto.UserName.ToLower());

        if (user == null) return Unauthorized("Invalid username");

        using var hmac = new HMACSHA512(user.PasswordSalt); // key

        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

        for (int i = 0; i < computedHash.Length; i++)
        {
            if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
        }

        return new UserDto
        {
            UserName = user.UserName,
            Token = tokenService.CreateToken(user),
            PhotoUrl = user.Photos.FirstOrDefault(ph => ph.IsMain)?.Url
        };

    }

    private async Task<bool> UserExist(string username)
    {
        return await context.Users.AnyAsync(x => x.UserName.ToLower() == username.ToLower());
    }
}
