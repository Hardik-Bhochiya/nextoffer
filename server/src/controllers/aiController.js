import DsaProblem from '../models/DsaProblem.js';
import User from '../models/User.js';

export const askMentor = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { prompt, context } = req.body;
    if (!prompt) {
      return res.status(400).json({ success: false, message: 'Prompt is required' });
    }

    const user = await User.findById(userId);
    const geminiKey = process.env.GEMINI_API_KEY;

    // If GEMINI_API_KEY is configured, call Gemini API
    if (geminiKey) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: `You are NextOffer AI, an expert software engineering placement mentor and technical interviewer.
Student info: Target Role: ${user?.targetRole || 'Software Engineer'}, Dream Companies: ${user?.dreamCompany || 'Tier-1 Tech'}, Grad Year: ${user?.gradYear || '2026'}.
Respond with actionable, concise, markdown-formatted advice, code snippets, or system design insights.

User question: ${prompt}`
                }]
              }]
            })
          }
        );

        if (response.ok) {
          const data = await response.json();
          const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (replyText) {
            return res.json({
              success: true,
              data: {
                reply: replyText,
                timestamp: new Date().toISOString()
              }
            });
          }
        }
      } catch (geminiError) {
        console.warn('Gemini API call failed, falling back to built-in mentor heuristics:', geminiError.message);
      }
    }

    // High quality built-in contextual fallback response
    const lowerPrompt = prompt.toLowerCase();
    let responseText = '';

    if (lowerPrompt.includes('roadmap') || lowerPrompt.includes('study plan') || lowerPrompt.includes('prepare')) {
      responseText = `### 🎯 Targeted Placement Acceleration Plan (${user?.targetRole || 'Software Engineer'})

Here is an optimized roadmap tailored to crack top tier technical interviews:

1. **Week 1: Core DSA Mastery (Arrays, Sliding Window, Two Pointers)**
   - Solve 15 LeetCode Mediums on Two Pointers & Prefix Sum.
   - Master Sliding Window template for subarray/substring problems.
   
2. **Week 2: Non-Linear Data Structures (Trees, BST, Graphs)**
   - Practice BFS / DFS traversals, LCA, and Level Order.
   - Master Topological Sort (Kahn’s Algorithm) and Cycle Detection.

3. **Week 3: Dynamic Programming & Recursion**
   - 0/1 Knapsack pattern, Unbounded Knapsack, Longest Common Subsequence (LCS), and LIS.
   - Focus on state transition diagrams and memoization -> tabulation.

4. **Week 4: System Design & Core CS Fundamentals**
   - OS: Deadlock, Paging, Virtual Memory, Multithreading.
   - DBMS: Indexing (B-Trees), ACID properties, SQL vs NoSQL, Sharding.
   - System Design: Caching, Rate Limiting, Load Balancing, Microservices.`;
    } else if (lowerPrompt.includes('resume') || lowerPrompt.includes('ats')) {
      responseText = `### 📄 ATS Resume Optimization for ${user?.targetRole || 'Software Engineering'}

1. **Quantify Your Impact (Google XYZ Formula)**:
   - *Weak*: "Built a chat app using React and Socket.io."
   - *Strong*: "Engineered a real-time collaborative code editor with Socket.io and React, reducing message latency by 45% for 500+ concurrent users."

2. **Project Section Checklist**:
   - Include 2-3 full-stack or systems projects with live URLs and clean GitHub repositories.
   - Highlight tech stack explicitly: React, Node.js, TypeScript, PostgreSQL, Docker, Redis.

3. **Format & ATS Keywords**:
   - Single-column standard formatting (avoid multi-column graphical tables that break ATS parsers).
   - Use standard headers: Education, Technical Skills, Projects, Experience / Achievements.`;
    } else if (lowerPrompt.includes('mock') || lowerPrompt.includes('interview')) {
      responseText = `### 🎤 Mock Interview Challenge: Design a Scalable Rate Limiter

Target Company: **${user?.dreamCompany || 'Top Tech Companies'}**

**Problem**: Design an API Rate Limiter that allows a maximum of 100 requests per minute per IP address.

**Questions for you to consider**:
1. Which algorithm would you choose: *Token Bucket*, *Leaky Bucket*, *Fixed Window Counter*, or *Sliding Window Log*?
2. Where would you store the request timestamps or token counts (In-memory, Redis, or Database)?
3. How do you handle distributed race conditions across multiple server instances?

*(Tip: In high-scale interviews, Sliding Window Counter stored in Redis with atomic Lua scripts is the industry standard!)*`;
    } else if (lowerPrompt.includes('complexity') || lowerPrompt.includes('big o')) {
      responseText = `### ⏱️ Time & Space Complexity Master Reference

- **Two Pointers / Sliding Window**: Typically **O(n)** time and **O(1)** or **O(k)** space.
- **Binary Search**: **O(log n)** time, **O(1)** space.
- **Tree Traversals (DFS/BFS)**: **O(V)** time, **O(h)** recursion stack space (where h = tree height).
- **Graph BFS / DFS**: **O(V + E)** time, **O(V)** queue/visited set space.
- **Sorting (MergeSort/HeapSort)**: **O(n log n)** time.

*Pro-tip for interviews:* Always state your brute-force complexity first before optimizing to the optimal O(n) or O(n log n) solution.`;
    } else {
      responseText = `### 🤖 NextOffer AI Placement Mentor

Great question! Based on your target role (${user?.targetRole || 'Software Engineer'}) and preparation plan:

- **Key Takeaway**: When solving technical interview problems, follow these 3 steps:
  1. Clarify constraints and edge cases (empty arrays, negative numbers, overflow).
  2. Explain the intuition (e.g. hash map trade-off vs two-pointer sorted array).
  3. Analyze Time and Space complexity before writing code.

Keep up the consistency! Check your **Revision Planner** and **DSA Tracker** to log your daily progress.`;
    }

    return res.json({
      success: true,
      data: {
        reply: responseText,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const analyzeWeakness = async (req, res) => {
  try {
    const userId = req.user?.id;
    const problems = await DsaProblem.find({ userId });
    const unsolvedOrRevision = problems.filter(p => p.status === 'Needs Revision' || p.status === 'Attempted');
    
    // Group weak topics
    const weakTopicsMap = {};
    unsolvedOrRevision.forEach(p => {
      weakTopicsMap[p.topic] = (weakTopicsMap[p.topic] || 0) + 1;
    });

    const recommendations = Object.entries(weakTopicsMap)
      .sort((a, b) => b[1] - a[1])
      .map(([topic, count]) => ({
        topic,
        pendingCount: count,
        recommendation: `High Priority: Practice 3-5 more problems in ${topic} focusing on edge cases and time complexity.`
      }));

    return res.json({
      success: true,
      data: {
        weakTopics: recommendations,
        totalNeedsWork: unsolvedOrRevision.length,
        summary: recommendations.length > 0 
          ? `You have ${unsolvedOrRevision.length} problems requiring revision, primarily in ${recommendations[0]?.topic || 'DSA'}.`
          : (problems.length === 0 ? 'Start by adding your solved & attempted DSA questions to unlock tailored AI weakness analysis!' : 'Great job! All your logged DSA topics are solved and up to date.')
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
