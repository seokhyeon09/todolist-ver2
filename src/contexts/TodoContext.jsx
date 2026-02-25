import { useRef, createContext, useContext, useEffect, useReducer } from "react";
import { ACTIONS } from "./actions";
import { mockData } from "./mockData";
import { todoReducer } from "./reducer";
import { loadTodos, saveTodos } from "./storage";
import { createTodoActions } from "./useTodoActions";

const TodoContext = createContext(null)

export function TodoProvider({ children }) {
    const [todos, dispatch] = useReducer(todoReducer, [])
    const idRef = useRef(3)
    useEffect(() => {
        //기존에있던값을 담음
        const saved = loadTodos()
        // 값이있으면 saved를 쓰고없으면 mockData를사용
        const initial = saved ?? mockData

        dispatch({ type: ACTIONS.INIT, todos: initial })

        // id값을 겹치게하지않기위해 기존의 배열에서 가장큰 id값을 찾고, 그아이디 값에 +1을 통해 최대값을 늘림
        // -1은 배열이 비었는 경우를 대비
        const maxId = initial.reduce((max, t) => Math.max(max, t.id), -1)
        idRef.current = maxId + 1
    }, [])
    useEffect(() => {
        saveTodos(todos)
    }, [todos])
    const actions = createTodoActions(dispatch, idRef)
    return (
        <TodoContext.Provider value={{todos, ...actions}}>
            {children}
        </TodoContext.Provider>
    )
}
export function useTodoStore(){
    const v = useContext(TodoContext)

    if(!v) throw new Error('useTodoStore must be used within TodoProvider')

    return v
}