using AutoMapper;
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
        return await _context.Customers.AsNoTracking()
        .Where(customer => !customer.IsDeleted)
        .Include(c => c.Addresses)
        .Include(c => c.Contacts).ToListAsync();
    }

    public async Task<Customer?> GetByIdAsync(int id)
    {
        return await _context.Customers
        .Include(c => c.Addresses)
        .Include(c => c.Contacts)
        .FirstOrDefaultAsync(customer => customer.Id == id);
    }

    public async Task<Customer> AddAsync(Customer customer)
    {
        _context.Customers.Add(customer);
        await _context.SaveChangesAsync();
        return customer;
    }

    public async Task UpdateAsync(int id, CustomerUpdateRequest updatedCustomer)
    {
        var customer = await GetByIdAsync(id);
        if (customer is null)
            throw new InvalidOperationException("Cannot update a non-existent customer.");

        _context.Remove(customer);
        await AddAsync(new Customer{
            Name = updatedCustomer.Name,
            CustomerNumber = updatedCustomer.CustomerNumber,
            Created = customer.Created,
            Addresses = updatedCustomer.Addresses.Select(address => new Address{
                City = address.City,
                Street = address.Street,
            }).ToList(),
            Contacts  = updatedCustomer.Contacts.Select(contact => new Contact{
                FullName = contact.FullName,
                Email = contact.Email,
                OfficeNumber = contact.OfficeNumber
            }).ToList(),
        });
        await _context.SaveChangesAsync();
    }

    public async Task<Customer?> GetByNameAsync(string name)
    {
        return await _context.Customers.FirstOrDefaultAsync(c => c.Name == name);
    }

    public async Task DeleteAsync(Customer customer)
    {
        customer.IsDeleted = true;
        await _context.SaveChangesAsync();
    }
}
