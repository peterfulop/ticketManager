// import { Project } from '@prisma/client';
// import DataLoader from 'dataloader';
// import { prisma } from '../../apollo';

// type BatchProject = (ids: string[]) => Promise<Project[]>;

// const batchProjects: BatchProject = async (ids) => {
//   const projects = await prisma.project.findMany({
//     where: {
//       id: {
//         in: ids,
//       },
//     },
//   });
//   const userMap: {
//     [key: string]: Project;
//   } = {};
//   projects.forEach((project) => {
//     userMap[project.id] = project;
//   });
//   return ids.map((id) => userMap[id]);
// };

// // @ts-ignore
// export const projectLoader = new DataLoader<string, Project>(batchProjects);
