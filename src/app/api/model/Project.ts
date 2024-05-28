import { Schema, model, models } from 'mongoose';

interface Project {
  title: string;
  desc: string;
  projectCompanyName: string;
  projectCompanyDesc: string;
  work: string[];
  scopeOfWorkLine: string; // Use camelCase for consistency
  scopeOfWork: string[]; // Use camelCase for consistency
  projectGoalLine: string;  // Use camelCase for consistency
  projectGoal: string[];   // Use camelCase for consistency
  screens: string[];
  researchLine: string;
  resultLine: string;
  resultStatistics: { percentage: string; description: string }[]; 
  keepTakeAway: string[];
}

const projectSchema = new Schema<Project>({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  projectCompanyName: {
    type: String,
    required: true,
  },
  projectCompanyDesc: {
    type: String,
    required: true,
  },
  work: {
    type: [String],
    required: false,
  },
  scopeOfWorkLine: {
    type: String,
    required: false,
  },
  scopeOfWork: {
    type: [String],
    required: false,
  },
  projectGoalLine: {
    type: String,
    required: false,
  },
  projectGoal: {
    type: [String],
    required: false,
  },
  screens: {
    type: [String],
    required: false,
  },
  researchLine: {
    type: String,
    required: false,
  },
  resultLine: {
    type: String,
    required: false,
  },
  resultStatistics: {
    type: [
      {
        percentage: { type: String, required: true },
        description: { type: String, required: true },
      }
    ],
    required: false,
  },
  keepTakeAway: {
    type: [String],
    required: false,
  },
});


export function validateProject(data: any): data is Project {
  // Validate each field
  if (typeof data.title !== 'string') return false;
  console.log(1)
  if (typeof data.desc !== 'string') return false;
  if (typeof data.projectCompanyName !== 'string') return false;
  if (typeof data.projectCompanyDesc !== 'string') return false;
  console.log(2)
  if (!Array.isArray(data.work) || !data.work.every((item: any) => typeof item === 'string')) return false;
  console.log(3)
  if (data.scopeOfWorkLine && typeof data.scopeOfWorkLine !== 'string') return false;
  console.log(4)
  if (!Array.isArray(data.scopeOfWork) || !data.scopeOfWork.every((item: any) => typeof item === 'string')) return false;
  console.log(5)
  if (data.projectGoalLine && typeof data.projectGoalLine !== 'string') return false;
  if (data.researchLine && typeof data.researchLine !== 'string') return false;
  if (data.resultLine && typeof data.resultLine !== 'string') return false;
  console.log(6)
  if (!Array.isArray(data.projectGoal) || !data.projectGoal.every((item: any) => typeof item === 'string')) return false;
  console.log(7)
  if (!Array.isArray(data.screens) || !data.screens.every((item: any) => typeof item === 'string')) return false;
  if (!Array.isArray(data.keepTakeAway) || !data.keepTakeAway.every((item: any) => typeof item === 'string')) return false;
  if (data.resultStatistics && !data.resultStatistics.every((item: any) => typeof item.percentage === 'string' && typeof item.description === 'string')) return false;
 
  console.log(8)
  return true;
}

// if already project model then export that ,if not then create new model....
export default models.Project || model<Project>('Project', projectSchema);
