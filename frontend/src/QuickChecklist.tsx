import { RouteComponentProps } from '@reach/router';
import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Typography,
  List,
  ListItemText,
  ListItem,
} from '@material-ui/core';
import {
  Result,
  PickedCategories,
  ProjectMetaResponses,
  Meta,
  DatabaseModel,
  ModuleCategories
} from './types/index';

interface ProjectProps extends RouteComponentProps {
  moduleName?: string;
  categories: ModuleCategories;
}

export const QuickChecklist = (props: ProjectProps) => {
  const [errorState, setErrorState] = useState(false);
  let moduleName = props.moduleName;


  if (errorState) {
    return (
      <React.Fragment>
        <Typography variant="h4" gutterBottom>
          Listo Module Not Found
        </Typography>

        <Typography variant="subtitle1" gutterBottom>
          We can't seem to find your module with ID: {moduleName}.
        </Typography>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Typography variant="h4" gutterBottom>
          Module Details - {moduleName}
        </Typography>

        {/* {Object.entries(props.categories).map(
          ([category, moduleNames]) => (
            <Box>
              <Typography variant="subtitle1">{category}</Typography>

              <List dense={true}>
                {moduleNames.map(moduleName => (
                  <ListItem key={moduleName}>
                    <ListItemText primary={moduleName} />
                  </ListItem>
                ))}
              </List>
            </Box>
          ),
        )} */}
      </React.Fragment>
    );
  }
};
