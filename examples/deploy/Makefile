DOCKER_REPO_URL = <your AWS account ID>.dkr.ecr.ap-southeast-2.amazonaws.com/listo

deploy:
	docker build github.com/seek-oss/listo -t seek/listo:latest
	docker build --pull=false -t "$(DOCKER_REPO_URL):${BUILD_NUMBER}" .
	docker push "$(DOCKER_REPO_URL):${BUILD_NUMBER}"
	aws cloudformation deploy \
		--template-file stack.yaml \
		--stack-name listo \
		--no-fail-on-empty-changeset \
		--parameter-overrides \
			'ImageUrl=$(DOCKER_REPO_URL):${BUILD_NUMBER}' \
			'VpcID=<Your vpc id>' \
			'PublicSubnetIds=<Your subnet ids>' \
			'PrivateSubnetIds=<Your subnet ids>' \
			'TrelloTeam=<Id of your trello team>' \
			'CertificateArn=<ARN of your ACM Certificate for TLS>' \
			'OidcAuthorizationEndpoint=<Your oidc authz endpoint>' \
			'OidcClientId=<Your oidc client id>' \
			'OidcClientSecret=<Your oidc client secret>' \
			'OidcIssuer=<Your oidc issuer url>' \
			'OidcTokenEndpoint=<Your oidc token url>' \
			'OidcUserInfoEndpoint=<Your oidc user info url>' \
			'AlbHostedZoneId=<Route53 zone ID for the DNS record>' \
			'AlbDnsName=<DNS name to assign the load balancer, e.g. listo.example.com>'

deploy_heroku:
	heroku container:login 
	heroku container:push --recursive --app [YOUR_APP_NAME] web
	heroku container:release --app [YOUR_APP_NAME] web


.PHONY: deploy
