using System.ComponentModel.DataAnnotations;

namespace ProAgil.API.DTOs
{
    public class RedeSocialDTO
    {
        public int Id { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 4, ErrorMessage = "O campo {0} deve ter no mínimo {2} e no máximo {1} caracteres.")]
        public string Nome { get; set; }

        [Required]
        public string Url { get; set; }
    }
}