import { useEffect, useState } from "react";
import useAuth from "../auth";

const API_BASE =  "http://localhost:8000";

export default function QuickAdd({ onTaskCreated }) {
  const [input, setInput] = useState("");
  const [parsed, setParsed] = useState(null); // { title, assignee, dueDate, priority, tags }
  const [rawInput, setRawInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);



  const {request}=useAuth();
  async function handleParse() {
    if (!input.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await request.post('/task/parse',{text:input})
    
      // if (!res.ok) throw new Error("Parse request failed");
     console.log(res);
      setParsed(res.data.parsed);
      setRawInput(res.data.parsed);
    } catch (err) {
      setError("Couldn't parse that — try rephrasing or fill in manually.");
      // Fallback: let the user still create a task from raw text
      setParsed({ title: input, assignee: null, dueDate: null, priority: null, tags: [] });
      setRawInput(input);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    try {
      const res = await fetch(`${API_BASE}/api/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed, rawInput }),
      });
      if (!res.ok) throw new Error("Save failed");
      const savedTask = await res.json();
      onTaskCreated?.(savedTask);
      setParsed(null);
      setInput("");
    } catch (err) {
      setError("Couldn't save the task. Try again.");
    }
  }

  function updateField(field, value) {
    setParsed((prev) => ({ ...prev, [field]: value }));
  }

useEffect(()=>{
    console.log(parsed);
},[parsed])

  return (
    <div className="quick-add">
      <div className="quick-add-row">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleParse()}
          placeholder='e.g. "ask priya to finalize the Q3 deck by next friday, high priority #finance"'
        />
        <button onClick={handleParse} disabled={loading}>
          {loading ? "Parsing..." : "Add"}
        </button>
      </div>

      {error && <div className="quick-add-error">{error}</div>}

      {parsed && (
        <div className="quick-add-review">
          <label>
            Title
            <input value={parsed.title || ""} onChange={(e) => updateField("title", e.target.value)} />
          </label>
          <label>
            Assignee
            <input
              value={parsed.assignee || ""}
              onChange={(e) => updateField("assignee", e.target.value)}
              placeholder="Unassigned"
            />
          </label>
          <label>
            Due date
            <input
              type="date"
              value={parsed.dueDate || ""}
              onChange={(e) => updateField("dueDate", e.target.value)}
            />
          </label>
          <label>
            Priority
            <select value={parsed.priority || ""} onChange={(e) => updateField("priority", e.target.value)}>
              <option value="">None</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </label>
          <label>
            Tags
            <input
              value={(parsed.tags || []).join(", ")}
              onChange={(e) =>
                updateField(
                  "tags",
                  e.target.value.split(",").map((t) => t.trim()).filter(Boolean)
                )
              }
            />
          </label>

          <div className="quick-add-actions">
            <button onClick={() => setParsed(null)}>Cancel</button>
            <button onClick={handleSave}>Save task</button>
          </div>
        </div>
      )}
    </div>
  );
}
