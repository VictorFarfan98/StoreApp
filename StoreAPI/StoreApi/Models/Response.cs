namespace StoreApi.Models
{
    public class Response<T>
    {
        public Response()
        {
            Succees = true;
            Message = string.Empty;
            Errors = null;
        }
        public Response(T data = default)
        {
            Succees = true;
            Message = string.Empty;
            Errors = null;
            Data = data;
        }
        public T Data { get; set; }
        public bool Succees { get; set; }
        public string[] Errors { get; set; }
        public string Message { get; set; }
    }
}