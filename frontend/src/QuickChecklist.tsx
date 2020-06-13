import { RouteComponentProps } from '@reach/router';
import React, { useContext, useEffect, useState } from 'react';
import { Typography, CircularProgress, Button } from '@material-ui/core';
import ReactMarkdown from 'react-markdown';
import { getModuleDescription, getModule } from './utils/moduleHelpers';
import { AppContext } from './context';
import { API_URL } from './constants';
import { QuickChecklistModel } from './types';
import ChecklistsContainer from './components/Checklists';
import { useStyles } from './styles';

interface QuickChecklistProps extends RouteComponentProps {
  moduleName?: string;
  categoryName?: string;
  id?: string;
}

export const QuickChecklist = (props: QuickChecklistProps) => {
  const { categories, quickChecklist, initQuickChecklist } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const classes = useStyles();
  const categoryName = props.categoryName ?? "";
  const moduleName = props.moduleName ?? "";
  let id = props.id;
  const module = (categoryName && moduleName) ?  getModule(categories, categoryName, moduleName) : undefined;

  const prepareQuickChecklist = () => {
    const quickChecklistData: QuickChecklistModel = { checkList: quickChecklist };
    if(id) quickChecklistData.id = id;
    return quickChecklistData;
  }
  
  const save = async () => {
    try {
      const res = await fetch(`${API_URL}/quick-checklist`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prepareQuickChecklist()),
      });
      if (res.status !== 200) throw new Error(`Quick Checklist with id ${id} can't be saved`);
      const data = await res.json();
      window.location.href = `/checklist/${categoryName}/${moduleName}/${data.id}`;
    } catch (err) {
        console.log(`Error saving the QuickChecklist: ${err}`);
    }

  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if(!id) return;
        const res = await fetch(`${API_URL}/quick-checklist/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (res.status !== 200) throw new Error(`Quick Checklist with id ${id} not found`);
        const data = await res.json();
        const quickChecklistRes: QuickChecklistModel = data.quickChecklist;
        initQuickChecklist(quickChecklistRes.checkList);

      } catch (err) {
        setErrorState(true);
        console.log(`Error fetching the QuickChecklist: ${err}`);
      }
    };
    fetchData();
  }, [id]);

  if (!module || errorState) {
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

    if(Object.keys(quickChecklist).length === 0){
       initQuickChecklist(module.checkLists);
    }

    return (
      <React.Fragment>
        <Typography variant="h4" gutterBottom>
          Module - {module.title}
        </Typography>
        
        <Typography variant="subtitle1" gutterBottom>
          <ReactMarkdown source={getModuleDescription(module)} />
        </Typography>
        
        <ChecklistsContainer checklists={quickChecklist} readOnlyMode={false} />
        <div className={classes.buttons}>
          {loading ? (
            <CircularProgress size={20} color="secondary" />
          ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={save}
                className={classes.button}
              >
              Save
              </Button>
            )}
        </div>     </React.Fragment>
    );
  }
};
