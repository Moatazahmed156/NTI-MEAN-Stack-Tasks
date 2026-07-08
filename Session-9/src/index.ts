// ==========================================
// Task 1: Enums & Type Aliases
// ==========================================

enum JobStatus {
  Open = "Open",
  InProgress = "InProgress",
  Review = "Review",
  Completed = "Completed",
}

type Skill = "TypeScript" | "NodeJS" | "React" | "UI/UX";

// ==========================================
// Task 2: Interfaces
// ==========================================

interface IUser {
  id: number;
  name: string;
  email: string;
}

interface IFreelancer extends IUser {
  skills: Skill[];
  hourlyRate: number;
}

interface IClient extends IUser {
  budget: number;
}

interface IProject {
  id: number;
  title: string;
  description: string;
  budget: number;
  status: JobStatus;
  clientId: number;
  assignedFreelancerId?: number;
}

// ==========================================
// Task 3: Proposal Class
// ==========================================

class Proposal {
  constructor(
    public readonly freelancerId: number,
    public readonly projectId: number,
    public readonly bidAmount: number,
    public readonly coverLetter: string
  ) {}
}

// ==========================================
// Platform Manager
// ==========================================

class PlatformManager {
  // Encapsulation
  private freelancers: IFreelancer[] = [];
  private clients: IClient[] = [];
  private projects: IProject[] = [];
  private proposals: Proposal[] = [];

  // Static Property
  static totalPlatformRevenue: number = 0;

  // ==========================
  // Add Freelancer
  // ==========================

  addFreelancer(freelancer: IFreelancer): void {
    this.freelancers.push(freelancer);
  }

  // ==========================
  // Add Client
  // ==========================

  addClient(client: IClient): void {
    if (client.budget < 0) {
      throw new Error("Client budget cannot be negative.");
    }

    this.clients.push(client);
  }

  // ==========================
  // Add Project
  // ==========================

  addProject(project: IProject): void {
    const clientExists = this.clients.some(
      (client) => client.id === project.clientId
    );

    if (!clientExists) {
      throw new Error("Client not found.");
    }

    this.projects.push(project);
  }

  // ==========================
  // Submit Proposal
  // ==========================

  submitProposal(proposal: Proposal): void {
    const freelancerExists = this.freelancers.some(
      (f) => f.id === proposal.freelancerId
    );

    const projectExists = this.projects.some(
      (p) => p.id === proposal.projectId
    );

    if (!freelancerExists) {
      throw new Error("Freelancer not found.");
    }

    if (!projectExists) {
      throw new Error("Project not found.");
    }

    this.proposals.push(proposal);
  }

  // ==========================
  // Assign Project
  // ==========================

  assignProject(projectId: number, freelancerId: number): void {
    const project = this.projects.find((p) => p.id === projectId);

    if (!project) {
      throw new Error("Project not found.");
    }

    const freelancer = this.freelancers.find(
      (f) => f.id === freelancerId
    );

    if (!freelancer) {
      throw new Error("Freelancer not found.");
    }

    project.assignedFreelancerId = freelancerId;
    project.status = JobStatus.InProgress;
  }

  // ==========================
  // Complete Project
  // ==========================

  completeProject(projectId: number): void {
    const project = this.projects.find((p) => p.id === projectId);

    if (!project) {
      throw new Error("Project not found.");
    }

    project.status = JobStatus.Completed;

    const commission = project.budget * 0.1;

    PlatformManager.totalPlatformRevenue += commission;
  }

  // Helper methods

  getProjects() {
    return this.projects;
  }

  getProposals() {
    return this.proposals;
  }
}

// ==========================================
// Task 4: Generic Filter Engine
// ==========================================

class FilterEngine<T> {
  filterByProperty(
    items: T[],
    property: keyof T,
    value: any
  ): T[] {
    return items.filter((item) => item[property] === value);
  }
}

// ==========================================
// Demo
// ==========================================

const manager = new PlatformManager();

// Clients
manager.addClient({
  id: 1,
  name: "Ahmed",
  email: "ahmed@test.com",
  budget: 5000,
});

// Freelancers
manager.addFreelancer({
  id: 1,
  name: "Moataz",
  email: "moataz@test.com",
  skills: ["React", "TypeScript"],
  hourlyRate: 30,
});

// Project
manager.addProject({
  id: 1,
  title: "Portfolio Website",
  description: "Build React Portfolio",
  budget: 2000,
  status: JobStatus.Open,
  clientId: 1,
});

// Proposal
const proposal = new Proposal(
  1,
  1,
  1800,
  "I have 3 years of React experience."
);

manager.submitProposal(proposal);

// Assign Project
manager.assignProject(1, 1);

// Complete Project
manager.completeProject(1);

console.log(manager.getProjects());

console.log(
  "Platform Revenue:",
  PlatformManager.totalPlatformRevenue
);

// ==========================================
// Generic Filter Example
// ==========================================

const filter = new FilterEngine<IProject>();

const completedProjects = filter.filterByProperty(
  manager.getProjects(),
  "status",
  JobStatus.Completed
);

console.log(completedProjects);