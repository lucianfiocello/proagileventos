using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProAgil.API.DTOs
{
    public class PalestranteDTO
    {
        public int Id { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 4, ErrorMessage = "O campo {0} deve ter no mínimo {2} e no máximo {1} caracteres.")]
        public string Nome { get; set; }
        public string MiniCurriculo { get; set; }
        public string ImagemUrl { get; set; }
        public string Telefone { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }
        public List<RedeSocialDTO> RedesSociais { get; set; }
        public List<EventoDTO> Eventos { get; set; }
    }
}