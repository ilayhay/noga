using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
public class Contact
{
    [Key]
    public int Id { get; set; }

    [Required]
    [StringLength(255)]
    public string FullName { get; set; }

    [StringLength(15)]
    public string OfficeNumber { get; set; }

    [StringLength(100)]
    public string Email { get; set; }

    [ForeignKey("Customer")]
    public int CustomerId { get; set; }

    public virtual Customer Customer { get; set; }
}
