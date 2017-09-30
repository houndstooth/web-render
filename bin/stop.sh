#!/bin/bash

DEV_SERVER_PORT=8080
KARMA_SERVER_PORT=9876
WATCHER_PORT=6789

sh ./bin/stop/kill_process_on_port.sh $DEV_SERVER_PORT
sh ./bin/stop/kill_process_on_port.sh $KARMA_SERVER_PORT
sh ./bin/stop/kill_process_on_port.sh $WATCHER_PORT

printf "Servers down.\n\n"
