public class CustomerService : ICustomerService
{
    private readonly ICustomerDbApi _dbApi;

    public CustomerService(ICustomerDbApi repository)
    {
        _dbApi = repository;
    }

    public async Task<IEnumerable<Customer>> GetAllAsync()
    {
        var customers = await _dbApi.GetAllAsync();
        return customers;
    }

    public async Task<Customer?> GetByIdAsync(int id)
    {
        var customer = await _dbApi.GetByIdAsync(id);
        return customer;
    }

    public async Task<Customer> AddAsync(Customer customer)
    {
        var existingCustomer = await _dbApi.GetByNameAsync(customer.Name);
        if (existingCustomer != null)
        {
            throw new InvalidOperationException($"customer with the name '{customer.Name}' already exists.");
        }
        var newCustomer = await _dbApi.AddAsync(customer);
        return newCustomer;
    }

    public async Task UpdateAsync(int id, CustomerUpdateRequest customer)
    {
        var existingCustomer = await _dbApi.GetByNameAsync(customer.Name);
        var currentCustomer = await _dbApi.GetByIdAsync(id);
        if (existingCustomer != null && currentCustomer.Name != existingCustomer.Name)
        {
            throw new InvalidOperationException($"customer with the name '{customer.Name}' already exists.");
        }
        await _dbApi.UpdateAsync(id,customer);
    }

    public async Task DeleteAsync(int id)
    {
        var customer = await GetByIdAsync(id);
        if (customer is null)
            throw new InvalidOperationException("Cannot update a non-existent customer.");
        await _dbApi.DeleteAsync(customer);
    }
}
