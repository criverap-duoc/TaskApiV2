using Microsoft.AspNetCore.Mvc;
using TaskApi.Models;
using TaskApi.Services;

namespace TaskApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TaskController : ControllerBase
{
    private readonly TaskRepository _repo;

    public TaskController(TaskRepository repo)
    {
        _repo = repo;
    }

    // GET api/task
    [HttpGet]
    public IActionResult GetAll() =>
        Ok(_repo.GetAll());

    // GET api/task/5
    [HttpGet("{id:int}")]
    public IActionResult Get(int id)
    {
        var task = _repo.GetById(id);
        return task == null ? NotFound() : Ok(task);
    }

    // POST api/task
    [HttpPost]
    public IActionResult Create([FromBody] TaskItem task)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        _repo.Add(task);   // 👈 usar tu repositorio

        return Ok(task);
    }




    // PUT api/task/5
    [HttpPut("{id:int}")]
    public IActionResult Update(int id, [FromBody] TaskItem updated)
    {
        return _repo.Update(id, updated)
            ? Ok(updated)
            : NotFound();
    }


    // PATCH api/task/toggle/5
    [HttpPatch("toggle/{id:int}")]
    public IActionResult ToggleDone(int id)
    {
        return _repo.ToggleDone(id)
            ? Ok()
            : NotFound();
    }

    // DELETE api/task/5
    [HttpDelete("{id:int}")]
    public IActionResult Delete(int id)
    {
        return _repo.Delete(id)
            ? NoContent()
            : NotFound();
    }

    // GET api/task/search?q=texto
    [HttpGet("search")]
    public IActionResult Search([FromQuery] string q)
    {
        return Ok(_repo.Search(q));
    }

    // GET api/task/tag/work
    [HttpGet("tag/{tag}")]
    public IActionResult FilterByTag(string tag)
    {
        return Ok(_repo.FilterByTag(tag));
    }

    // GET api/task/expired
    [HttpGet("expired")]
    public IActionResult Expired() => Ok(_repo.GetExpired());

    // GET api/task/duesoon?hours=24
    [HttpGet("duesoon")]
    public IActionResult DueSoon([FromQuery] int hours = 24)
    {
        return Ok(_repo.GetDueSoon(hours));
    }

    // PATCH api/task/archive/5
    [HttpPatch("archive/{id:int}")]
    public IActionResult Archive(int id)
    {
        return _repo.Archive(id)
            ? Ok()
            : NotFound();
    }
}
