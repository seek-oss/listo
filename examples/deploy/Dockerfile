# We build listo manually as we want to add some data into the container
# We don't want to have a trip to dockerhub if this image doesn't exist locally (e.g. docker build --pull=false but that's not the default)
FROM listo:pleasedontgotodockerhub
ADD data /etc/listo/data
ENV DATA_DIR=/etc/listo/data
