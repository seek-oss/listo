export CREATE_DYNAMO_TABLES=true
export DYNAMO_DB_ENDPOINT=http://localhost:9000

install:
	yarn install

prettier:
	yarn run format

serve: prettier install ../frontend/data-schema.json
	source ../env.sh ; yarn run start

../frontend/data-schema.json:
	pushd ../frontend && make data-schema.json ; popd

validate_data: ../frontend/data-schema.json
	yarn run validate:data ../frontend/data-schema.json ../data

start_db:
	docker run -d -p 9000:8000 --name="listo-db" amazon/dynamodb-local

stop_db:
	docker stop "listo-db"; docker rm listo-db

delete_board:
	yarn run test -- -d $(boardId)

create_board:
	yarn run test -- -c

list_boards:
	yarn run test -- -l

get_project:
	yarn run test -- -p $(projectId)

slack_message:
	yarn run test -- -s

.PHONY: deploy serve install prettier test
