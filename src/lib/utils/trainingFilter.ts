type Training = {
    id: string;
    categoryId: string;
    categoryName: string;
    skillId: string;
    skillName: string;
    fromDate: string;
    tentativeEndDate: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    createdById: string;
    statusId: string;
    employeeId: string;
    employeeName: string;
    trainingStatus: {
      name: string;
    };
  };
  
  type FilteredTrainings = {
    currentInProgress: Training | null;
    otherTrainings: Training[];
  };
  
  export const filterTrainings = (trainingEmployees: Training[]): FilteredTrainings => {
    const inProgressTraining = trainingEmployees.find(
      (training) => training.trainingStatus.name === "In Progress"
    ) || null;
  
    const otherTrainings = trainingEmployees.filter(
      (training) => training.trainingStatus.name !== "In Progress"
    );
  
    return {
      currentInProgress: inProgressTraining,
      otherTrainings,
    };
  };
  