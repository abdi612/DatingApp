using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    //this makes sure we call photo , photoes in db
    [Table("Photos")]
    public class Photo
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
        public string PublicId { get; set; }
        // we create reliation with appuser

        public AppUser AppUser { get; set; }
        public int AppUserId { get; set; }
    }
}