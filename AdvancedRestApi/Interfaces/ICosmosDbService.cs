using AdvancedRestApi.Models;

namespace AdvancedRestApi.Interfaces
{
    public interface ICosmosDbService
    {
        Task<IEnumerable<User>> GetItemsAsync(string query);
        Task<User> GetItemAsync(string id);
        Task AddItemAsync(User user);
        Task UpdateItemAsync(string id, User user);
        Task DeleteItemAsync(string id);
    }
}
