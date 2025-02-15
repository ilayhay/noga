
public class CustomerUpdateRequest
{
    // public int Id { get; set; }
    public string Name { get; set; }
    public string CustomerNumber { get; set; }
    public bool IsDeleted { get; set; }
    public ICollection<AddressDto>? Addresses { get; set; }
    public ICollection<ContactDto>? Contacts { get; set; }
}
