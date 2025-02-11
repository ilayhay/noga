using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

[Index(nameof(Name), IsUnique = true)]
public class Customer
{
    [Key]
    public int Id { get; set; }

    [Required]
    [StringLength(255)]
    public string Name { get; set; }

    [Required]
    [StringLength(50)]
    public string CustomerNumber { get; set; }

    [Required]
    public bool IsDeleted { get; set; }

    [Required]
    public DateTime Created { get; set; }

    public ICollection<Address>? Addresses { get; set; }
    public ICollection<Contact>? Contacts { get; set; }
}
