export const projectStatusOptions = ["Active", "Closed", "Archived"] as const;

export type ProjectStatus = 0 | 1 | 2;

export interface Project {
  id: string;
  name: string;
  description: string;
  issueCount: number;
  updatedAt: string;
  progress: number;
  status: ProjectStatus; // 0: active, 1: closed, 2: archived
  currentUserRole?: ProjectMemberRole;
}

export interface CreateProjectInput {
  name: string;
  description: string;
}

export const projectMemberRoleOptions = ["admin", "member", "viewer"] as const;

export type ProjectMemberRole = 0 | 1 | 2;

export interface ProjectMember {
  id: string;
  projectId: string;
  name: string;
  role: ProjectMemberRole; // 0: admin, 1: member, 2: viewer
  userId?: string;
  email?: string;
  status?: number;
}

export interface Label {
  id: string;
  name: string;
  color: string;
  description: string;
  createdAt: string;
}

export type IssueLabel = Pick<Label, "name" | "color" | "description">;

export interface CreateLabelInput {
  name: string;
  color: string;
  description: string;
}

export const issueStatusOptions = ["Todo", "In Progress", "Closed"] as const;
export type IssueStatus = 0 | 1 | 2;

export const priorityOptions = ["Low", "Medium", "High"] as const;
export type IssuePriority = 0 | 1 | 2;

export interface IssueComment {
  id: string;
  userName: string;
  message: string;
  timestamp: string;
}

export interface Issue {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: IssueStatus; // 0: to-do, 1: in progress, 2: closed
  priority: IssuePriority; // 0: low, 1: medium, 2: high
  labels: IssueLabel[];
  assignee: string;
  assigneeId?: string | null;
  updatedAt: string;
  comments: IssueComment[];
}

export interface CreateIssueInput {
  title: string;
  description: string;
  status: IssueStatus;
  priority: IssuePriority;
  labels: IssueLabel[];
  assignee: string;
}
