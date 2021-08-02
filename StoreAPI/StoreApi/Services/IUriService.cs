using System;
using StoreApi.Filters;

namespace StoreApi.Services
{
    public interface IUriService
    {
        public Uri GetPageUri(PaginationFilter filter, string route);
    }
}