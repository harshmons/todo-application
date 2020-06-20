export const getTaskLists = () => {
  return fetch('http://localhost:4000/getTaskLists')
    .then(res => res.json())
    .then(res => res.taskLists);
};

export const updateTaskLists = payload => {
  return fetch('http://localhost:4000/updateTaskLists', {
    method: 'POST',
    body: JSON.stringify({ taskLists: payload }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json());
};
