using Microsoft.EntityFrameworkCore;

public class CustomerDbApi : ICustomerDbApi
{
    private readonly ApplicationDbContext _context;

    public CustomerDbApi(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Customer>> GetAllAsync()
    {
        return await _context.Customers.AsNoTracking().ToListAsync();
    }

    public async Task<Customer?> GetByIdAsync(int id)
    {
        return await _context.Customers.FindAsync(id);
    }

    public async Task<Customer> AddAsync(Customer customer)
    {
        _context.Customers.Add(customer);
        await _context.SaveChangesAsync();
        return customer;
    }

    public async Task UpdateAsync(Customer customer)
    {
        _context.Customers.Update(customer);
        await _context.SaveChangesAsync();
    }

    public async Task<Customer?> GetByNameAsync(string name)
    {
        return await _context.Customers.FirstOrDefaultAsync(c => c.Name == name);
    }
}
