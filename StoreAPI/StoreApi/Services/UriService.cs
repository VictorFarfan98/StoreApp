using System;
using Microsoft.AspNetCore.WebUtilities;
using StoreApi.Filters;

namespace StoreApi.Services
{
    public class UriService : IUriService
    {
        private readonly string _baseUri;
        public UriService(string baseUri)
        {
            _baseUri = baseUri;
        }
        public Uri GetPageUri(PaginationFilter filter, string route)
        {
            var _enpointUri = new Uri(string.Concat(_baseUri, route));
            var modifiedUri = QueryHelpers.AddQueryString(_enpointUri.ToString(), "pageNumber", filter.PageNumber.ToString());
            modifiedUri = QueryHelpers.AddQueryString(modifiedUri, "pageSize", filter.PageSize.ToString());
            modifiedUri = QueryHelpers.AddQueryString(modifiedUri, "sort", filter.Sort.ToString());
            if (filter.Searchtext != null)
                modifiedUri = QueryHelpers.AddQueryString(modifiedUri, "searchtext", filter.Searchtext);
            return new Uri(modifiedUri);
        }
    }
}