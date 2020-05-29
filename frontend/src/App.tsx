import React, { useState, useEffect } from 'react';
import cloneDeep from 'lodash.clonedeep';
import './App.css';
import Header from './components/Header';
import { Paper } from '@material-ui/core';
import { useStyles } from './styles';
import { AppContext } from './context';
import {
  Risk,
  ModuleCategories,
  ProjectMeta,
  DirectoryData,
  Result,
  Tools,
  Meta,
} from './types';
import { Router } from '@reach/router';
import { Home } from './Home';
import { Faq } from './Faq';
import { Assessment } from './Assessment';
import { Project } from './Project';
import { StepProvider } from './context/StepContext';
import pickCategoriesWithResponse from './utils/pickCategoriesWithResponse';
import getSelectedRisks from './utils/getSelectedRisks';

import { handleRiskAnswer } from './utils/handleRiskAnswer';
import { prepareProjectMeta } from './utils/prepareProjectMeta';
import { getSelectedTools } from './utils/moduleHelpers';
import { API_URL } from './constants';
import { QuickChecklist } from './QuickChecklist';

const App: React.FC = ({ children }) => {
  const classes = useStyles();

  const [projectMeta, setProjectMeta] = useState<ProjectMeta[]>([]);
  const [categories, setCategories] = useState<ModuleCategories>({});
  const [risks, setRisks] = useState<Risk[]>([]);
  const [tools, setTools] = useState<Tools>({});
  const [meta, setMeta] = useState<Meta>({});

  const handleSelectTool = (tool: string, category: string, value: boolean) => {
    const clonedTools = cloneDeep(tools);
    clonedTools[category][tool].response = value;
    setTools(clonedTools);
  };

  const handleSelectModule = (
    categoryKey: string,
    moduleKey: string,
    value: boolean,
  ) => {
    const clonedCategories = cloneDeep(categories);
    clonedCategories[categoryKey][moduleKey].response = value;
    setCategories(clonedCategories);
  };

  const handleUpdateProjectMeta = (name: string, response: string) => {
    const clonedProjectMeta = cloneDeep(projectMeta);
    const meta = clonedProjectMeta.find(m => m.name === name);
    if (meta) {
      meta.userResponse = response;
      setProjectMeta(clonedProjectMeta);
    }
  };

  const prepareResult = (): Result => {
    return {
      selectedRisks: getSelectedRisks(risks),
      selectedModulesByCategory: pickCategoriesWithResponse(categories),
      projectMetaResponses: prepareProjectMeta(projectMeta, risks),
      selectedTools: getSelectedTools(tools),
    };
  };

  const contextValue = {
    projectMeta,
    handleUpdateProjectMeta,
    categories,
    risks,
    tools,
    handleSelectModule,
    handleRiskAnswer: handleRiskAnswer(risks, setRisks),
    prepareResult,
    handleSelectTool,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataRes = await fetch(`${API_URL}/data.json`);
        const { data }: DirectoryData = await dataRes.json();
        setProjectMeta(data.projectMeta);
        setCategories(data.modules);
        setRisks(data.risks.questions);
        setTools(data.tooling);

        const metaRes = await fetch(`${API_URL}/meta`);
        const meta: Meta = await metaRes.json();
        setMeta(meta);
      } catch (err) {
        console.log(`Error fetching data dictionary or meta data: ${err}`);
      }
    };

    fetchData();
  }, []);

  return (
    <AppContext.Provider value={contextValue}>
      <StepProvider>
        <div className="App">
          <Header />
          <main className={classes.layout}>
            <Paper className={classes.paper}>
              <Router>
                <Home path="/" listoMeta={meta} />
                <Faq path="/faq" listoMeta={meta} />
                <Assessment path="/assessment" />
                <Project path="project/:projectId" listoMeta={meta} />
                <QuickChecklist path="checklist/:categoryName/:moduleName"/>
              </Router>
            </Paper>
          </main>
        </div>
      </StepProvider>
    </AppContext.Provider>
  );
};

export default App;
