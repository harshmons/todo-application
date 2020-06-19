export const getTaskList = () => {
  return fetch('http://localhost:4000/getTaskList')
    .then(res => res.json())
    .then(res => res.taskList);
};

export const updateTaskList = payload => {
  return fetch('http://localhost:4000/updateTaskList', {
    method: 'POST',
    body: JSON.stringify({ taskList: payload }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json());
};
