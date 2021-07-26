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

const capitalize = (s) => {
if (typeof s !== 'string') return ''
return s.charAt(0).toUpperCase() + s.slice(1)
}

export async function createJIRATasks(inputdata, listodata, listoProjectId){


const projectname = inputdata.projectMetaResponses.boardName;
const projectdetails = inputdata.projectMetaResponses;
const selectedMaturity = inputdata.selectedMaturity[0].selection;
const selectedRisks = inputdata.selectedRisks.filter(x => x.selection != 'No')[0].selection;

const boardname = JIRA_PROJECT;
const metas = await jira.getIssueCreateMetadata({'projectKeys':[boardname]});
const jiraproj = await jira.getProject(boardname);
const workitemmeta = metas.projects[0].issuetypes.filter(x=>x.name == 'Work Item')[0];
const subtaskmeta = metas.projects[0].issuetypes.filter(x=>x.name == 'Backlog Task')[0];
const maintask = await createMainTask(workitemmeta, jiraproj, listoProjectId, boardname, listodata, projectname, projectdetails, selectedRisks,selectedMaturity);
const subtasks = await createCategorieSubTasks(maintask, boardname, inputdata, listodata, subtaskmeta, jiraproj);

    return {'shortUrl': 'https://'+JIRA_HOST+'/browse/'+maintask.key};
};


async function createMainTask(workitemmeta, jiraproj, listoProjectId, boardname, listodata, projectname, projectdetails, selectedRisks, selectedMaturity){
try{
    const result = await jira.addNewIssue({
    "fields": {
        "issuetype":{ "id": workitemmeta.id},
        "summary": `[${projectdetails.riskLevel}] Listo: ${projectname}`,
        "project": { "id": jiraproj.id.toString()},
        "assignee":{"name":JIRA_USER},
        "labels": ["listo_"+ projectdetails.riskLevel.split(' ')[0].toLowerCase()],
        "description": 
        `h3. *Feature name:* ${projectname}
        h3. *Project maturity:* ${selectedMaturity}
        h3. *Project risks:* ${selectedRisks}
        h3. *Team Slack channel:* #${projectdetails.slackTeam}
        h3. *Contact Slack username:* @${projectdetails.slackUserName}
        h3. *Documentation link:* [${projectdetails.codeLocation}|${projectdetails.codeLocation}]
        h3. *Jira username:* [~${projectdetails.trelloEmail}]
        `
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
let subtaskDescription = ``;
const selectedCategory = listoData.data.modules[category];
for (let moduleKey of inputData.selectedModulesByCategory[category]) {

    let trelloDescription = [selectedCategory[moduleKey].assessmentQuestion];
    let resources = selectedCategory[moduleKey].resources;
    let moduleDescription = selectedCategory[moduleKey].guidance;

    let checkliststring = "";

    for(let checkCategory in selectedCategory[moduleKey].checkLists){
        let result = selectedCategory[moduleKey].checkLists[checkCategory].map(
            checklist => ({
              name: checklist.question,
              completed: checklist.tools
                ? checklist.tools.some(checklistTool =>
                    inputData.selectedTools.includes(checklistTool),
                  )
                : false,
            }),
          );
        for(let check of result){
            if(check.completed == true){
                checkliststring = checkliststring + "- (/) " + check.name.toString() + "\n";
            } else{
                checkliststring = checkliststring + "- (!) " + check.name.toString() + "\n";
            }
        }
    }
    subtaskDescription = subtaskDescription + `h3. *Category-Module:* ${capitalize(category)}-${capitalize(moduleKey)}

    h6. Description:
    {noformat}${trelloDescription}{noformat}

    ${checkliststring}

    h6. Resources:
    {noformat}${resources}{noformat}

    ` + "\r\n\r\n";
}
    return jira.addNewIssue({
        "fields": {
            "issuetype":{ "id": workitemmeta.id},
            "summary": "Listo: " + inputData.projectMetaResponses.boardName + " [Category: "+category+"]",
            "project": { "id": project.id.toString() },
            "parent": { "key": parentTask.key },
            "assignee":{"name":JIRA_USER},
            "description": subtaskDescription
        },
    });
}