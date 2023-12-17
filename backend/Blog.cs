public class Blog
    {
        public int Id {get; set;}
        public required string Title {get; set;}
        public string Description {get; set;} = string.Empty;
        public string ImageLink {get; set;} = string.Empty;
     
    }