#!/usr/bin/env sh
docker run \
	-e POSTGRES_USER=postgres \
	-e POSTGRES_PASSWORD=1234 \
	-e POSTGRES_DB=weather \
	--network host \
	--name some-postgres \
	postgres
