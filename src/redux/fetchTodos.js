export const fetchTodos = createAsyncThunk("fetchTodos", async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos`);
    return res?.json();
 });