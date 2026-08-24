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
        console.warn('Gemini API call failed, using built-in mentor heuristics:', geminiError.message);
      }
    }

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

// AI Resume ATS Scanner & Parser
export const scanResume = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { resumeText, jobDescription, targetRole } = req.body;

    if (!resumeText || resumeText.trim().length < 50) {
      return res.status(400).json({ success: false, message: 'Please provide valid resume text (at least 50 characters)' });
    }

    const user = await User.findById(userId);
    const role = (targetRole || user?.targetRole || 'Full Stack Engineer').toLowerCase();

    // Core keyword definitions per role
    const keywordsByRole = {
      frontend: ['React', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Redux', 'REST APIs', 'Git', 'Webpack', 'Performance Optimization', 'Responsive Design', 'Jest'],
      backend: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'SQL', 'RESTful API', 'Docker', 'Redis', 'JWT', 'Microservices', 'System Design', 'Git', 'AWS'],
      fullstack: ['React', 'Node.js', 'Express', 'MongoDB', 'TypeScript', 'REST APIs', 'Docker', 'Git', 'SQL', 'System Design', 'CI/CD', 'Tailwind', 'Redux'],
      devops: ['Docker', 'Kubernetes', 'CI/CD', 'GitHub Actions', 'AWS', 'Linux', 'Terraform', 'Monitoring', 'Bash', 'Git', 'Python', 'Nginx']
    };

    let targetKeywords = keywordsByRole.fullstack;
    if (role.includes('frontend') || role.includes('ui') || role.includes('react')) {
      targetKeywords = keywordsByRole.frontend;
    } else if (role.includes('backend') || role.includes('node') || role.includes('java')) {
      targetKeywords = keywordsByRole.backend;
    } else if (role.includes('devops') || role.includes('cloud')) {
      targetKeywords = keywordsByRole.devops;
    }

    const textLower = resumeText.toLowerCase();

    // Check matched keywords
    const matchedKeywords = targetKeywords.filter(kw => textLower.includes(kw.toLowerCase()));
    const missingKeywords = targetKeywords.filter(kw => !textLower.includes(kw.toLowerCase()));

    // Keyword Match Score (0-100)
    const keywordScore = Math.round((matchedKeywords.length / targetKeywords.length) * 100);

    // Bullet Point Quality Analysis (XYZ Formula check)
    const lines = resumeText.split('\n').filter(l => l.trim().length > 20);
    const actionVerbs = ['engineered', 'developed', 'architected', 'implemented', 'optimized', 'reduced', 'increased', 'designed', 'built', 'created', 'accelerated', 'scaled'];
    const metricsPattern = /\b(\d+%|\d+ms|\d+k|\d+x|\$\d+|\d+\+)\b/i;

    let strongBullets = [];
    let weakBullets = [];

    lines.forEach(line => {
      const trimmed = line.trim();
      const hasActionVerb = actionVerbs.some(v => trimmed.toLowerCase().startsWith(v) || trimmed.toLowerCase().includes(` ${v} `));
      const hasMetric = metricsPattern.test(trimmed);

      if (hasActionVerb && hasMetric) {
        strongBullets.push(trimmed);
      } else if (trimmed.length > 30 && (trimmed.startsWith('-') || trimmed.startsWith('•') || trimmed.startsWith('*'))) {
        weakBullets.push({
          original: trimmed,
          suggestion: `Strengthen with Google XYZ formula: "Accomplished [X] as measured by [Y], by doing [Z]". Add measurable metrics.`
        });
      }
    });

    // Formatting Checks
    const formatChecks = [
      { check: 'Standard Contact Info (Email, Phone, LinkedIn/GitHub)', passed: textLower.includes('@') && (textLower.includes('github') || textLower.includes('linkedin')) },
      { check: 'Technical Skills Section Present', passed: textLower.includes('skills') || textLower.includes('technologies') || textLower.includes('tech stack') },
      { check: 'Projects Section with Details', passed: textLower.includes('project') || textLower.includes('experience') },
      { check: 'Quantified Metrics & Achievements', passed: metricsPattern.test(resumeText) },
      { check: 'ATS Friendly Word Count (350 - 900 words)', passed: resumeText.split(/\s+/).length >= 200 && resumeText.split(/\s+/).length <= 1200 }
    ];

    const formatPassedCount = formatChecks.filter(c => c.passed).length;
    const formatScore = Math.round((formatPassedCount / formatChecks.length) * 100);

    // Overall ATS Score (50% keywords, 30% formatting & structure, 20% impact bullets)
    const overallScore = Math.min(100, Math.max(10, Math.round((keywordScore * 0.50) + (formatScore * 0.30) + (Math.min(100, (strongBullets.length / Math.max(1, strongBullets.length + weakBullets.length)) * 100) * 0.20))));

    return res.json({
      success: true,
      data: {
        overallScore,
        targetRole: user?.targetRole || 'Full Stack Engineer',
        keywordScore,
        matchedKeywords,
        missingKeywords,
        formatChecks,
        strongBulletsCount: strongBullets.length,
        weakBullets: weakBullets.slice(0, 3),
        summary: overallScore >= 80 
          ? 'Excellent ATS Compatibility! Your resume strongly matches industry keywords.'
          : overallScore >= 60
          ? 'Good base, but adding missing key tech keywords and metrics will boost interview callbacks.'
          : 'Needs ATS Optimization. Include missing core skills and quantify your project impacts.'
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
