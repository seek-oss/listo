export const API_URL =
  process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
let temp_var_trello_jira_mode = process.env.REACT_APP_TRELLO_JIRA_MODE || 'Trello';
export const TRELLO_JIRA_MODE = temp_var_trello_jira_mode.charAt(0).toUpperCase() + temp_var_trello_jira_mode.slice(1);