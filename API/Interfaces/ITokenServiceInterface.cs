using System;
using API.Entities;

namespace API.Interfaces;

public interface ITokenServiceInterface
{
    string CreateToken(AppUser user);
}
