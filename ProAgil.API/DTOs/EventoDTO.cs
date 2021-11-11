using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProAgil.API.DTOs
{
    public class EventoDTO
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O campo {0} deve ser preenchido.")]
        [StringLength(50, MinimumLength = 4, ErrorMessage = "O campo {0} deve ter no mínimo {2} e no máximo {1} caracteres.")]
        public string Local { get; set; }

        [Required(ErrorMessage = "O campo {0} deve ser preenchido.")]
        public string DataEvento { get; set; }

        [Required(ErrorMessage = "O campo {0} deve ser preenchido.")]
        public string Tema { get; set; }

        [Required(ErrorMessage = "O campo {0} deve ser preenchido.")]
        [Range(2, 120000)]
        public int QtdPessoas { get; set; }
        public string ImagemUrl { get; set; }

        [Required(ErrorMessage = "O campo {0} deve ser preenchido.")]
        [Phone]
        public string Telefone { get; set; }

        [Required(ErrorMessage = "O campo {0} deve ser preenchido.")]
        [EmailAddress(ErrorMessage = "Necessário informar um e-mail válido.")]
        public string Email { get; set; }
        public List<LoteDTO> Lotes { get; set; }
        public List<RedeSocialDTO> RedesSociais { get; set; }
        public List<PalestranteDTO> Palestrantes { get; set; }
    }
}