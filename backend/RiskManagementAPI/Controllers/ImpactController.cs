using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RiskManagementAPI.Models;

namespace RiskManagementAPI.Controllers
{
    [Authorize]
    [Route("[controller]")]
    public class ImpactController : Controller
    {
        private readonly RiskManagementDbContext _context;

        public ImpactController(RiskManagementDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        // GET: Impact
        public async Task<IActionResult> Index()
        {
            return Json(await _context.Impact.ToListAsync());
        }

        [HttpGet("details/{id}")]
        // GET: Impact/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var impact = await _context.Impact
                .FirstOrDefaultAsync(m => m.Id == id);
            if (impact == null)
            {
                return NotFound();
            }

            return Json(impact);
        }

        // POST: Impact/Create
        [HttpPost("create")]
        public async Task<IActionResult> Create([Bind("Id,Name,Value")] [FromBody] Impact impact)
        {
            if (ModelState.IsValid)
            {
                while (true)
                {
                    var existingProject = _context.Impact.FirstOrDefault(r => r.Id == impact.Id);
                    if (existingProject != null)
                    {
                        impact.Id = existingProject.Id + 1;
                    }
                    else
                    {
                        break;
                    }
                }

                _context.Add(impact);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return Json(impact);
        }

        [HttpGet("edit/{id}")]
        // GET: Impact/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var impact = await _context.Impact.FindAsync(id);
            if (impact == null)
            {
                return NotFound();
            }
            return Json(impact);
        }

        // POST: Impact/Edit/5
        [HttpPost("edit/{id}")]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Name,Value")] [FromBody] Impact impact)
        {
            if (id != impact.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(impact);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ImpactExists(impact.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return Json(impact);
        }

        [HttpGet("delete/{id}")]
        // GET: Impact/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var impact = await _context.Impact
                .FirstOrDefaultAsync(m => m.Id == id);
            if (impact == null)
            {
                return NotFound();
            }

            return Json(impact);
        }

        // POST: Impact/Delete/5
        [HttpPost("delete/{id}"), ActionName("Delete")]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var impact = await _context.Impact.FindAsync(id);
            _context.Impact.Remove(impact);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool ImpactExists(int id)
        {
            return _context.Impact.Any(e => e.Id == id);
        }
    }
}
