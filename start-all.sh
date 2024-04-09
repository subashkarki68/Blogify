#!/bin/bash

#echo "Starting mongod"
#systemctl start mongod.service &
# Start a new tmux session
tmux kill-server &
tmux new-session -d -s my_session

# Split the terminal horizontally into three panes
tmux split-window -h
tmux split-window -h

# Send commands to each pane
tmux send-keys -t my_session:0.1 'echo "Starting backend server..."; cd backend-sir; pnpm run dev' C-m
tmux send-keys -t my_session:0.2 'echo "Starting frontend server..."; cd frontend; pnpm run dev' C-m

# Attach to the tmux session
tmux attach-session -t my_session
