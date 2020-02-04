import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import { makeStyles, withStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
  logo: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
  menuItem: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  asessment: {
    padding: theme.spacing(3, 2),
    textAlign: 'center',
  },
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(800 + theme.spacing(4))]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(6))]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: `${theme.spacing(3)}px 0 ${theme.spacing(5)}px`,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  stepLabels: {
    cursor: 'pointer',
  },
  checklistSummary: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },
  checklistQuestion: {
    alignSelf: 'start',
    paddingTop: '14px',
  },
  questionIcon: {
    paddingRight: '10px',
  },
  toolsWrapper: {
    display: 'flex',
  },
  toolChip: {
    margin: '5px',
  },
  column: {
    width: '100%',
  },
  answeredQuestionsChip: {
    backgroundColor: '#d1f9d0',
    border: 'none',
    color: '#657764',
  },
}));

export const ExpansionPanelSummary = withStyles({
  root: {
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
      boxShadow: '1px 3px 3px rgba(0, 0, 0, 0.2)',
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
      boxShadow: 'none',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

export const ExpansionPanel = withStyles({
  root: {
    border: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

export const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: '#f5f9fe',
  },
}))(MuiExpansionPanelDetails);
