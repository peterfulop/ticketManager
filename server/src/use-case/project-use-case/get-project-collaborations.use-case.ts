import { ApolloContext } from '../../apollo';
import { DBErrorMessages } from '../../enum/db-error-messages.enum';
import { userError } from '../../helpers/user-error';
import { ProjectsPayload } from '../../types/graphql-generated/graphql';

export type GetProjectCollaborationsInput = {
  context: ApolloContext;
};

export const getProjectCollaborationsUseCase = async (
  input: GetProjectCollaborationsInput
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

  const collaborations = await prisma.collaboration.findMany({
    where: {
      userId: user.userId,
    },
  });

  const notOwnProjects = collaborations.filter(
    (coll) => coll.inviterId !== user.userId
  );

  const projects = await prisma.project.findMany({
    where: {
      shared: true,
      id: {
        in: notOwnProjects.map((coll) => coll.projectId),
      },
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
