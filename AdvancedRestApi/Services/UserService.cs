using AdvancedRestApi.Data;
using AdvancedRestApi.DTO_s;
using AdvancedRestApi.Interfaces;
using AdvancedRestApi.Models;
using AutoMapper;

namespace AdvancedRestApi.Services
{
    public class UserService : IUser
    {
        private readonly ICosmosDbService _cosmosDbService;
        private IMapper _mapper;
        public UserService(ICosmosDbService cosmosDbService, IMapper mapper)
        {
            _cosmosDbService = cosmosDbService;
            _mapper = mapper;
        }

        public async Task<(bool IsSuccess, string ErrorMessage)> AddUser(UserDTO userdto)
        {
            if (userdto != null)
            {
                var user = _mapper.Map<User>(userdto);
                user.Id = Guid.NewGuid();
                await _cosmosDbService.AddItemAsync(user);
                return (true, null);
            }
            return (false, "Please provide the user data");
        }

        public async Task<(bool IsSuccess, string ErrorMessage)> DeleteUser(Guid id)
        {
            var user = await _cosmosDbService.GetItemAsync(id.ToString());
            if (user != null)
            {
                await _cosmosDbService.DeleteItemAsync(id.ToString());
                
                return (true, null);
            }
            return (false, "User not found");
        }

        public async Task<(bool IsSuccess, List<UserDTO> User, string ErrorMessage)> GetAllUsers()
        {
            var users = await _cosmosDbService.GetItemsAsync("SELECT * FROM c");
            if (users != null)
            {
                var result = _mapper.Map<List<UserDTO>>(users);
                return (true, result, null);
            }

            return (false, null, "No users found");
        }

        public async Task<(bool IsSuccess, UserDTO User, string ErrorMessage)> GetUserById(Guid id)
        {
            var user = await _cosmosDbService.GetItemAsync(id.ToString());
            if (user != null)
            {
                var result = _mapper.Map<UserDTO>(user);
                return (true, result, null);
            }
            return (false, null, "No user found");
        }

        public async Task<(bool IsSuccess, string ErrorMessage)> UpdateUser(Guid id, UserDTO userdto)
        {
            var userObj = await _cosmosDbService.GetItemAsync(id.ToString());
            if (userObj != null)
            {
                var user = _mapper.Map<User>(userdto);
                userObj.Name = user.Name;
                userObj.Address = user.Address;
                userObj.Phone = user.Phone;
                userObj.BloodGroup = user.BloodGroup;
                _cosmosDbService.UpdateItemAsync(id.ToString(), userObj);
                return (true, null);
            }
            return (false, "User not found");
        }
    }
}
