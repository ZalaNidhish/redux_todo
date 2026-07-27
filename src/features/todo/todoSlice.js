import { createSlice, nanoid } from "@reduxjs/toolkit";
const localtodos = JSON.parse(localStorage.getItem("todos"))

const initialState = {
    todos: localtodos || [{
        id: nanoid(),
        title: "Demo Task",
        isCompleted: false  
    }]
}

export const todoSlice = createSlice({
    name: "Todo",
    initialState,
    reducers: {
        addTodo: (state, action)=>{
            const todo = {
                id: nanoid(),
                title: action.payload.title,
                isCompleted: action.payload.isCompleted
            }
            state.todos.push(todo)

            localStorage.setItem("todos", JSON.stringify(state.todos))

        },

        removeTodo: (state, action)=>{            
            state.todos = state.todos.filter((todo)=>todo.id!==action.payload)
            localStorage.setItem("todos", JSON.stringify(state.todos))
        },

        updateTodo: (state, action)=>{
        
            let todo = state.todos.find((todo)=>{return todo.id == action.payload.id})
            todo.title = action.payload.title
            todo.isCompleted = action.payload.isCompleted

            localStorage.setItem("todos", JSON.stringify(state.todos))

        }
    }
})

export const {addTodo, removeTodo, updateTodo} = todoSlice.actions

export default todoSlice.reducer