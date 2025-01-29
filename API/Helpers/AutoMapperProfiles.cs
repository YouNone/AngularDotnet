using System;
using API.DTOs;
using API.Entities;
using API.Extentions;
using AutoMapper;

namespace API.Helpers;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<AppUser, MemberDto>()
            .ForMember(d => d.Age, o => o.MapFrom(s => s.DateOfBirth.CalculateAge()))
            .ForMember(dest => dest.PhotoUrl, 
                o => o.MapFrom(source => source.Photos.FirstOrDefault(ph => ph.IsMain)!.Url));
        CreateMap<Photo, PhotoDto>();
    }
}
