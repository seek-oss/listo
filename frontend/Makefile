install:
	(cd ../ && yarn install)

prettier:
	yarn run format

build: install
	REACT_APP_API_URL=/_lambda NODE_ENV=production yarn run build

serve: install
	source ../env.sh ; yarn run start

data-schema.json: install
	yarn run build:schema

.PHONY: install build deploy serve prettier
