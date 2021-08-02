namespace StoreApi.Filters
{
    public class PaginationFilter
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public bool Sort { get; set; }
        public string Searchtext { get; set; }
        public PaginationFilter()
        {
            this.PageNumber = 1;
            this.PageSize = 100;
            this.Sort = true;
            this.Searchtext = null;
        }
        public PaginationFilter(int pageNumber, int pageSize, bool sort, string searchtext = null)
        {
            this.PageNumber = pageNumber < 1 ? 1 : pageNumber;
            this.PageSize = pageSize > 100 ? 100 : pageSize;
            this.Sort = sort;
            this.Searchtext = searchtext;
        }
    }
}