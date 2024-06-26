#!/bin/bash

# Define the command
CMD="docker run \
  --interactive --tty --rm \
  --env CODECLIMATE_CODE=\"$PWD\" \
  --volume \"$PWD\":/code \
  --volume /var/run/docker.sock:/var/run/docker.sock \
  --volume /tmp/cc:/tmp/cc \
  codeclimate/codeclimate analyze"

## Run the command
#eval "$CMD"

echo "Running Code Climate"
echo "$CMD"
eval "$CMD"

