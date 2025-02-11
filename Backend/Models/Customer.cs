using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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

    public virtual ICollection<Address> Addresses { get; set; }
    public virtual ICollection<Contact> Contacts { get; set; }
}
