using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API;
public class UserRepository(DataContext context) : ITUserRepository
{
    public async Task<IEnumerable<AppUser>> GetUserAsync()
    {
        return await context.Users.ToListAsync();
    }

    public async Task<AppUser?> GetUserByIdAsync(int id)
    {
       return await context.Users.FindAsync(id);
    }

    public async Task<AppUser?> GetUserByUsernameAsync(string username)
    {
        return await context.Users.SingleOrDefaultAsync(x => x.UserName == username);
    }

    public async Task<bool> SaveAllAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }

    public void Update(AppUser user)
    {
        context.Entry(user).State = EntityState.Modified;
    }
}