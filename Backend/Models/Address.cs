using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Address
{
    [Key]
    public int Id { get; set; }

    [Required]
    [StringLength(100)]
    public string City { get; set; }

    [Required]
    [StringLength(100)]
    public string Street { get; set; }

    [ForeignKey("Customer")]
    public int CustomerId { get; set; }

    public virtual Customer Customer { get; set; }
}
