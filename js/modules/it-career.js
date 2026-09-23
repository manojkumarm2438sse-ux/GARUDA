// ==========================================================================
// GARUDA OS - IT Career Module: Java Full Stack & Measurable Daily Tasks
// Tailored for Final-Year B.Tech ECE Placement & Technical Entry Preparation
// ==========================================================================

import { store } from '../store.js';
import { IT_CURRICULUM, IT_MEASURABLE_TASK_PRESETS } from '../data/it-data.js';

export function renderITCareerView(container) {
  const state = store.state;
  const itMission = state.todayMission.it;

  container.innerHTML = `
    <div class="view-header" style="margin-bottom: 1.25rem;">
      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;">
        <div>
          <h2>💻 IT Career: Java Full Stack Mastery</h2>
          <p>B.Tech ECE Final Year • Campus Placement Safety Net & Technical Officer Entry</p>
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <button id="btn-generate-it-task" class="btn btn-primary btn-sm">🎯 Generate Today's Measurable Task</button>
        </div>
      </div>
    </div>

    <!-- Measurable Daily Task Box -->
    <div class="card card-gold">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
        <div>
          <span style="font-size: 0.72rem; text-transform: uppercase; font-weight: 800; color: var(--accent-gold);">Measurable Execution Directive</span>
          <h3 style="font-size: 1.15rem; color: var(--text-primary); margin-top: 0.2rem;" id="it-task-title">${IT_MEASURABLE_TASK_PRESETS[0].title}</h3>
        </div>
        <span class="meta-chip" id="it-task-duration">${IT_MEASURABLE_TASK_PRESETS[0].duration}</span>
      </div>

      <div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.9rem; margin: 0.75rem 0;">
        <div style="background: var(--bg-surface-elevated); padding: 0.65rem 0.85rem; border-radius: var(--radius-md);">
          <strong>1. Theory & Concept (20 min):</strong> <span id="it-task-theory">${IT_MEASURABLE_TASK_PRESETS[0].theory}</span>
        </div>
        <div style="background: var(--bg-surface-elevated); padding: 0.65rem 0.85rem; border-radius: var(--radius-md);">
          <strong>2. Practical Coding Challenge (20 min):</strong> <span id="it-task-coding">${IT_MEASURABLE_TASK_PRESETS[0].codingTask}</span>
        </div>
        <div style="background: var(--bg-surface-elevated); padding: 0.65rem 0.85rem; border-radius: var(--radius-md);">
          <strong>3. Top Interview Question:</strong> <span id="it-task-interview" style="color: var(--accent-gold); font-weight: 600;">${IT_MEASURABLE_TASK_PRESETS[0].interviewQuestion}</span>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem;">
        <span style="font-size: 0.8rem; color: var(--text-muted);">Status: ${itMission.codingProblemsSolved}/${itMission.codingTarget} problems coded today</span>
        <button id="btn-log-coding-done" class="btn btn-olive btn-sm">Mark 1 Problem Coded (+1)</button>
      </div>
    </div>

    <!-- Curriculum Roadmap Tree -->
    <div class="card">
      <h3 style="margin-bottom: 0.75rem; font-size: 1.05rem;">🗺️ Java Full Stack Syllabus & Placement Roadmap</h3>
      
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        ${IT_CURRICULUM.map(section => `
          <div style="border-left: 3px solid var(--accent-gold); padding-left: 0.85rem;">
            <h4 style="color: var(--text-primary); margin-bottom: 0.5rem; font-size: 0.95rem;">${section.module}</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 0.5rem;">
              ${section.topics.map(t => `
                <div class="it-topic-item ${t.status === 'Completed' ? 'completed' : ''}">
                  <div>
                    <div style="font-weight: 600; font-size: 0.85rem; color: var(--text-primary);">${t.name}</div>
                    <span style="font-size: 0.72rem; color: var(--text-muted);">${t.level}</span>
                  </div>
                  <span class="badge ${t.status === 'Completed' ? 'badge-strong' : (t.status === 'In Progress' ? 'badge-learning' : 'badge-unstarted')}">
                    ${t.status}
                  </span>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Interactive Java & SQL Technical Coding Challenges -->
    <div class="card card-olive">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
        <div>
          <h3 style="color: #86EFAC; font-size: 1.1rem;">⚡ Top 5 Placement Coding & SQL Challenges</h3>
          <p style="font-size: 0.8rem; color: var(--text-primary); margin-bottom: 0;">Frequently asked in technical rounds for ECE graduates.</p>
        </div>
        <span class="badge badge-strong">Interactive</span>
      </div>

      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <!-- Problem 1 -->
        <div class="card" style="margin-bottom: 0; background: var(--bg-surface);">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem;">
            <strong style="color: var(--accent-gold); font-size: 0.95rem;">1. Two Sum using HashMap (O(N) Time)</strong>
            <span class="badge badge-revised">Java Collections</span>
          </div>
          <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.5rem;">
            Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.
          </p>
          <button class="btn btn-outline btn-sm code-toggle-btn" data-code-id="code-sol-1">Reveal Java Solution ↓</button>
          <pre id="code-sol-1" style="display: none; margin-top: 0.5rem; background: #0B0F19; padding: 0.75rem; border-radius: var(--radius-md); font-family: var(--font-mono); font-size: 0.82rem; color: #86EFAC; overflow-x: auto;">
public int[] twoSum(int[] nums, int target) {
    Map&lt;Integer, Integer&gt; map = new HashMap&lt;&gt;();
    for (int i = 0; i &lt; nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement)) {
            return new int[] { map.get(complement), i };
        }
        map.put(nums[i], i);
    }
    return new int[] {};
}</pre>
        </div>

        <!-- Problem 2 -->
        <div class="card" style="margin-bottom: 0; background: var(--bg-surface);">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem;">
            <strong style="color: var(--accent-gold); font-size: 0.95rem;">2. Find Second Highest Salary in SQL</strong>
            <span class="badge badge-revised">SQL Aggregation</span>
          </div>
          <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.5rem;">
            Write an SQL query to get the second highest salary from the <code>Employee</code> table. Return NULL if no 2nd highest salary exists.
          </p>
          <button class="btn btn-outline btn-sm code-toggle-btn" data-code-id="code-sol-2">Reveal SQL Solution ↓</button>
          <pre id="code-sol-2" style="display: none; margin-top: 0.5rem; background: #0B0F19; padding: 0.75rem; border-radius: var(--radius-md); font-family: var(--font-mono); font-size: 0.82rem; color: #38BDF8; overflow-x: auto;">
SELECT MAX(salary) AS SecondHighestSalary
FROM Employee
WHERE salary &lt; (SELECT MAX(salary) FROM Employee);</pre>
        </div>

        <!-- Problem 3 -->
        <div class="card" style="margin-bottom: 0; background: var(--bg-surface);">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem;">
            <strong style="color: var(--accent-gold); font-size: 0.95rem;">3. Detect Cycle in Linked List (Floyd's Algorithm)</strong>
            <span class="badge badge-revised">Data Structures</span>
          </div>
          <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.5rem;">
            Determine if the linked list has a cycle in it using O(1) memory (two-pointer slow and fast approach).
          </p>
          <button class="btn btn-outline btn-sm code-toggle-btn" data-code-id="code-sol-3">Reveal Java Solution ↓</button>
          <pre id="code-sol-3" style="display: none; margin-top: 0.5rem; background: #0B0F19; padding: 0.75rem; border-radius: var(--radius-md); font-family: var(--font-mono); font-size: 0.82rem; color: #86EFAC; overflow-x: auto;">
public boolean hasCycle(ListNode head) {
    if (head == null) return false;
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) return true;
    }
    return false;
}</pre>
        </div>
      </div>
    </div>
  `;

  // Attach task switcher
  let taskIdx = 0;
  container.querySelector('#btn-generate-it-task').addEventListener('click', () => {
    taskIdx = (taskIdx + 1) % IT_MEASURABLE_TASK_PRESETS.length;
    const task = IT_MEASURABLE_TASK_PRESETS[taskIdx];
    container.querySelector('#it-task-title').textContent = task.title;
    container.querySelector('#it-task-duration').textContent = task.duration;
    container.querySelector('#it-task-theory').textContent = task.theory;
    container.querySelector('#it-task-coding').textContent = task.codingTask;
    container.querySelector('#it-task-interview').textContent = task.interviewQuestion;
  });

  // Attach coding count button
  container.querySelector('#btn-log-coding-done').addEventListener('click', () => {
    store.state.todayMission.it.codingProblemsSolved = Math.min(5, store.state.todayMission.it.codingProblemsSolved + 1);
    store.recalculateDailyCompletion();
    store.saveState();
    renderITCareerView(container);
  });

  // Attach code toggle buttons
  container.querySelectorAll('.code-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const codeId = btn.dataset.codeId;
      const el = container.querySelector(`#${codeId}`);
      if (el) {
        const isHidden = el.style.display === 'none';
        el.style.display = isHidden ? 'block' : 'none';
        btn.textContent = isHidden ? 'Hide Solution ↑' : 'Reveal Solution ↓';
      }
    });
  });
}
