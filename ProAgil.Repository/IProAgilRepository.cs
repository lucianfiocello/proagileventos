using System.Threading.Tasks;
using ProAgil.Domain;

namespace ProAgil.Repository
{
    public interface IProAgilRepository
    {
        void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveChangesAsync();

        //EVENTO
        Task<Evento[]> ObterTodosEventosPorTemaAsync(string tema, bool incluirPalentrantes);
        Task<Evento[]> ObterTodosEventosAsync(bool incluirPalentrantes);
        Task<Evento> ObterTodosEventosPorIdAsync(int eventoId, bool incluirPalentrantes);

        //PALESTRANTE
        Task<Palestrante[]> ObterTodosPalestrantesPorNomeAsync(string nome, bool incluirEventos);
        Task<Palestrante> ObterPalestrantePorIdAsync(int palestranteId, bool incluirEventos);
    }
}