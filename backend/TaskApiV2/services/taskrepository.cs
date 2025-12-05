using TaskApi.Models;
using System.Text.Json;


namespace TaskApi.Services;

public class TaskRepository
{
    private readonly List<TaskItem> _tasks = new();
    private int _nextId = 1;

    public IEnumerable<TaskItem> GetAll() => _tasks;

    public TaskItem? GetById(int id) =>
        _tasks.FirstOrDefault(t => t.Id == id);

    public TaskItem Add(TaskItem task)
    {
        task.Id = _nextId++;
        _tasks.Add(task);
        return task;
    }

    public bool Delete(int id)
    {
        var task = GetById(id);
        if (task == null) return false;
        _tasks.Remove(task);
        return true;
    }

    public bool Update(int id, TaskItem updated)
    {
        var task = GetById(id);
        if (task == null) return false;

        task.Title = updated.Title;
        task.IsDone = updated.IsDone;
        return true;
    }

    public bool ToggleDone(int id)
    {
        var task = GetById(id);
        if (task == null) return false;

        task.IsDone = !task.IsDone;
        return true;
    }

    public IEnumerable<TaskItem> Search(string filter)
    {
        return _tasks.Where(t => t.Title.Contains(filter, StringComparison.OrdinalIgnoreCase));
    }

    public IEnumerable<TaskItem> FilterByTag(string tag)
    {
        return _tasks.Where(t => t.Tags.Contains(tag, StringComparer.OrdinalIgnoreCase));
    }

    public IEnumerable<TaskItem> GetExpired() =>
    _tasks.Where(t => t.Deadline.HasValue && t.Deadline.Value < DateTime.UtcNow);

    public IEnumerable<TaskItem> GetDueSoon(int hours) =>
    _tasks.Where(t => t.Deadline.HasValue &&
        t.Deadline.Value <= DateTime.UtcNow.AddHours(hours));

    public bool Archive(int id)
    {
        var task = GetById(id);
        if (task == null) return false;

        task.IsArchived = true;
        return true;
    }

    public void SaveToFile(string path)
    {
        var json = JsonSerializer.Serialize(_tasks);
        File.WriteAllText(path, json);
    }

    public void LoadFromFile(string path)
    {
        if (!File.Exists(path)) return;

        var json = File.ReadAllText(path);
        var items = JsonSerializer.Deserialize<List<TaskItem>>(json);
        if (items != null)
        {
            _tasks.Clear();
            _tasks.AddRange(items);
            _nextId = _tasks.Any() ? _tasks.Max(t => t.Id) + 1 : 1;
        }
    }

}
