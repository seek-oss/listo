#### Template ENV file
## Place in root directory and rename as env.sh

## Trello

# Get your API Key here -> https://trello.com/app-key/
export TRELLO_API_KEY=e94947...00a92

# Click on the "Generate a Token" link here -> https://trello.com/app-key/
export TRELLO_TOKEN=fda876d8af87d6fa876adfa....8516dcf715

## LEAVE - AWS - Fake creds for local DynamoDB development
export AWS_ACCESS_KEY_ID=leavelikethis
export AWS_SECRET_ACCESS_KEY=leavelikethis

# OPTIONAL - An invite link to a test board -> 'https://trello.com/invite/b/....'
export TRELLO_BOARD_LINK=

# OPTIONAL - Trello `idOrganization`
export TRELLO_TEAM=

## OPTIONAL - The Slack channel you would like to send notifications
export SLACK_TARGET_CHANNEL='#listo'

# OPTIONAL - Slack Channel Deep link - https://api.slack.com/reference/deep-linking
export SLACK_CHANNEL_LINK='https://slack.com/app_redirect?channel=listo&team=T02P5698'