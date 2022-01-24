using AdvancedRestApi.Data;
using AdvancedRestApi.Interfaces;
using AdvancedRestApi.Models;
using Microsoft.EntityFrameworkCore;

namespace AdvancedRestApi.Services
{
    public class UserService : IUser
    {
        private UserDbContext _dbContext;
        public UserService(UserDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task AddUser(User user)
        {
            await _dbContext.Users.AddAsync(user);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteUser(Guid id)
        {
            var user = await _dbContext.Users.FindAsync(id);
            _dbContext.Users.Remove(user);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<(bool IsSuccess, List<User> User, string ErrorMessage)> GetAllUsers()
        {
            var users = await _dbContext.Users.ToListAsync();
            if (users != null)
            {
                return (true, users, null);
            }

            return (false, null, "No users found");
        }

        public async Task<(bool IsSuccess, User User, string ErrorMessage)> GetUserById(Guid id)
        {
            var user = await _dbContext.Users.FindAsync(id);
            if (user != null)
            {
                return (true, user, null);
            }
            return (false, null, "No user found");
        }

        public async Task UpdateUser(Guid id, User user)
        {
            var userObj = await _dbContext.Users.FindAsync(id);
            userObj.Name = user.Name;
            userObj.Address = user.Address;
            userObj.Phone = user.Phone;
            userObj.BloodGroup = user.BloodGroup;
            await _dbContext.SaveChangesAsync();
        }
    }
}
