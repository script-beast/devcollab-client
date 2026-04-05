import type {
  IssuePriority,
  IssueStatus,
  ProjectMemberRole,
  ProjectStatus,
} from "./models";

export interface ApiUser {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
}

export interface ApiMemberCandidate extends ApiUser {}

export interface ApiLabel {
  id: string;
  name: string;
  color: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiComment {
  id: string;
  issueId: string;
  message: string;
  userName: string;
  createdBy: ApiUser;
  createdAt: string;
  updatedAt: string;
}

export interface ApiProjectMember {
  id: string;
  projectId: string;
  userId: string;
  name: string;
  email: string;
  role: ProjectMemberRole;
  status: number;
  createdAt: string;
  updatedAt: string;
}

export interface ApiIssue {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: IssueStatus;
  priority: IssuePriority;
  assignee: string | null;
  assigneeId: string | null;
  labels: ApiLabel[];
  comments: ApiComment[];
  inprogressDate?: string | null;
  closedDate?: string | null;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiProject {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  currentUserRole: ProjectMemberRole;
  issueCount: number;
  progress: number;
  createdAt: string;
  updatedAt: string;
  members?: ApiProjectMember[];
}

export interface AuthPayload {
  token: string;
  user: ApiUser;
}

export interface LoginMutationData {
  login: AuthPayload;
}

export interface LoginMutationVariables {
  email: string;
  password: string;
}

export interface RegisterMutationData {
  signUp: AuthPayload;
}

export interface RegisterMutationVariables {
  username: string;
  email: string;
  password: string;
}

export interface MeQueryData {
  me: ApiUser;
}

export interface GetProjectsQueryData {
  projects: {
    data: ApiProject[];
    total: number;
  };
}

export interface GetProjectQueryData {
  project: ApiProject & {
    members: ApiProjectMember[];
  };
}

export interface GetProjectQueryVariables {
  id: string;
}

export interface CreateProjectMutationData {
  createProject: ApiProject;
}

export interface CreateProjectMutationVariables {
  name: string;
  description?: string;
}

export interface UpdateProjectMutationData {
  updateProject: ApiProject;
}

export interface UpdateProjectMutationVariables {
  id: string;
  name?: string;
  description?: string;
  status?: ProjectStatus;
}

export interface DeleteProjectMutationData {
  deleteProject: boolean;
}

export interface DeleteProjectMutationVariables {
  id: string;
}

export interface GetProjectIssuesQueryData {
  issues: ApiIssue[];
}

export interface GetProjectIssuesQueryVariables {
  projectId: string;
}

export interface GetWorkspaceIssuesQueryData {
  workspaceIssues: ApiIssue[];
}

export interface CreateIssueMutationData {
  createIssue: ApiIssue;
}

export interface CreateIssueMutationVariables {
  projectId: string;
  title: string;
  description?: string;
  status?: IssueStatus;
  priority?: IssuePriority;
  assigneeId?: string | null;
  labels?: Array<{
    name: string;
    color?: string;
    description?: string;
  }>;
}

export interface UpdateIssueMutationData {
  updateIssue: ApiIssue;
}

export interface UpdateIssueMutationVariables {
  id: string;
  title?: string;
  description?: string;
  status?: IssueStatus;
  priority?: IssuePriority;
  assigneeId?: string | null;
  labels?: Array<{
    name: string;
    color?: string;
    description?: string;
  }>;
}

export interface UpdateIssueStatusMutationData {
  updateIssueStatus: ApiIssue;
}

export interface UpdateIssueStatusMutationVariables {
  id: string;
  status: IssueStatus;
}

export interface DeleteIssueMutationData {
  deleteIssue: boolean;
}

export interface DeleteIssueMutationVariables {
  id: string;
}

export interface CreateCommentMutationData {
  createComment: ApiComment;
}

export interface CreateCommentMutationVariables {
  issueId: string;
  message: string;
}

export interface GetLabelsQueryData {
  labels: ApiLabel[];
}

export interface CreateLabelMutationData {
  createLabel: ApiLabel;
}

export interface CreateLabelMutationVariables {
  name: string;
  color: string;
  description?: string;
}

export interface UpdateLabelMutationData {
  updateLabel: ApiLabel;
}

export interface UpdateLabelMutationVariables {
  id: string;
  name?: string;
  color?: string;
  description?: string;
}

export interface DeleteLabelMutationData {
  deleteLabel: boolean;
}

export interface DeleteLabelMutationVariables {
  id: string;
}

export interface AddProjectMemberByNameMutationData {
  addProjectMemberByName: ApiProjectMember;
}

export interface GetAvailableProjectUsersQueryData {
  availableProjectUsers: ApiMemberCandidate[];
}

export interface GetAvailableProjectUsersQueryVariables {
  projectId: string;
  search?: string;
}

export interface AddProjectMemberMutationData {
  addProjectMember: ApiProjectMember;
}

export interface AddProjectMemberMutationVariables {
  projectId: string;
  userId: string;
  role: ProjectMemberRole;
}

export interface AddProjectMemberByNameMutationVariables {
  projectId: string;
  name: string;
  role: ProjectMemberRole;
}

export interface UpdateProjectMemberRoleMutationData {
  updateProjectMemberRole: ApiProjectMember;
}

export interface UpdateProjectMemberRoleMutationVariables {
  projectId: string;
  userId: string;
  role: ProjectMemberRole;
}

export interface RemoveProjectMemberMutationData {
  removeProjectMember: boolean;
}

export interface RemoveProjectMemberMutationVariables {
  projectId: string;
  userId: string;
}
