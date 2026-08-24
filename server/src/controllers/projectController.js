import Project from '../models/Project.js';

const formatDoc = (doc) => {
  if (!doc) return null;
  const obj = doc.toObject ? doc.toObject() : { ...doc };
  obj.id = obj._id ? obj._id.toString() : obj.id;
  return obj;
};

export const getProjects = async (req, res) => {
  try {
    const userId = req.user?.id;
    const projects = await Project.find({ userId }).sort({ createdAt: -1 });
    return res.json({ success: true, data: projects.map(formatDoc) });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createProject = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { title, description, techStack, githubUrl, liveUrl, status, milestones } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, message: 'Project title is required' });
    }
    const newProject = await Project.create({
      userId,
      title,
      description: description || '',
      techStack: Array.isArray(techStack) ? techStack : (techStack ? techStack.split(',').map(s => s.trim()) : []),
      githubUrl: githubUrl || '',
      liveUrl: liveUrl || '',
      status: status || 'In Progress',
      milestones: milestones || []
    });
    return res.status(201).json({ success: true, data: formatDoc(newProject) });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    const updateData = { ...req.body };
    if (updateData.techStack && typeof updateData.techStack === 'string') {
      updateData.techStack = updateData.techStack.split(',').map(s => s.trim());
    }

    const updated = await Project.findOneAndUpdate(
      { _id: id, userId },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    return res.json({ success: true, data: formatDoc(updated) });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    const deleted = await Project.findOneAndDelete({ _id: id, userId });

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    return res.json({ success: true, message: 'Project deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
