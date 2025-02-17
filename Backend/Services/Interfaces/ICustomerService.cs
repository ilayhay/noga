public interface ICustomerService
{
    Task<IEnumerable<Customer>> GetAllAsync();
    Task<Customer?> GetByIdAsync(int id);
    Task<Customer> AddAsync(Customer customer);
    Task UpdateAsync(int id, CustomerUpdateRequest newCustomer);
    Task DeleteAsync(int id);
}