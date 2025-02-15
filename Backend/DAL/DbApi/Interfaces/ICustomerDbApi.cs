public interface ICustomerDbApi
{
    Task<IEnumerable<Customer>> GetAllAsync();
    Task<Customer?> GetByIdAsync(int id);
    Task<Customer> AddAsync(Customer customer);
    Task UpdateAsync(int id, CustomerUpdateRequest customer);
    Task DeleteAsync(Customer customer);

    Task<Customer?> GetByNameAsync(string name);
}