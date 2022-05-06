export const initialState = [];

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case "ADD":
      return [
        ...state,
        {
          id: Math.random(),
          title: payload.title,
          content: payload.content,
          completed: payload.completed,
          date: new Date(),
        },
      ];
    case "DELETE":
      return state.filter((note) => payload !== note.id);
    case "UPDATE":
      return state.map((record) => {
        if (payload.id == record.id) return payload;
        else return record;
      });
    case "INITIALUPDATE":
      if (state.length == 0) {
        return [...state, ...payload.data];
      } else return [...state];

    default:
      return state;
  }
};
