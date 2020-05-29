import { RouteComponentProps } from '@reach/router';
import React, { useContext } from 'react';
import { Typography } from '@material-ui/core';
import ReactMarkdown from 'react-markdown';
import { getModuleDescription, getModule } from './utils/moduleHelpers';
import { AppContext } from './context';
import Checklists from './components/Checklists';

interface ProjectProps extends RouteComponentProps {
  moduleName?: string;
  categoryName?: string;
}

export const QuickChecklist = (props: ProjectProps) => {
  const { categories } = useContext(AppContext);

  const categoryName = props.categoryName || "";
  const moduleName = props.moduleName || "";

  const module = getModule(categories, categoryName, moduleName);

  if (!module) {
    return (
      <React.Fragment>
        <Typography variant="h4" gutterBottom>
          Listo Module Not Found
        </Typography>

        <Typography variant="subtitle1" gutterBottom>
          We can't seem to find your module with category and title of: {`${categoryName} -> ${moduleName}`}.
        </Typography>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Typography variant="h4" gutterBottom>
          Module - {module.title}
        </Typography>
        
        <Typography variant="subtitle1" gutterBottom>
          <ReactMarkdown source={getModuleDescription(module)} />
        </Typography>
        
      <Checklists module={module} readOnlyMode={false} />
      </React.Fragment>
    );
  }
};
