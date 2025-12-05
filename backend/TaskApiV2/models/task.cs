namespace TaskApi.Models
{

    public enum Priority { Low, Medium, High }

    public class TaskItem
    {
        public int Id { get; set; }

        public string Title { get; set; } = "";

        public string Description { get; set; } = string.Empty;


        public bool IsDone { get; set; } = false;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? Deadline { get; set; }

        public List<string> Tags { get; set; } = new();

        public Priority PriorityLevel { get; set; } = Priority.Medium;

        public bool IsArchived { get; set; }

    }
}
