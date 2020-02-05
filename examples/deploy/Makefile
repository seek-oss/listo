DOCKER_REPO_URL = 6666666666.dkr.ecr.ap-southeast-2.amazonaws.com/listo

deploy: 
	docker build github.com/seek-oss/listo -t listo:pleasedontgotodockerhub
	# avoid --pull=false is to ensure we don't pull listo from dockerhub (which it's not on)
	docker build --pull=false -t "$(DOCKER_REPO_URL):${BUILDKITE_BUILD_NUMBER}" .
	docker push "$(DOCKER_REPO_URL):${BUILDKITE_BUILD_NUMBER}"
	[REPLACE WITH CONTAINER DEPLOY TOOL]

.PHONY: deploy
