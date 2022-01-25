using Newtonsoft.Json;

namespace AdvancedRestApi.Models
{
    public class User
    {
        [JsonProperty(PropertyName = "id")]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string BloodGroup { get; set; }
    }
}
