import { ApolloContext } from '../../apollo';
import { DBErrorMessages } from '../../enum/db-error-messages.enum';
import { userError } from '../../helpers/user-error';
import { ProjectsPayload } from '../../types/graphql-generated/graphql';

export type GetMyProjectsInput = {
  context: ApolloContext;
};

export const getMyProjectsUseCase = async (
  input: GetMyProjectsInput
): Promise<ProjectsPayload> => {
  const { prisma, user } = input.context;

  if (!user) {
    return {
      projects: [],
      userErrors: [
        { ...userError, message: DBErrorMessages.AUTHORIZATION_FAILED },
      ],
    };
  }

  const projects = await prisma.project.findMany({
    where: {
      userId: user.userId,
    },
  });

  const projectsWithDate = projects.map((project) => {
    return {
      ...project,
      createdAt: project.createdAt.toISOString(),
      updatedAt: project.updatedAt.toISOString(),
    };
  });

  return {
    userErrors: [],
    projects: projectsWithDate,
  } as unknown as ProjectsPayload;
};
