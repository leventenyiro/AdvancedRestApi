using AdvancedRestApi.Interfaces;
using Microsoft.Azure.Cosmos;

namespace AdvancedRestApi.Data
{
    public class CosmosDbService : ICosmosDbService
    {
        private Container _container;

        public CosmosDbService(
            CosmosClient dbClient,
            string databaseName,
            string containerName)
        {
            this._container = dbClient.GetContainer(databaseName, containerName);
        }

        public async Task AddItemAsync(Models.User user)
        {
            await this._container.CreateItemAsync<Models.User>(user, new PartitionKey(user.Id.ToString()));
        }

        public async Task DeleteItemAsync(string id)
        {
            await this._container.DeleteItemAsync<Models.User>(id, new PartitionKey(id));
        }

        public async Task<Models.User> GetItemAsync(string id)
        {
            try
            {
                ItemResponse<Models.User> response = await this._container.ReadItemAsync<Models.User> (id, new PartitionKey(id));
                return response.Resource;
            }
            catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                return null;
            }

        }

        public async Task<IEnumerable<Models.User>> GetItemsAsync(string queryString)
        {
            var query = this._container.GetItemQueryIterator<Models.User>(new QueryDefinition(queryString));
            List<Models.User> results = new List<Models.User>();
            while (query.HasMoreResults)
            {
                var response = await query.ReadNextAsync();

                results.AddRange(response.ToList());
            }

            return results;
        }

        public async Task UpdateItemAsync(string id, Models.User user)
        {
            await this._container.UpsertItemAsync<Models.User>(user, new PartitionKey(id));
        }
    }
}
