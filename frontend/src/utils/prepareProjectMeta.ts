import { getRiskLevel } from './index';
import { ProjectMeta, Risk, ProjectMetaResponses } from './../types/index';

export const prepareProjectMeta = (
  projectMeta: ProjectMeta[],
  risks: Risk[],
) => {
  const preparedProjectMeta = projectMeta.reduce((map, metaItem) => {
    return { ...map, [metaItem.name]: metaItem.userResponse };
  }, {} as ProjectMetaResponses);

  // Adding risk level here... feels a bit strange to force it in to the project meta though
  preparedProjectMeta.riskLevel = getRiskLevel(risks);
  return preparedProjectMeta;
};
