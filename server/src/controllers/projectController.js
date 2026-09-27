import Project from '../models/Project.js';

/**
 * Normalizes MongoDB document into client-friendly plain object
 * ensuring standard `.id` string representation.
 */
const formatDoc = (doc) => {
  if (!doc) return null;
  const obj = doc.toObject ? doc.toObject() : { ...doc };
  obj.id = obj._id ? obj._id.toString() : obj.id;
  return obj;
};

/**
 * GET /api/projects
 * Fetches all portfolio and technical projects for the authenticated user,
 * sorted by most recent first.
 */
export const getProjects = async (req, res) => {
  try {
    const userId = req.user?.id;
    const projects = await Project.find({ userId }).sort({ createdAt: -1 });
    return res.json({ success: true, data: projects.map(formatDoc) });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * POST /api/projects
 * Creates a new project showcase entry.
 * Automatically handles string comma-separation or array format for techStack.
 */
export const createProject = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { title, description, category, projectType, techStack, githubUrl, liveUrl, status, milestones } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, message: 'Project title is required' });
    }
    const newProject = await Project.create({
      userId,
      title: title.trim(),
      description: description || '',
      category: category || projectType || 'Full Stack',
      projectType: projectType || category || 'Full Stack Web Application',
      techStack: Array.isArray(techStack) ? techStack : (techStack ? techStack.split(',').map(s => s.trim()).filter(Boolean) : []),
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

/**
 * PUT /api/projects/:id
 * Updates project details (status, tech stack, milestones, repository URLs).
 * Ensures ownership verification by scoping to `userId`.
 */
export const updateProject = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    const updateData = { ...req.body };
    if (updateData.techStack && typeof updateData.techStack === 'string') {
      updateData.techStack = updateData.techStack.split(',').map(s => s.trim()).filter(Boolean);
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

/**
 * DELETE /api/projects/:id
 * Removes a project entry owned by the authenticated user.
 */
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

