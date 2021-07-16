import { DirectoryData, AssessmentResult } from '../../frontend/src/types';
import { URL } from 'url';
import * as JiraApi from 'jira-client';
 

const JIRA_HOST = process.env.JIRA_HOST;
const JIRA_USER = process.env.JIRA_USER;
const JIRA_PASSWORD = process.env.JIRA_PASSWORD;
const JIRA_PROJECT = process.env.JIRA_PROJECT;

// Initialize
const jira = new JiraApi({
    protocol: 'https',
    host: JIRA_HOST,
    username: JIRA_USER,
    password: JIRA_PASSWORD,
    apiVersion: '2',
    strictSSL: true
  });



export async function createJIRATasks(inputdata, listodata, listoProjectId){
const boardname = JIRA_PROJECT;
const metas = await jira.getIssueCreateMetadata({'projectKeys':[boardname]});
const proj = await jira.getProject(boardname);
const workitemmeta = metas.projects[0].issuetypes.filter(x=>x.name == 'Work Item')[0];
const subtaskmeta = metas.projects[0].issuetypes.filter(x=>x.name == 'Backlog Task')[0];
const maintask = await createMainTask(workitemmeta, proj, listoProjectId);
const subtasks = await createCategorieSubTasks(maintask, boardname, inputdata, listodata, subtaskmeta, proj);
// for(const cs in subtasks){
//   await createModuleSubTaskForCategoryTask(subtasks[cs]);
// }
    return {'shortUrl': 'https://'+JIRA_HOST+'/browse/'+maintask.key};
};


async function createMainTask(workitemmeta, project, listoProjectId){
try{
    const result = await jira.addNewIssue({
    "fields": {
        "issuetype":{ "id": workitemmeta.id},
        "summary": `Listo Task Project ${listoProjectId}`,
        "project": { "id": project.id.toString()}
    },
    });
    console.log('JIRA created successfully, ID: ' + result.key)
    return result;
} catch (e){
    console.log(e.message);
    throw new Error('Calling JIRA API failed: '+e.message)
}
}

async function createCategorieSubTasks(parentTask, boardName, inputdata, listodata, workitemmeta, proj){
const moduleSubTasksProms = [];

for(const category in inputdata.selectedModulesByCategory){
    moduleSubTasksProms.push(createSubTaskForCategory(parentTask, boardName, category, inputdata, listodata, workitemmeta, proj))
}
return Promise.all(moduleSubTasksProms);
}

function createSubTaskForCategory(parentTask, boardName, category, inputData, listoData, workitemmeta, project){
let subtaskDescription = `
h1. Listo Assessment, Category: ${category}\n`;
const selectedCategory = listoData.data.modules[category];
for (let moduleKey of inputData.selectedModulesByCategory[category]) {

    let trelloDescription = [selectedCategory[moduleKey].assessmentQuestion];
    let resources = selectedCategory[moduleKey].resources;
    let moduleDescription = selectedCategory[moduleKey].guidance;

    subtaskDescription = subtaskDescription + `h1. Module: ${moduleKey}

    h4. Description:
    {noformat}${moduleDescription}{noformat}

    h4. Resources:
    {noformat}${resources}{noformat}

    h4. Trello description:
    {noformat}${trelloDescription}{noformat}

    \n\n
    `
}
    return jira.addNewIssue({
    "fields": {
        "issuetype":{ "id": workitemmeta.id},
        "summary": "Listo category task: "+category,
        "project": { "id": project.id.toString() },
        "parent": {
        "key": parentTask.key
        },
        "description":subtaskDescription
    },
    });
}

// function createModuleSubTaskForCategoryTask(parentTaskId,boardName,category, listoData){
//     const selectedCategory = listoData.data.modules[category];
//     let trelloDescription = [selectedCategory[moduleKey].assessmentQuestion];
//     let resources = selectedCategory[moduleKey].resources;
//     let moduleDescription = selectedCategory[moduleKey].guidance;

//     moduleDescription
//     ? trelloDescription.push('', '### Guidance:', '', moduleDescription)
//     : null;

// if (resources) {
//     resources = resources.map(resource => `+ ${resource}`);
//     trelloDescription.push('', '### Resources:', '');
//     trelloDescription = trelloDescription.concat(resources);
// }
// const checklists = [];
// for (let checklist of Object.keys(selectedCategory[moduleKey].checkLists)){
//     console.log(checklist)
// }

// }