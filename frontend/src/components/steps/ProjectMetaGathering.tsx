import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { AppContext } from '../../context';

const ProjectMetaGathering = () => {
  const { projectMeta, handleUpdateProjectMeta } = useContext(AppContext);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    handleUpdateProjectMeta(name, value);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Details about your project or feature
      </Typography>
      <Grid container spacing={5}>
        {projectMeta &&
          projectMeta.map(
            ({ label, name, placeholder, userResponse = '', required }) => (
              <Grid item xs={12} key={name}>
                <TextField
                  id={name}
                  required={Boolean(required)}
                  name={name}
                  label={label}
                  value={userResponse}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  placeholder={placeholder}
                  onChange={onChangeHandler}
                />
              </Grid>
            ),
          )}
      </Grid>
    </React.Fragment>
  );
};

export default ProjectMetaGathering;
