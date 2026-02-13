const LS_KEY = 'todo-context-v1'
export function loadTodos(){
    try {
        // Json을 이용해 로컬저장소에서 값을 가져오기
        const saved = JSON.parse(localStorage.getItem(LS_KEY) || 'null')
        //배열 판단
        return Array.isArray(saved) ? saved:null
    } catch (error) {
        return null
    }
}
export function saveTodos(todos){
    localStorage.setItem(LS_KEY,JSON.stringify(todos))
}