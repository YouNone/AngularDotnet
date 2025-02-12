using System;
using API.DTOs;
using API.Entities;

namespace API.Interfaces;

public interface ILikesRepository
{
    Task<UserLike?> GetUserLike(int SourceUserId, int targetUserId);
    Task<IEnumerable<MemberDto>> GetUserLikes(string predicate, int userId);
    Task<IEnumerable<int>> GetCurrentUserLikeIds(int CurrentUserId);
    void DeleteLike(UserLike like);
    void AddLike(UserLike like);
    Task<bool> SaveChanges();
}
