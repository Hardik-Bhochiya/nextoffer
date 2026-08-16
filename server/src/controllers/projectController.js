import { memoryStore } from '../services/store.js';

export const getProjects = (req, res) => {
  try {
    const projects = memoryStore.getProjects();
    return res.json({ success: true, data: projects });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createProject = (req, res) => {
  try {
    const { title, description, techStack, githubUrl, liveUrl, status, milestones } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, message: 'Project title is required' });
    }
    const newProject = memoryStore.addProject({
      title,
      description: description || '',
      techStack: Array.isArray(techStack) ? techStack : (techStack ? techStack.split(',').map(s => s.trim()) : []),
      githubUrl: githubUrl || '',
      liveUrl: liveUrl || '',
      status: status || 'In Progress',
      milestones: milestones || []
    });
    return res.status(201).json({ success: true, data: newProject });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProject = (req, res) => {
  try {
    const { id } = req.params;
    const updated = memoryStore.updateProject(id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    return res.json({ success: true, data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProject = (req, res) => {
  try {
    const { id } = req.params;
    const deleted = memoryStore.deleteProject(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    return res.json({ success: true, message: 'Project deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
