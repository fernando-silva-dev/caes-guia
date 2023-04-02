namespace App.Models;

public class PagedResult<T> where T : class {
    public int TotalRecords { get; set; }
    public IEnumerable<T> Data { get; set; }
}
