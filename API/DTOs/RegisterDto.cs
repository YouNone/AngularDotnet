using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class RegisterDto
{
    [Required]
    [MaxLength(40)]
    public required string UserName {get; set;}
    [Required]
    public required string Password {get; set;}
}
