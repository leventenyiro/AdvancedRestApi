using Newtonsoft.Json;

namespace AdvancedRestApi.Models
{
    public class User
    {
        [JsonProperty(PropertyName = "id")]
        public Guid Id { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "address")]
        public string Address { get; set; }

        [JsonProperty(PropertyName = "phone")]
        public string Phone { get; set; }

        [JsonProperty(PropertyName = "bloodgroup")]
        public string BloodGroup { get; set; }
    }
}
